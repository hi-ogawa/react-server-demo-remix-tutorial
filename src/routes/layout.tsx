export default function Layout(props: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>React Server Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div
                aria-hidden
                hidden={true}
                id="search-spinner"
              />
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <a href={`/contacts/1`}>Your Name</a>
              </li>
              <li>
                <a href={`/contacts/2`}>Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>
        {props.children}
      </body>
    </html>
  );
}
