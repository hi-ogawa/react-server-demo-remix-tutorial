import { createError, type PageProps } from "@hiogawa/react-server/server";
import { getContact, type ContactRecord } from "../../_data";

export default async function Contact(props: PageProps) {
  const contact = await getContact(props.params["contactId"]);
  if (!contact) {
    throw createError({ status: 404 });
  }

  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <form action="edit">
            <button type="submit">Edit</button>
          </form>

          <form
            action="destroy"
            method="post"
            // onSubmit={(event) => {
            //   const response = confirm(
            //     "Please confirm you want to delete this record.",
            //   );
            //   if (!response) {
            //     event.preventDefault();
            //   }
            // }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Favorite(props: { contact: ContactRecord }) {
  const favorite = props.contact.favorite;

  return (
    <form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </form>
  );
}
