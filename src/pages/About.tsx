import type { JSX } from "react";
import { lazy, Suspense, useEffect } from "react";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import { useExternalResourcesAsync } from "../lib/hooks/useExternalResourcesAsync";
import Spinner from "../components/icons/animated/Spinner";

const AboutContent = lazy(() =>
  import("../components/bloc/AboutContent").then((m) => ({
    default: m.AboutContent,
  }))
);

export default function About(): JSX.Element {
  const ready = useExternalResourcesAsync([
    { type: "script", src: "https://cdn.tailwindcss.com" },
    {
      type: "link",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
    {
      type: "link",
      href: "/styles/about.css",
    },
  ]);
  useOpacityTransition("1");
  useEffect(() => {
    const root = document.getElementById("root");
    const cls = ["bg-gray-900", "text-white", "font-sans"];
    cls.forEach((c) => root?.classList.add(c));
    return () => cls.forEach((c) => root?.classList.remove(c));
  }, []);
  if (!ready) return <Spinner />;
  return (
    <Suspense fallback={<Spinner />}>
      <AboutContent />
    </Suspense>
  );
}
