import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChatProvider } from './component/ChatProvider.jsx'
import './index.css'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<ChatProvider>
				<App />
			</ChatProvider>
		</ThemeProvider>
	</React.StrictMode>
)
