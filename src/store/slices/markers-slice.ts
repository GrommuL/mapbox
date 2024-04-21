import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Marker } from '@/types/marker-type'

type MarkersState = {
	currentMarker: Marker | null
	currentMarkerCenter: [number, number]
	markers: Marker[]
}

const initialState: MarkersState = {
	currentMarker: null,
	currentMarkerCenter: [-74.006, 40.7128],
	markers: []
}

export const markersSlice = createSlice({
	name: 'marker',
	initialState,
	reducers: {
		setCurrentMarker: (state, action: PayloadAction<Marker>) => {
			state.currentMarker = action.payload
		},
		resetCurrentMarker: (state) => {
			state.currentMarker = null
		},
		addMarker: (state, action: PayloadAction<Marker>) => {
			state.markers.push(action.payload)
		},
		removeMarker: (state, action: PayloadAction<string>) => {
			state.markers = state.markers.filter((marker) => marker.id !== action.payload)
		},
		editMarker: (state, action: PayloadAction<Omit<Marker, 'address' | 'coordinates'>>) => {
			state.markers = state.markers.map((marker) => {
				if (marker.id === action.payload.id) {
					return { ...marker, name: action.payload.name, description: action.payload.description }
				}
				return marker
			})
		},
		setCurrentMarkerCenter: (state, action: PayloadAction<[number, number]>) => {
			state.currentMarkerCenter = action.payload
		}
	}
})

export const { actions: markersActions } = markersSlice
export const { reducer: markersReducer } = markersSlice
