import AddIcon from '@mui/icons-material/Add'
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import React, { useCallback, useContext, useMemo } from 'react'
import { getGroqChatStream } from './api/getGroqResponse'
import './App.css'
import ChatBox from './component/ChatBox.jsx'
import ChatList from './component/ChatList.jsx'
import { ChatContext } from './component/ChatProvider.jsx'
import ModelSettings from './component/ModelSettings.jsx'
import { containerStyles } from './styles/myStyles.js'
import {
	useClearChat,
	useCreateNewChat,
	useDeleteChat,
	useHandleRenameChat,
	useHandleSubmit,
	useOpenRenameDialog,
	useSwitchChat,
} from './utils/chatHelpers.js'

const MemoizedChatList = React.memo(ChatList)
const MemoizedChatBox = React.memo(ChatBox)
const MemoizedModelSettings = React.memo(ModelSettings)

function App() {
	const {
		renameDialogOpen,
		setRenameDialogOpen,
		newChatName,
		setNewChatName,
		modelValue,
		chats,
		currentChatId,
	} = useContext(ChatContext)

	const handleSubmit = useHandleSubmit(getGroqChatStream)
	const clearChat = useClearChat()
	const createNewChat = useCreateNewChat()
	const switchChat = useSwitchChat()
	const deleteChat = useDeleteChat()
	const openRenameDialog = useOpenRenameDialog()
	const handleRenameChat = useHandleRenameChat()

	const onSwitchChat = useCallback(chatId => switchChat(chatId), [switchChat])
	const onOpenRenameDialog = useCallback(
		chat => openRenameDialog(chat),
		[openRenameDialog]
	)
	const onDeleteChat = useCallback(chatId => deleteChat(chatId), [deleteChat])

	const currentChat = useMemo(
		() => chats.find(c => c.id === currentChatId),
		[chats, currentChatId]
	)

	return (
		<Container maxWidth={false} sx={{ ...containerStyles }}>
			<Box sx={{ width: '250px', mr: 2 }}>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={createNewChat}
					fullWidth
					sx={{ mb: 2 }}
				>
					Новый чат
				</Button>
				<MemoizedChatList
					onSwitchChat={onSwitchChat}
					onOpenRenameDialog={onOpenRenameDialog}
					onDeleteChat={onDeleteChat}
				/>
			</Box>
			<MemoizedChatBox
				AI_MODEL_NAME={currentChat ? currentChat.modelName : modelValue.label}
				onClearChat={clearChat}
				onSubmit={handleSubmit}
			/>

			<Dialog
				open={renameDialogOpen}
				onClose={() => setRenameDialogOpen(false)}
			>
				<DialogTitle>Переименовать чат</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						label='Новое название'
						type='text'
						fullWidth
						value={newChatName}
						onChange={e => setNewChatName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setRenameDialogOpen(false)}>Отмена</Button>
					<Button onClick={handleRenameChat}>Сохранить</Button>
				</DialogActions>
			</Dialog>

			<Box
				sx={{
					maxWidth: '500px',
					minWidth: '300px',
					height: '100%',
					paddingX: '16px',
				}}
			>
				<MemoizedModelSettings />
			</Box>
		</Container>
	)
}

export default App
