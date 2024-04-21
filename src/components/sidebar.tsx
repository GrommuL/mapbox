import { MarkerList } from '@/components/marker-list'
import { SearchPlaces } from '@/components/search-places'

export const SideBar = () => {
	return (
		<aside className='flex h-full w-[500px] flex-col items-center gap-y-[20px] p-[20px] shadow-lg'>
			<h1 className='text-[40px] font-black uppercase text-primary'>Mapbox</h1>
			<SearchPlaces />
			<MarkerList />
		</aside>
	)
}
