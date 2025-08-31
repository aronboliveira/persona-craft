import type { JSX } from "react";
import { memo } from "react";
const ChatbotIframe = memo((): JSX.Element => {
  return (
    <iframe
      src="http://127.0.0.1:8002/view-chainlit/"
      title="Chainlit Chat"
      style={{ width: "80%", height: "49vh", border: "none" }}
      sandbox="allow-same-origin allow-scripts allow-forms"
    ></iframe>
  );
});
export default ChatbotIframe;
