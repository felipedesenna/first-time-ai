import { FastifyInstance } from "fastify";
import { z } from 'zod'

import { openai } from '../lib/openai'

export async function generateAIThumbnailRoute(app: FastifyInstance) {
  app.post('/ai/image', async (request) => {
    const bodySchema = z.object({
      prompt: z.string().max(1000)
    })

    const { prompt } = bodySchema.parse(request.body)

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '512x512',
    })

    return response.data
  })
}
