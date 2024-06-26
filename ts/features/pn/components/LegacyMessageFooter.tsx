import React, { MutableRefObject, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  ButtonSolid,
  IOStyles,
  useIOToast
} from "@pagopa/io-app-design-system";
import I18n from "i18n-js";
import { useDispatch } from "react-redux";
import { NotificationPaymentInfo } from "../../../../definitions/pn/NotificationPaymentInfo";
import { useIOSelector } from "../../../store/hooks";
import { UIMessageId } from "../../messages/types";
import { canNavigateToPaymentFromMessageSelector } from "../../messages/store/reducers/payments";
import variables from "../../../theme/variables";
import { getRptIdStringFromPayment } from "../utils/rptId";
import { trackPNShowAllPayments } from "../analytics";
import { initializeAndNavigateToWalletForPayment } from "../../messages/utils";
import { paymentsButtonStateSelector } from "../store/reducers/payments";

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginTop: -variables.footerShadowOffsetHeight,
    paddingTop: variables.footerShadowOffsetHeight
  }
});

type LegacyMessageFooterProps = {
  messageId: UIMessageId;
  payments: ReadonlyArray<NotificationPaymentInfo> | undefined;
  maxVisiblePaymentCount: number;
  isCancelled: boolean;
  presentPaymentsBottomSheetRef: MutableRefObject<(() => void) | undefined>;
};

export const LegacyMessageFooter = ({
  messageId,
  payments,
  maxVisiblePaymentCount,
  isCancelled,
  presentPaymentsBottomSheetRef
}: LegacyMessageFooterProps) => {
  const buttonState = useIOSelector(state =>
    paymentsButtonStateSelector(
      state,
      messageId,
      payments,
      maxVisiblePaymentCount
    )
  );
  const dispatch = useDispatch();
  const toast = useIOToast();
  const canNavigateToPayment = useIOSelector(state =>
    canNavigateToPaymentFromMessageSelector(state)
  );
  const onFooterPressCallback = useCallback(() => {
    if (payments?.length === 1) {
      const firstPayment = payments[0];
      const paymentId = getRptIdStringFromPayment(firstPayment);
      initializeAndNavigateToWalletForPayment(
        messageId,
        paymentId,
        false,
        undefined,
        canNavigateToPayment,
        dispatch,
        true,
        () => toast.error(I18n.t("genericError"))
      );
    } else {
      trackPNShowAllPayments();
      presentPaymentsBottomSheetRef.current?.();
    }
  }, [
    canNavigateToPayment,
    dispatch,
    messageId,
    payments,
    presentPaymentsBottomSheetRef,
    toast
  ]);
  if (isCancelled || buttonState === "hidden") {
    return null;
  }
  const isLoading = buttonState === "visibleLoading";
  return (
    <View style={styles.container}>
      <View style={IOStyles.footer}>
        <ButtonSolid
          disabled={isLoading}
          fullWidth={true}
          loading={isLoading}
          color="primary"
          label={I18n.t("wallet.continue")}
          onPress={onFooterPressCallback}
          accessibilityLabel={I18n.t("wallet.continue")}
        />
      </View>
    </View>
  );
};
