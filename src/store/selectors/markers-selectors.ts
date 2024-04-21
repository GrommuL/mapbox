import { RootState } from '@/types/redux-types'

export const getCurrentMarker = (state: RootState) => state.markers.currentMarker
export const getMarkers = (state: RootState) => state.markers.markers
export const getCurrentMarkerCenter = (state: RootState) => state.markers.currentMarkerCenter
