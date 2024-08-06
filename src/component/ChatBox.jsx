import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { loadingStyles, paperStyles } from '../styles/myStyles.js'
import { ChatContext } from './ChatProvider.jsx'
import InputForm from './InputForm.jsx'

const ChatBox = ({ AI_MODEL_NAME, onClearChat, onSubmit }) => {
	const { messages, isLoading, setUserInput, userInput } =
		useContext(ChatContext)

	return (
		<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
			<div
				className='chatBox'
				style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}
			>
				{messages.map((msg, index) => (
					<Paper
						key={index}
						sx={{
							...paperStyles,
							alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
							backgroundColor: msg.role === 'user' ? '#a74450' : '#70000d',
							position: 'relative',
						}}
					>
						<Typography
							variant='caption'
							sx={{
								position: 'absolute',
								top: 2,
								right: 8,
								color: '#ffc2c7',
							}}
						>
							{msg.role === 'user' ? 'Вы' : msg.modelName || AI_MODEL_NAME}
						</Typography>
						<Box sx={{ mt: 2 }}>
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									code({ inline, className, children, ...props }) {
										const match = /language-(\w+)/.exec(className || '')
										return !inline && match ? (
											<SyntaxHighlighter
												{...props}
												style={dark}
												language={match[1]}
												PreTag='div'
											>
												{String(children).replace(/\n$/, '')}
											</SyntaxHighlighter>
										) : (
											<code {...props} className={className}>
												{children}
											</code>
										)
									},
								}}
							>
								{msg.content}
							</ReactMarkdown>
						</Box>
					</Paper>
				))}
				{isLoading && (
					<Box sx={{ ...loadingStyles }}>
						<CircularProgress />
					</Box>
				)}
			</div>

			<InputForm
				userInput={userInput}
				setUserInput={setUserInput}
				messages={messages}
				onSubmit={onSubmit}
				onClearChat={onClearChat}
				isLoading={isLoading}
			/>
		</Box>
	)
}

ChatBox.propTypes = {
	AI_MODEL_NAME: PropTypes.string,
	onClearChat: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
}

export default ChatBox
