import { configureStore } from '@reduxjs/toolkit'

import { searchReducer } from '@/store/slices/search-slice'
import { markersReducer } from '@/store/slices/markers-slice'

export const store = configureStore({
	reducer: {
		search: searchReducer,
		markers: markersReducer
	}
})
