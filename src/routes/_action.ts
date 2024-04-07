"use server";

import { ActionContext, redirect } from "@hiogawa/react-server/server";
import { fakeContacts } from "./_data";
import { tinyassert } from "@hiogawa/utils";

export async function actionCreateNewContact(this: ActionContext) {
  this.revalidate = true;
  const contact = await fakeContacts.create({});
  throw redirect(`/contacts/${contact.id}/edit`);
}

export async function actionUpdateContact(
  this: ActionContext,
  formData: FormData,
) {
  this.revalidate = true;
  const data = Object.fromEntries(formData) as any;
  const contact = await fakeContacts.get(data.id);
  tinyassert(contact);
  await fakeContacts.set(contact.id, { ...contact, ...data });
  throw redirect(`/contacts/${contact.id}`);
}

export async function actoinFavorite(formData: FormData) {
  const data = Object.fromEntries(formData) as any;
  const contact = await fakeContacts.get(data.id);
  tinyassert(contact);
  await fakeContacts.set(contact.id, {
    ...contact,
    favorite: data.favorite === "true",
  });
}

export async function actionDeleteContact(
  this: ActionContext,
  formData: FormData,
) {
  this.revalidate = true;
  const data = Object.fromEntries(formData) as any;
  const contact = await fakeContacts.get(data.id);
  tinyassert(contact);
  fakeContacts.destroy(contact.id);

  // TODO
  // action response stream renders `src/routes/contacts/[contactId]/page.tsx`
  // but contact doesn't exists anymore and server component throws,
  // which makes this redirect error to not caught by client?
  throw redirect("/");
}
