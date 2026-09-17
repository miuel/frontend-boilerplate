import { Inngest } from 'inngest'
import { eventSchemas } from './event-schema'

export const inngestServerClient = new Inngest({
  id: 'ls-bolagen',
  eventKey: process.env.INNGEST_EVENT_KEY,
  schemas: eventSchemas,
})
