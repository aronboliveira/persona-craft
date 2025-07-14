import type { JSX } from "react";
import { createContext, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import type { IChatbotCtx } from "../../lib/declarations/interfaces/contexts";
import Callbot from "../icons/buttons/Callbot";
import ChatbotPopup from "../modals/bot/ChatbotPopup";
const defaultCtx = { isChatbotOpen: false, setChatbotOpen: null };
export const ChatbotCtx = createContext<IChatbotCtx>(defaultCtx);
export default function Chatbot(): JSX.Element {
  const [isChatbotOpen, setChatbotOpen] = useState<boolean>(false);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <ChatbotCtx.Provider value={{ isChatbotOpen, setChatbotOpen }}>
        <ChatbotPopup />
        <Callbot
          style={{ top: "88%", left: "90vw", position: "fixed" }}
          callback={setChatbotOpen}
          callbackArgs={[!isChatbotOpen]}
        />
      </ChatbotCtx.Provider>
    </ErrorBoundary>
  );
}
