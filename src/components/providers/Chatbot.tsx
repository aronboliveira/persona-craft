import type { JSX } from "react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import Callbot from "../icons/buttons/Callbot";
import ChatbotPopup from "../modals/bot/ChatbotPopup";
import { ChatbotCtx } from "../../lib/states/contexts/ChatbotCtx";
export default function Chatbot(): JSX.Element {
  // TODO CREATE BUTTON REF IN PROVIDER
  const [isChatbotOpen, setChatbotOpen] = useState<boolean>(false);
  useEffect(() => {}, [isChatbotOpen]);
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
