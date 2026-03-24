// EventsServer.tsx — server-side logic
import { client } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

interface Asset {
  url: string
}

interface ImageOrVideo {
  asset: Asset
}

interface Event {
  _id: string
  title: string
  date: string
  description: Record<string, unknown>
  image?: ImageOrVideo
  video?: ImageOrVideo
}

export async function getEvents(): Promise<Event[]> {
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

// Events.tsx — server-side entry point
import EventsClient from '@/components/EventsClient'

export default async function Events() {
  const events = await getEvents()
  return <EventsClient events={events} />
}
