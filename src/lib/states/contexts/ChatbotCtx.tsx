import { createContext } from "react";
import { IChatbotCtx } from "../../declarations/interfaces/contexts";
const defaultCtx = { isChatbotOpen: false, setChatbotOpen: null };
export const ChatbotCtx = createContext<IChatbotCtx>(defaultCtx);
