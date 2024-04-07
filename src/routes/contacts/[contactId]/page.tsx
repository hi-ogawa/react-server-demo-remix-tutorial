import { createError, type PageProps } from "@hiogawa/react-server/server";
import { getContact, type ContactRecord } from "../../_data";
import { Link } from "@hiogawa/react-server/client";
import { actionDeleteContact, actoinFavorite } from "../../_action";

export default async function Contact(props: PageProps) {
  // TODO: fix decoding
  const contact = await getContact(decodeURI(props.params["contactId"]));
  if (!contact) {
    throw createError({ status: 404 });
  }

  return (
    <div key={contact.id} id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          src={
            contact.avatar ||
            `https://avatar.vercel.sh/${contact.first}${contact.last}`
          }
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
          <Link href={`${props.url.pathname}/edit`}>
            <button>Edit</button>
          </Link>
          {/* TODO: client component for `window.confirm` */}
          <form action={actionDeleteContact}>
            <input type="hidden" name="id" value={contact.id} />
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Favorite(props: { contact: ContactRecord }) {
  // TODO: optimistic
  const favorite = props.contact.favorite;

  return (
    <form action={actoinFavorite}>
      <input type="hidden" name="id" value={props.contact.id} />
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
