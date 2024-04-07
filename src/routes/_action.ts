"use server";

import { ActionContext, redirect } from "@hiogawa/react-server/server";
import { createEmptyContact } from "./_data";

export async function actionNewContact(this: ActionContext) {
  this.revalidate = true;
  const contact = await createEmptyContact();
  throw redirect(`/contacts/${contact.id}/edit`);
}
