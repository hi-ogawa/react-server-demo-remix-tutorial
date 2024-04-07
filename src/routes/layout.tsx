import { Link } from "@hiogawa/react-server/client";
import { getContacts } from "./_data";
import { actionNewContact } from "./_action";
import type { LayoutProps } from "@hiogawa/react-server/server";

export default async function Layout(props: LayoutProps) {
  const contacts = await getContacts();
  props.url.search;

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
            {/* TODO: GET form navigation */}
            <form action="" id="search-form" role="search">
              <input
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={true} id="search-spinner" />
            </form>
            {/* TODO: better error message when forgot to add `action`? */}
            {/* TODO: layout doesn't invalidate when adding a new contact */}
            <form action={actionNewContact}>
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            {contacts.length > 0 ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* TODO: encoding /contacts/kent%20c.-dodds */}
                    <Link href={`/contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </Link>
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
