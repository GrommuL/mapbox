import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { AppEntry } from '@/app/app-entry'
import { store } from '@/store'

import '@/app/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<AppEntry />
		</Provider>
	</React.StrictMode>
)
