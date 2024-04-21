import { RootState } from '@/types/redux-types'

export const getSearchValue = (state: RootState) => state.search.searchValue
export const getAutocompleteResults = (state: RootState) => state.search.autocompleteResults
export const getSearchError = (state: RootState) => state.search.error
export const getSearchStatus = (state: RootState) => state.search.status
