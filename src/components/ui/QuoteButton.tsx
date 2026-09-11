"use client";

import type { ComponentPropsWithoutRef } from "react";
import { requestQuote } from "@/lib/scroll";
import { Button, type ButtonProps } from "./Button";

/** Button that pre-selects a service in the quote form and scrolls to it. */
export function QuoteButton({
  service,
  children,
  ...rest
}: { service?: string } & ButtonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | "onClick">) {
  return (
    <Button type="button" onClick={() => requestQuote(service)} {...rest}>
      {children}
    </Button>
  );
}
