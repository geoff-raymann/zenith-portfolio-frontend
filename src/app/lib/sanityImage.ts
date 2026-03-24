import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'i8m1stf5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

interface ImageSource {
  asset?: {
    url?: string
  }
}

export function urlForImage(source: ImageSource) {
  return builder.image(source)
}
