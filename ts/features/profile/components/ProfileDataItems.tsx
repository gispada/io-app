import React from "react";
import { IOIcons } from "@pagopa/io-app-design-system";
import I18n from "../../../i18n";
import ListItemComponent from "../../../components/screens/ListItemComponent";
import { ProfileData } from "../types";

type Props = {
  data: ProfileData;
};

type ConfigItem = {
  id: string;
  title: string;
  value: keyof ProfileData | Array<keyof ProfileData>;
  iconName: IOIcons;
};

const config: Array<ConfigItem> = [
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

export const ProfileDataItems = ({ data }: Props) => (
  <>
    {config.map(({ id, title, value, iconName }) => (
      <ListItemComponent
        key={id}
        title={title}
        subTitle={
          Array.isArray(value) ? value.map(v => data[v]).join(" ") : data[value]
        }
        iconName={iconName}
      />
    ))}
  </>
);
