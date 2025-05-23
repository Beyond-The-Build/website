"use client";

import { useLiveMode } from "@sanity/react-loader";
import { VisualEditing } from "next-sanity";
import type { SanityClient } from "sanity";

import { client } from "@/sanity/lib/client";

// Always enable stega in Live Mode
const stegaClient = client.withConfig({ stega: true }) as SanityClient;

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient });

  return <VisualEditing />;
}
