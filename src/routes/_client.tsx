"use client";

import { Link, useRouter } from "@hiogawa/react-server/client";

export function NavLink(props: React.ComponentProps<typeof Link>) {
  const pathname = useRouter((s) => s.location.pathname);
  const match = pathname
    .replaceAll(/\/*$/g, "/")
    .startsWith(props.href.replaceAll(/\/*$/g, "/"));
  return <Link {...props} aria-current={match ? "page" : undefined} />;
}
