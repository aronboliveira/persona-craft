import type { JSX } from "react";
import { memo, useContext } from "react";
import useDialog from "../../../lib/hooks/useDialog";
import { IChatbotCtx } from "../../../lib/declarations/interfaces/contexts";
import { NRDispatch } from "../../../lib/declarations/types/foundations";
import { ChatbotCtx } from "../../providers/Chatbot";
import st from "../../../styles/Modules/chatbot-popup.module.css";
const ChatbotPopup = memo((): JSX.Element => {
  const ctx = useContext<IChatbotCtx>(ChatbotCtx);
  // closeTitle = "Close the manifest dialog",
  // closeIdf = "dialogManifestClose",
  // idf = "dialogManifest";
  let isChatbotOpen: boolean = false,
    setChatbotOpen: NRDispatch<boolean> = null;
  if (ctx) {
    isChatbotOpen = ctx.isChatbotOpen;
    setChatbotOpen = ctx.setChatbotOpen;
  }
  const { ref: r, handler } = useDialog({
    dispatch: setChatbotOpen,
    state: isChatbotOpen,
  });
  return !isChatbotOpen ? (
    <></>
  ) : (
    <div className={st.chatbotPopupMain} ref={r as any}>
      <iframe
        src="http://127.0.0.1:8002/view-chainlit/"
        title="Chainlit Chat"
        style={{ width: "80%", height: "49vh", border: "none" }}
        sandbox="allow-same-origin allow-scripts allow-forms"
      ></iframe>
      {/* <form className="chatbot-popup-content">
        <h2>Chatbot</h2>
        <p>How can I assist you today?</p>
        <textarea
          id="chatbotPrompt"
          className={`form-control ${st.chatbotPopupPrompt}`}
        />
        <br />
        <fieldset className={st.chatbotPopupCta}>
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await fetch(
                  `http://127.0.0.1:8002/api/chat`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      message: (
                        document.getElementById(
                          "chatbotPrompt"
                        ) as HTMLTextAreaElement
                      ).value,
                      history: [],
                    }),
                  }
                );
                const data = await res.json();
                console.log(data.response);
              } catch (e) {
                console.error("Error sending prompt:", e);
              }
            }}
          >
            Send prompt
          </button>
          <button className="close-button" onClick={handler}>
            Close
          </button>
        </fieldset>
      </form> */}
      <script></script>
    </div>
  );
});
export default ChatbotPopup;
