import type { JSX } from "react";
import { memo, useContext } from "react";
import { createPortal } from "react-dom";
import type { IHomeManifestCtx } from "../../../lib/declarations/interfaces/contexts";
import { HomeManifestCtx } from "../../../lib/states/contexts/HomeManifestCtx";
import { NRDispatch } from "../../../lib/declarations/types/foundations";
import useDialog from "../../../lib/hooks/mount/useDialog";
import st from "../../../styles/Modules/dialog-manifest.module.css";

const DialogManifest = memo((): JSX.Element => {
  const ctx = useContext<IHomeManifestCtx>(HomeManifestCtx),
    closeTitle = "Close the manifest dialog",
    closeIdf = "dialogManifestClose",
    idf = "dialogManifest";
  let isManifestOpen: boolean = false,
    setManifestOpen: NRDispatch<boolean> = null;
  if (ctx) {
    isManifestOpen = ctx.isManifestOpen;
    setManifestOpen = ctx.setManifestOpen;
  }
  const { handler, ref: r } = useDialog({
    dispatch: setManifestOpen,
    state: isManifestOpen,
  });
  return !isManifestOpen ? (
    <></>
  ) : (
    createPortal(
      <dialog
        className={st.dialogManifestDialog}
        ref={r as any}
        id={idf}
        aria-controlledby={closeIdf}
      >
        <section className={st.dialogManifestHeader}>
          <h2>Our Manifest</h2>
          <button
            id={closeIdf}
            onClick={handler}
            title={closeTitle}
            aria-label={closeTitle}
            aria-controls={idf}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </section>
        <section className={st.manifest}>
          <header className={st.manifestHeader}>
            <h2 className={st.manifestTitle}>
              Project Manifest: Intent &amp; Vision
            </h2>
          </header>

          <article className={st.manifestBody}>
            <p className={st.manifestParagraph}>
              In this document, we formally declare for all our customers the
              <em className={st.manifestEmphasis}> intents and visions</em> that
              tailor this project.
            </p>

            <p className={st.manifestParagraph}>
              First and foremost: we view LLMs and Generative IAs as&nbsp;
              <strong className={st.manifestStrong}>Tools</strong> to enhance
              creative individuals who want to boost their performance and
              toolkit, thus this art generator is not a replacement for human
              creativity, but rather a tool to augment it. Our goal is to
              provide a platform that allows users to create and share their art
              in a way that is both accessible and enjoyable.
            </p>

            <p className={st.manifestParagraph}>
              We firmly believe that Generative Transformer Models are a great
              tool for exploring ideas, and we strive for a world where
              companies can collaborate with artists to materialize (or, rather,
              virtualize) their imagination and expression, rather than
              replacing them.
            </p>

            <p className={st.manifestParagraph}>
              There has been a severe clash between Tech Companies and Artists,
              in which there was a clear loser lately.
            </p>

            <p className={st.manifestParagraph}>
              Besides promoting our own product, we want to empower artists once
              again, and give them more comfort and feelings of ownership while
              dealing with these machines.
            </p>
          </article>

          <footer className={st.manifestFooter}>
            <p className={st.footerText}>
              <strong>
                Happy creation, and always remember your value as an artist!
              </strong>
            </p>
            <p className={st.footerNote}>
              You do not need the machines to create, <strong>they</strong> need
              you.
            </p>
            <p className={st.footerNote}>
              There is no purpose in machines working for themselves, and no
              purpose in art that cannibalizes itself.
            </p>
          </footer>
        </section>
      </dialog>,
      document.getElementById("primaryModalContainer") ?? document.body
    )
  );
});
export default DialogManifest;
