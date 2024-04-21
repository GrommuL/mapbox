import { MapComponent } from '@/components/map'
import { SideBar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/toaster'

export const AppEntry = () => {
	return (
		<main className='flex h-full'>
			<SideBar />
			<MapComponent />
			<Toaster />
		</main>
	)
}
