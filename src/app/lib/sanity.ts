// src/lib/sanity.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'i8m1stf5',             // ✅ Your actual project ID
  dataset: 'production',             // ✅ Your actual dataset
  apiVersion: '2024-01-01',          // ✅ Use a fixed date in the past
  useCdn: true,                      // ✅ Enables faster cacheable reads
})
