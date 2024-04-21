import { MarkerListItem } from '@/components/marker-list-item'

import { getMarkers } from '@/store/selectors/markers-selectors'
import { markersActions } from '@/store/slices/markers-slice'

import { useAppSelector } from '@/hooks/use-app-selector'
import { useAppDispatch } from '@/hooks/use-app-dispatch'

export const MarkerList = () => {
	const dispatch = useAppDispatch()

	const markers = useAppSelector(getMarkers)

	const { setCurrentMarkerCenter } = markersActions

	const centerMarker = (coordinates: [number, number]) => {
		dispatch(setCurrentMarkerCenter(coordinates))
	}

	return (
		<div className='flex h-full max-h-[700px] w-full flex-col gap-3 overflow-y-scroll'>
			{markers.map((marker) => (
				<MarkerListItem key={marker.id} marker={marker} centerMarker={centerMarker} />
			))}
		</div>
	)
}
