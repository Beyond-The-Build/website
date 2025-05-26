import { SettingsPayload } from "@/types";
import FooterLayout from "./FooterLayout";

interface FooterProps {
  data: SettingsPayload;
}
export async function Footer(props: FooterProps) {
  return <FooterLayout data={props.data} />;
}
