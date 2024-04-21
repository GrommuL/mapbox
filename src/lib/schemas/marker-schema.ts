import { z } from 'zod'

export const markerSchema = z.object({
	markerName: z.string().min(1, {
		message: 'This field is required'
	}),
	markerDescription: z.string().min(1, {
		message: 'This field is required'
	})
})
