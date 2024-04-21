import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Feature } from '@/types/location-types'
import { markerSchema } from '@/lib/schemas/marker-schema'
import { Marker } from '@/types/marker-type'
import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { searchActions } from '@/store/slices/search-slice'
import { markersActions } from '@/store/slices/markers-slice'
import { useAppSelector } from '@/hooks/use-app-selector'
import { getMarkers } from '@/store/selectors/markers-selectors'

type AutocompleteListItemProps = {
	autocompleteItem: Feature
}

export const AutocompleteListItem = ({ autocompleteItem }: AutocompleteListItemProps) => {
	const { toast } = useToast()
	const dispatch = useAppDispatch()
	const markers = useAppSelector(getMarkers)
	const { resetSearchValue } = searchActions
	const { addMarker } = markersActions

	const { properties } = autocompleteItem

	const form = useForm<z.infer<typeof markerSchema>>({
		resolver: zodResolver(markerSchema),
		defaultValues: {
			markerName: '',
			markerDescription: ''
		}
	})

	function onSubmit(values: z.infer<typeof markerSchema>) {
		const existingMarker = markers.some((marker) => marker.id === autocompleteItem.id)
		if (existingMarker) {
			toast({ title: 'Marker already exist', variant: 'destructive' })

			return
		}
		const newMarker: Marker = {
			id: autocompleteItem.id,
			address: properties.full_address,
			name: values.markerName,
			description: values.markerDescription,
			coordinates: [properties.coordinates.longitude, properties.coordinates.latitude]
		}
		dispatch(addMarker(newMarker))
		form.reset()
		dispatch(resetSearchValue())
		toast({ title: `Marker ${values.markerName} successfully created.`, className: 'bg-emerald-600 text-white' })
	}

	const isSubmitting = form.formState.isSubmitting

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className='group flex w-full flex-col p-[10px] first:rounded-t-[8px] last:rounded-b-[8px] hover:bg-primary hover:text-white'>
					<span>{properties.name}</span>
					<span className='text-[14px] text-gray-500 group-hover:text-gray-300'>{properties.place_formatted}</span>
				</button>
			</DialogTrigger>
			<DialogContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<DialogHeader className='flex flex-col gap-y-[20px]'>
							<DialogTitle className='text-center text-2xl font-bold'>Do you want to add a marker?</DialogTitle>
							<DialogDescription className='flex flex-col gap-y-[20px]'>
								<span className='flex flex-col'>
									<span>Place name: {properties.full_address}</span>
									<span>{`Place coordinates: ${properties.coordinates.latitude} - ${properties.coordinates.longitude}`}</span>
								</span>
							</DialogDescription>
						</DialogHeader>
						<div>
							<FormField
								control={form.control}
								name='markerName'
								render={({ field }) => (
									<FormItem className='min-h-[104px]'>
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
						</div>
						<DialogFooter>
							<Button type='submit' disabled={isSubmitting}>
								Add marker
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
