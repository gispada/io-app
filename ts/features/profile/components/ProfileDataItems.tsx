import React from "react";
import { IOIcons } from "@pagopa/io-app-design-system";
import { ProfileData } from "../types";
import ListItemComponent from "../../../components/screens/ListItemComponent";

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
    title: "Nome e Cognome",
    value: ["name", "familyName"],
    iconName: "profile"
  },
  {
    id: "fiscal-code",
    title: "Codice Fiscale",
    value: "fiscalCode",
    iconName: "creditCard"
  },
  {
    id: "email",
    title: "Indirizzo Email",
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
