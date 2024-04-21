import { useSelector } from 'react-redux'

import { RootState } from '@/types/redux-types'

export const useAppSelector = useSelector.withTypes<RootState>()
