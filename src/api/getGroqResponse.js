import Groq from 'groq-sdk'

const groq = new Groq({
	apiKey: import.meta.env.VITE_GROQ_API_KEY,
	dangerouslyAllowBrowser: true,
})

export const getGroqChatStream = async (messages, mdel, temp, maxtok) => {
	const formattedMessages = messages.map(msg => ({
		role: msg.role,
		content: msg.content,
	}))

	return groq.chat.completions.create({
		messages: formattedMessages,
		model: mdel,
		temperature: temp,
		max_tokens: maxtok,
		top_p: 1,
		stop: null,
		stream: true,
	})
}
