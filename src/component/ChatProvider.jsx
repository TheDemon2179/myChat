import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
	const [userInput, setUserInput] = useState('')
	const [messages, setMessages] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [chats, setChats] = useState([])
	const [currentChatId, setCurrentChatId] = useState(null)
	const [renameDialogOpen, setRenameDialogOpen] = useState(false)
	const [newChatName, setNewChatName] = useState('')
	const [chatToRename, setChatToRename] = useState(null)
	const [temperatureValue, setTemperatureValue] = useState(1)
	const [maxTokensValue, setMaxTokensValue] = useState(2048)
	const [modelValue, setModelValue] = useState({ label: 'gemma2-9b-it', id: 2 })

	useEffect(() => {
		const savedChats = JSON.parse(localStorage.getItem('chats')) || []
		setChats(savedChats)
		if (savedChats.length > 0) {
			setCurrentChatId(savedChats[0].id)
			setMessages(savedChats[0].messages)
		}
	}, [])

	useEffect(() => {
		if (currentChatId) {
			const updatedChats = chats.map(chat =>
				chat.id === currentChatId
					? { ...chat, messages, modelName: modelValue.label }
					: chat
			)
			setChats(updatedChats)
			localStorage.setItem('chats', JSON.stringify(updatedChats))
		}
	}, [messages, currentChatId, modelValue.label])

	return (
		<ChatContext.Provider
			value={{
				userInput,
				setUserInput,
				messages,
				setMessages,
				isLoading,
				setIsLoading,
				chats,
				setChats,
				currentChatId,
				setCurrentChatId,
				renameDialogOpen,
				setRenameDialogOpen,
				newChatName,
				setNewChatName,
				chatToRename,
				setChatToRename,
				temperatureValue,
				setTemperatureValue,
				maxTokensValue,
				setMaxTokensValue,
				modelValue,
				setModelValue,
			}}
		>
			{children}
		</ChatContext.Provider>
	)
}

ChatProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export { ChatContext, ChatProvider }
