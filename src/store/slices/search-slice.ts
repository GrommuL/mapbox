import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { fetchAutocompleteResults } from '@/store/thunks/search-thunk'
import { Feature } from '@/types/location-types'

type SearchState = {
	searchValue: string
	autocompleteResults: Feature[]
	status: 'idle' | 'pending' | 'succeeded' | 'failed'
	error: null | string
}

const initialState: SearchState = {
	searchValue: '',
	autocompleteResults: [],
	status: 'idle',
	error: null
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		resetSearchValue: (state) => {
			state.searchValue = ''
			state.autocompleteResults = []
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAutocompleteResults.pending, (state) => {
				state.status = 'pending'
				state.error = null
			})
			.addCase(fetchAutocompleteResults.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.autocompleteResults = action.payload.features
				state.error = null
			})
			.addCase(fetchAutocompleteResults.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || 'Неизвестная ошибка при запросе fetchAutocompleteResults'
			})
	}
})

export const { actions: searchActions } = searchSlice
export const { reducer: searchReducer } = searchSlice
