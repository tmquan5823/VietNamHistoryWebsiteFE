import ttsClient from "./ttsClient";
import { ResponseData } from "@/utils/type";

export type TtsResponse = {
    async: string;
    error: number;
    message: string;
    request_id: string;
}

export const ttsApi = {
    getTts: (text: string): Promise<ResponseData<TtsResponse>> =>
      ttsClient.post("/hmi/tts/v5",  text ),
  };
  