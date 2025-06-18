
// Contact.tsx
import ContactClient from '@/components/ContactClient'
import { getContact } from './ContactServer'

export default async function Contact() {
  const contact = await getContact()
  return <ContactClient contact={contact} />
}
