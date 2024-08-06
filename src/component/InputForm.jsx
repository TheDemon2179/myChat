import { Box, Button, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const InputForm = ({
	userInput,
	setUserInput,
	messages,
	onSubmit,
	onClearChat,
	isLoading,
}) => {
	return (
		<form
			onSubmit={onSubmit}
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<TextField
				required
				id='outlined-required'
				label='Введите сообщение'
				value={userInput}
				onChange={e => setUserInput(e.target.value)}
				fullWidth
				margin='normal'
			/>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button
					variant='outlined'
					onClick={onClearChat}
					disabled={isLoading || messages.length === 0}
				>
					Очистить чат
				</Button>
				<Button variant='contained' type='submit' disabled={isLoading}>
					{isLoading ? 'Отправка...' : 'Отправить'}
				</Button>
			</Box>
		</form>
	)
}

InputForm.propTypes = {
	userInput: PropTypes.string.isRequired,
	setUserInput: PropTypes.func.isRequired,
	messages: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClearChat: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
}

export default InputForm
