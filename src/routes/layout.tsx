import { Link, LinkForm } from "@hiogawa/react-server/client";
import { getContacts } from "./_data";
import { actionCreateNewContact } from "./_action";
import type { LayoutProps } from "@hiogawa/react-server/server";
import { NavLink } from "./_client";

export default async function Layout(props: LayoutProps) {
  const q = new URLSearchParams(props.url.search).get("q");
  const contacts = await getContacts(q);

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>React Server Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="sidebar">
          <h1>
            <Link href="/">Remix Contacts</Link>
          </h1>
          <div>
            <LinkForm action="/" id="search-form" role="search" revalidate>
              <input
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={true} id="search-spinner" />
            </LinkForm>
            <form action={actionCreateNewContact}>
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            {contacts.length > 0 ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* TODO: encoding /contacts/kent%20c.-dodds */}
                    {/* TODO: functional `className` prop cannot used for server/client boundary */}
                    <NavLink href={`/contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">{props.children}</div>
      </body>
    </html>
  );
}
