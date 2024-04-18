import { IOIcons } from "@pagopa/io-app-design-system";
import { ProfileData } from "../types";

type ConfigItem = {
  id: string;
  title: string;
  value: keyof ProfileData | Array<keyof ProfileData>;
  iconName: IOIcons;
};

export const config: Array<ConfigItem> = [
  {
    id: "name-surname",
    title: "Nome e Cognome",
    value: ["name", "family_name"],
    iconName: "profile"
  },
  {
    id: "fiscal-code",
    title: "Codice Fiscale",
    value: "fiscal_code",
    iconName: "creditCard"
  },
  {
    id: "email",
    title: "Indirizzo Email",
    value: "email",
    iconName: "email"
  }
];
