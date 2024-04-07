import { createError, type PageProps } from "@hiogawa/react-server/server";
import { getContact } from "../../../_data";
import { actionUpdateContact } from "../../../_action";
import { BackButton } from "./_client";

export default async function EditContact(props: PageProps) {
  const contact = await getContact(decodeURI(props.params["contactId"]));
  if (!contact) {
    throw createError({ status: 404 });
  }

  return (
    <form action={actionUpdateContact} key={contact.id} id="contact-form">
      <input type="hidden" name="id" value={contact.id} />
      <p>
        <span>Name</span>
        <input
          defaultValue={contact.first}
          aria-label="First name"
          name="first"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={contact.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <BackButton type="button">Cancel</BackButton>
      </p>
    </form>
  );
}
