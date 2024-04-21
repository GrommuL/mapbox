import { z } from 'zod'
import { useEffect } from 'react'
import { Popup } from 'react-map-gl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { useAppSelector } from '@/hooks/use-app-selector'
import { useAppDispatch } from '@/hooks/use-app-dispatch'

import { getCurrentMarker } from '@/store/selectors/markers-selectors'
import { markersActions } from '@/store/slices/markers-slice'

import { markerSchema } from '@/lib/schemas/marker-schema'

import type { Marker } from '@/types/marker-type'

type MarkerPopupProps = {
	marker: Marker
}

export const MarkerPopup = ({ marker }: MarkerPopupProps) => {
	const dispatch = useAppDispatch()
	const currentMarker = useAppSelector(getCurrentMarker)

	const { resetCurrentMarker, editMarker } = markersActions

	const form = useForm<z.infer<typeof markerSchema>>({
		resolver: zodResolver(markerSchema),
		defaultValues: {
			markerName: '',
			markerDescription: ''
		}
	})

	const closePopup = () => {
		form.clearErrors()
		dispatch(resetCurrentMarker())
	}

	function onSubmit(values: z.infer<typeof markerSchema>) {
		if (!currentMarker) return

		const editedMarkerInformation: Omit<Marker, 'address' | 'coordinates'> = {
			id: currentMarker.id,
			name: values.markerName,
			description: values.markerDescription
		}

		dispatch(editMarker(editedMarkerInformation))
		dispatch(resetCurrentMarker())
	}

	useEffect(() => {
		if (currentMarker) {
			form.setValue('markerName', currentMarker.name)
			form.setValue('markerDescription', currentMarker.description)
		}
	}, [currentMarker])

	if (currentMarker?.id !== marker.id) return null

	return (
		<Popup
			className='inline-block w-[500px] font-comforta font-bold shadow-md'
			key={marker.id}
			latitude={marker.coordinates[1]}
			longitude={marker.coordinates[0]}
			closeButton={false}
			closeOnClick={false}
			onClose={closePopup}
			anchor='top-left'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-y-[10px]'>
					<FormField
						control={form.control}
						name='markerName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Marker name</FormLabel>
								<FormControl>
									<Input placeholder='Name your marker' {...field} />
								</FormControl>
								<FormMessage className='text-[13px]' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='markerDescription'
						render={({ field }) => (
							<FormItem className='min-h-[104px]'>
								<FormLabel>Marker description</FormLabel>
								<FormControl>
									<Textarea placeholder='Add a description to your marker' className='min-h-[180px]' {...field} />
								</FormControl>
								<FormMessage className='text-[13px]' />
							</FormItem>
						)}
					/>
					<div className='flex items-center gap-x-[10px]'>
						<Button className='text-[15px]' variant='outline' type='button' onClick={closePopup}>
							Close
						</Button>
						<Button className='text-[15px]' type='submit'>
							Edit marker
						</Button>
					</div>
				</form>
			</Form>
		</Popup>
	)
}
