"use client";

import { ComponentProps } from "react";
import Anchor from "./anchor";
import useLocale from "./hooks/useLocale";

type LocalizedLinkProps = ComponentProps<typeof Anchor>;

export default function LocalizedLink({ href, ...rest }: LocalizedLinkProps) {
  const locale = useLocale();

  // Convert to string (in case href is UrlObject)
  const rawHref = href.toString();

  // Skip external links
  const isExternal = rawHref.startsWith("http");

  // Normalize internal links with locale
  const newHref = isExternal
    ? rawHref
    : `/${locale}${rawHref}`.replace(/\/{2,}/g, "/");

  return <Anchor {...rest} href={newHref} />;
}
