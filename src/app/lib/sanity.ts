import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'i8m1stf5',       // ✅ Replace with your actual project ID
  dataset: 'production',        // or 'development' if that's your dataset
  apiVersion: '2025-06-08',     // use a fixed date to avoid unexpected changes
  useCdn: true,                 // `true` for fast, cacheable reads (no auth)
})
