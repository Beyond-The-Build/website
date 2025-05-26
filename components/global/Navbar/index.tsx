import { SettingsPayload } from "@/types";
import NavbarLayout from "./NavbarLayout";

interface NavbarProps {
  data: SettingsPayload;
}
export async function Navbar(props: NavbarProps) {
  return <NavbarLayout data={props.data} />;
}
