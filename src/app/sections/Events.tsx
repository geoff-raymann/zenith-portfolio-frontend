// app/components/EventsServer.tsx
import { client } from '@/lib/sanity'
import EventsClient from '../components/EventsClient'

export const dynamic = 'force-dynamic'

interface Event {
  _id: string
  title: string
  date: string
  description: any
  image?: {
    asset: {
      url: string
    }
  }
  video?: {
    asset: {
      url: string
    }
  }
}

async function getEvents(): Promise<Event[]> {
  const query = `*[_type == "event"] | order(date desc){
    _id,
    title,
    date,
    description,
    video { asset->{url} },
    image { asset->{url} }
  }`
  return await client.fetch(query)
}

export default async function EventsServer() {
  const events = await getEvents()
  return <EventsClient events={events} />
}
