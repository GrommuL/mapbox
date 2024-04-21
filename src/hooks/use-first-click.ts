import { useEffect, useRef } from 'react'

import { Marker } from '@/types/marker-type'

import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { markersActions } from '@/store/slices/markers-slice'

export const useFirstClick = () => {
	const dispatch = useAppDispatch()
	const { setCurrentMarker } = markersActions

	const isFirstClickRef = useRef(true)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const openEditCurrentMarkerInformation = (marker: Marker) => {
		if (isFirstClickRef.current) {
			isFirstClickRef.current = false

			timerRef.current = setTimeout(() => {
				dispatch(setCurrentMarker(marker))
				isFirstClickRef.current = true
			}, 200)
		} else {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
			isFirstClickRef.current = true
		}
	}

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	return { openEditCurrentMarkerInformation }
}
