import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { ChatContext } from './ChatProvider'

const ChatList = ({ onSwitchChat, onOpenRenameDialog, onDeleteChat }) => {
	const { chats, currentChatId } = useContext(ChatContext)

	return (
		<List>
			{chats.map(chat => (
				<ListItem
					key={chat.id}
					button
					selected={chat.id === currentChatId}
					onClick={() => onSwitchChat(chat.id)}
					secondaryAction={
						<>
							<IconButton
								edge='end'
								aria-label='edit'
								onClick={() => onOpenRenameDialog(chat)}
							>
								<EditIcon />
							</IconButton>
							<IconButton
								edge='end'
								aria-label='delete'
								onClick={() => onDeleteChat(chat.id)}
							>
								<DeleteIcon />
							</IconButton>
						</>
					}
				>
					<ListItemText primary={chat.name} />
				</ListItem>
			))}
		</List>
	)
}

ChatList.propTypes = {
	onSwitchChat: PropTypes.func.isRequired,
	onOpenRenameDialog: PropTypes.func.isRequired,
	onDeleteChat: PropTypes.func.isRequired,
}

export default ChatList
