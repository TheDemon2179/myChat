# myChat - An AI Chat Project

This is my first project using React!  It's a simple AI chat application called "myChat", designed to help me learn and practice my React skills.  Currently, it supports communication with the GROQ AI, using an API key stored in a `.env` file.

## Features

* **AI Chat with GROQ:** Converse with the GROQ AI using a simple and intuitive interface.
* **Model Selection:** Choose from different available GROQ models to experiment with different responses.
* **Temperature and Token Control:** Fine-tune the AI's responses by adjusting the temperature and maximum token count.
* **Chat Management:**
    * Create new chats.
    * Rename existing chats for better organization.
    * Delete chats you no longer need.
    * Clear the history of a chat to start fresh.
* **Local Storage Persistence:**  Your chat history is saved in localStorage, so you can pick up where you left off.
* **Material UI Design:** Utilizes the Material UI library for a clean and modern look and feel.

## Technologies Used

* **React:** The core framework for building the user interface.
* **GROQ SDK:** For interacting with the GROQ AI.
* **Material UI:** For styling and UI components.
* **Other Libraries:**
    * `@emotion/react` & `@emotion/styled`
    * `@mui/icons-material`
    * `lodash`
    * `react-dom`
    * `react-hook-form`
    * `react-markdown`
    * `react-syntax-highlighter`
    * `remark-gfm`

## Installation and Running

1. **Clone the repository:** `git clone [your-repository-url]`
2. **Install dependencies:** `yarn install`
3. **Create a `.env` file:** Add your GROQ API key in the `.env` file as `VITE_GROQ_API_KEY="your_api_key"
4. **Start the development server:** `yarn dev`

## Future Improvements

* **Support for other AI providers:**  Add the ability to connect to other AI models besides GROQ.
* **User Authentication:**  Implement user accounts and login functionality.
* **Enhanced Chat Features:** Explore features like file uploads, voice messaging, etc.
* **Improved UI/UX:**  Continuously refine the user interface and experience.

## Contributing

This is a personal project, and no one but me cares about it, so whatever you want :)

## License

This project is licensed under the [MIT License](LICENSE).
