import { useEffect, useRef, useState } from 'react'
import { Marker, Map, MapRef } from 'react-map-gl'

import { markersActions } from '@/store/slices/markers-slice'
import { getCurrentMarkerCenter, getMarkers } from '@/store/selectors/markers-selectors'

import { MarkerPopup } from '@/components/marker-popup'
import { MarkerButton } from '@/components/marker-button'
import { DeleteMarkerModal } from '@/components/delete-marker-modal'

import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { useAppSelector } from '@/hooks/use-app-selector'

export const MapComponent = () => {
	const dispatch = useAppDispatch()

	const markers = useAppSelector(getMarkers)
	const currentMarkerCenter = useAppSelector(getCurrentMarkerCenter)

	console.log(markers)

	const { removeMarker } = markersActions

	const [openDeleteModal, setOpenDeleteModal] = useState(false)

	const mapRef = useRef<MapRef>(null)

	const handleDeleteMarker = (markerId: string) => {
		dispatch(removeMarker(markerId))
		setOpenDeleteModal(false)
	}

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.setCenter(currentMarkerCenter)
		}
	}, [currentMarkerCenter])

	return (
		<Map
			ref={mapRef}
			mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_ACCESS_TOKEN}
			initialViewState={{
				longitude: -74.006,
				latitude: 40.7128,
				zoom: 9
			}}
			mapStyle='mapbox://styles/mapbox/streets-v11'
		>
			{markers.map((marker) => (
				<Marker key={marker.id} longitude={marker.coordinates[0]} latitude={marker.coordinates[1]} anchor='bottom'>
					<MarkerButton marker={marker} setOpenDeleteModal={setOpenDeleteModal} />
					<MarkerPopup marker={marker} />
					<DeleteMarkerModal markerName={marker.name} handleDeleteMarker={() => handleDeleteMarker(marker.id)} openDeleteModal={openDeleteModal} />
				</Marker>
			))}
		</Map>
	)
}
