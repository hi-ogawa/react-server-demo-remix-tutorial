"use client";

import { Link, useRouter } from "@hiogawa/react-server/client";

export function NavLink(props: React.ComponentProps<typeof Link>) {
  const pathname = useRouter((s) => s.location.pathname);
  const match = pathname
    .replaceAll(/\/*$/g, "/")
    .startsWith(props.href.replaceAll(/\/*$/g, "/"));
  return <Link {...props} aria-current={match ? "page" : undefined} />;
}

export function GlobalPendingOverlay() {
  const isPending = useRouter((s) => s.isPending || s.isActionPending);
  return (
    <div
      style={{
        pointerEvents: "none",
        opacity: isPending ? 0.3 : 0,
        transition: "opacity 200ms",
        transitionDelay: "200ms",
        background: "#fff",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
  );
}
