import { useContext } from 'react'
import { ChatContext } from '../component/ChatProvider'

export const useHandleSubmit = getGroqChatStream => {
	const {
		userInput,
		setUserInput,
		messages,
		setMessages,
		setIsLoading,
		temperatureValue,
		maxTokensValue,
		modelValue,
	} = useContext(ChatContext)

	const handleSubmit = async event => {
		event.preventDefault()

		if (userInput.trim() === '') return

		const newMessages = [
			...messages,
			{ role: 'user', content: userInput, modelName: modelValue.label },
		]
		const messagesToSend = newMessages.map(({ modelName, ...rest }) => rest)

		setMessages(newMessages)
		setUserInput('')
		setIsLoading(true)

		try {
			const stream = await getGroqChatStream(
				messagesToSend,
				modelValue.label,
				temperatureValue,
				maxTokensValue
			)
			let responseContent = ''

			for await (const chunk of stream) {
				responseContent += chunk.choices[0]?.delta?.content || ''
			}

			setMessages([
				...newMessages,
				{
					role: 'assistant',
					content: responseContent,
					modelName: modelValue.label,
				},
			])
		} catch (error) {
			console.error('Error fetching response:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return handleSubmit
}

export const useClearChat = () => {
	const { setMessages } = useContext(ChatContext)
	return () => setMessages([])
}

export const useCreateNewChat = () => {
	const { chats, setChats, setCurrentChatId, modelValue } =
		useContext(ChatContext)
	return () => {
		const newChat = {
			id: Date.now(),
			name: `Чат ${chats.length + 1}`,
			messages: [],
			modelName: modelValue.label,
		}
		setChats([newChat, ...chats])
		setCurrentChatId(newChat.id)
	}
}

export const useSwitchChat = () => {
	const { chats, setMessages, setCurrentChatId } = useContext(ChatContext)
	return chatId => {
		setCurrentChatId(chatId)
		const chat = chats.find(c => c.id === chatId)
		setMessages(chat.messages)
	}
}

export const useDeleteChat = () => {
	const { chats, setChats, currentChatId, setCurrentChatId, setMessages } =
		useContext(ChatContext)
	return chatId => {
		const updatedChats = chats.filter(chat => chat.id !== chatId)
		setChats(updatedChats)
		localStorage.setItem('chats', JSON.stringify(updatedChats))
		if (chatId === currentChatId) {
			if (updatedChats.length > 0) {
				setCurrentChatId(updatedChats[0].id)
				setMessages(updatedChats[0].messages)
			} else {
				setCurrentChatId(null)
				setMessages([])
			}
		}
	}
}

export const useOpenRenameDialog = () => {
	const { setChatToRename, setNewChatName, setRenameDialogOpen } =
		useContext(ChatContext)
	return chat => {
		setChatToRename(chat)
		setNewChatName(chat.name)
		setRenameDialogOpen(true)
	}
}

export const useHandleRenameChat = () => {
	const { chats, setChats, chatToRename, newChatName, setRenameDialogOpen } =
		useContext(ChatContext)
	return () => {
		const updatedChats = chats.map(chat =>
			chat.id === chatToRename.id ? { ...chat, name: newChatName } : chat
		)
		setChats(updatedChats)
		localStorage.setItem('chats', JSON.stringify(updatedChats))
		setRenameDialogOpen(false)
	}
}
