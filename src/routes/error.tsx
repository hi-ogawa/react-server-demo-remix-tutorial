"use client";

import type { ErrorPageProps } from "@hiogawa/react-server/server";

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <p>
      {props.serverError?.status === 404 && "404 Not found"}
      {props.serverError?.status !== 404 && "Unexpected Error"}
    </p>
  );
}
