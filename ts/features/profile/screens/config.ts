import { IOIcons } from "@pagopa/io-app-design-system";
import { ProfileData } from "../types";
import I18n from "../../../i18n";

type ConfigItem = {
  id: string;
  title: string;
  value: keyof ProfileData | Array<keyof ProfileData>;
  iconName: IOIcons;
};

export const config: Array<ConfigItem> = [
  {
    id: "name-surname",
    title: I18n.t("newProfile.labels.nameSurname"),
    value: ["name", "familyName"],
    iconName: "profile"
  },
  {
    id: "fiscal-code",
    title: I18n.t("newProfile.labels.fiscalCode"),
    value: "fiscalCode",
    iconName: "creditCard"
  },
  {
    id: "email",
    title: I18n.t("newProfile.labels.email"),
    value: "email",
    iconName: "email"
  }
];
