"use server";

import { redirect } from "@hiogawa/react-server/server";
import { createEmptyContact } from "./_data";

export async function actionNewContact() {
  const contact = await createEmptyContact();
  throw redirect(`/contacts/${contact.id}/edit`);
}
