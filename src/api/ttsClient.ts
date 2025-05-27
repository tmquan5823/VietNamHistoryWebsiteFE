import axios from "axios";

const ttsClient = axios.create({
  baseURL: import.meta.env.VITE_TTS_URL,
  headers: {
    "Content-Type": "application/json",
    "api-key": import.meta.env.VITE_TTS_API_KEY,
    "voice": "banmai",
    "speed": "1",
  },
});


export default ttsClient;
