import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/types/redux-types'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
