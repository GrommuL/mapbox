import type { Marker } from '@/types/marker-type'

type MarkerListItemProps = {
	marker: Marker
	centerMarker: (coordinates: [number, number]) => void
}

export const MarkerListItem = ({ marker, centerMarker }: MarkerListItemProps) => {
	const coordinates = `${marker.coordinates.at(0)} - ${marker.coordinates.at(1)}`

	return (
		<button
			className='w-full shrink-0 overflow-hidden rounded-[8px] border border-transparent p-[10px] hover:border-primary'
			key={marker.id}
			onClick={() => centerMarker(marker.coordinates)}
		>
			<div className='flex flex-col gap-y-[6px]'>
				<h4 className=' truncate text-start'>{marker.name}</h4>
				<p className='truncate text-start text-[15px] text-slate-500'>{marker.address}</p>
			</div>
			<span className='inline-block w-full text-end text-[14px] text-slate-500'>{coordinates}</span>
		</button>
	)
}
