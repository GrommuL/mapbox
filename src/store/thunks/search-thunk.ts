import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchAutocompleteResultsBySearchValue } from '@/services/search/search-api'
import { SearchResult } from '@/types/location-types'

export const fetchAutocompleteResults = createAsyncThunk<SearchResult, string, { rejectValue: string }>(
	'search/fetchAutocompleteResults',
	async (searchValue: string, { rejectWithValue }) => {
		try {
			const response = await fetchAutocompleteResultsBySearchValue(searchValue)

			return response
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			} else {
				return rejectWithValue('Неизвестная ошибка при запросе fetchAutocompleteResults')
			}
		}
	}
)
