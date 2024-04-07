"use client";

import { useRouter } from "@hiogawa/react-server/client";

export function BackButton(props: JSX.IntrinsicElements["button"]) {
  const history = useRouter((s) => s.history);
  return <button {...props} onClick={() => history.back()} />;
}
