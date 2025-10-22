import React, { useState } from "react";
import { useExternalResources } from "../lib/hooks/resources/useExternalResources";
import type { JSX } from "react/jsx-dev-runtime";
import useOpacityTransition from "../lib/hooks/styles/useOpacityTransition";

type Role = "bot" | "user";

interface Message {
  role: Role;
  text: string;
}

interface FormState {
  objetivo: string;
  dados: string;
  estilo: string;
}

export default function Subscribe(): JSX.Element {
  useOpacityTransition();
  useExternalResources([
    {
      type: "link",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    },
    { type: "script", src: "https://cdn.tailwindcss.com" },
    {
      type: "link",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
    },
    {
      type: "script",
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    },
  ]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Olá! Sou seu assistente IA. Vamos criar juntos um modelo artificial de imagem baseado nos seus dados.",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [iaSuggestion, setIaSuggestion] = useState<string>("");
  const [form, setForm] = useState<FormState>({
    objetivo: "",
    dados: "",
    estilo: "",
  });
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [iaPrompt, setIaPrompt] = useState<string>("");
  const gerarSugestaoIa = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes("gato")) {
      return "Sugiro utilizar um modelo GAN condicionado para gerar gatos em diferentes estilos. Considere usar dataset de gatos e ajustar hiperparâmetros para obter variedade visual.";
    }
    if (lower.includes("realista")) {
      return "Para estilo realista, recomenda-se utilizar um modelo diffusion com condicionamento textual detalhado e dataset de alta resolução.";
    }
    return "Baseando-se nos dados informados, recomendo utilizar um modelo de geração de imagens com ajustes personalizados conforme o objetivo desejado.";
  };
  const sendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setInput("");

    const resposta = gerarSugestaoIa(trimmed);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: resposta }]);
      setIaSuggestion(resposta);
    }, 700);
  };
  const genPrompts = (): void => {
    const { objetivo, dados, estilo } = form;

    const usuario = `Crie um modelo de geração de imagem com o seguinte objetivo: "${objetivo}".\nUtilize os dados: "${dados}".\nEstilo desejado: "${estilo}".`;
    const ia = iaSuggestion
      ? `Sugestão da IA: ${iaSuggestion}\n\nPrompt estruturado: Crie um modelo de imagem do tipo "${estilo}" com foco em "${objetivo}" usando os dados fornecidos (${dados}).`
      : "Preencha o formulário e consulte o assistente IA para recomendações.";

    setUserPrompt(usuario);
    setIaPrompt(ia);
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
          <div className="ia-panel p-5 h-100 flex flex-col">
            <h2 className="text-2xl fw-bold mb-3 text-blue-700 d-flex align-items-center gap-2">
              <i className="fa-solid fa-robot" /> Assistente IA — Criador de
              Modelos de Imagem
            </h2>

            <ul className="list-unstyled space-y-3 scroll-area mb-4">
              {messages.map(({ role, text }, idx) => (
                <li
                  key={idx}
                  className={
                    role === "bot"
                      ? "bg-blue-100 text-blue-900 px-4 py-2 rounded-lg mb-2 max-w-xl"
                      : "bg-green-100 text-green-900 px-4 py-2 rounded-lg mb-2 ms-auto max-w-xl text-end"
                  }
                >
                  {text}
                </li>
              ))}
            </ul>

            <form className="d-flex gap-2" onSubmit={sendMessage}>
              <input
                type="text"
                className="form-control flex-grow"
                placeholder="Digite sua pergunta ou dados..."
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
              />
              <button type="submit" className="btn btn-primary">
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="form-panel p-5 h-100 flex flex-col">
            <h2 className="text-2xl fw-bold mb-3 text-green-700 d-flex align-items-center gap-2">
              <i className="fa-solid fa-file-alt" /> Formulário &amp; Gerador de
              Prompts
            </h2>

            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              {/* Objetivo */}
              <div>
                <label className="form-label fw-semibold">
                  1. Objetivo do Modelo
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={form.objetivo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, objetivo: e.target.value })
                  }
                />
              </div>

              {/* Dados */}
              <div>
                <label className="form-label fw-semibold">
                  2. Dados de Entrada
                </label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={form.dados}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({ ...form, dados: e.target.value })
                  }
                />
              </div>

              {/* Estilo */}
              <div>
                <label className="form-label fw-semibold">
                  3. Estilo Desejado
                </label>
                <select
                  className="form-select"
                  required
                  value={form.estilo}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setForm({ ...form, estilo: e.target.value })
                  }
                >
                  <option value="">Selecione...</option>
                  <option>Realista</option>
                  <option>Cartoon</option>
                  <option>Minimalista</option>
                  <option>Surrealista</option>
                </select>
              </div>

              {/* Recomendações */}
              <div>
                <label className="form-label fw-semibold">
                  4. Recomendações / Respostas da IA
                </label>
                <textarea
                  rows={2}
                  className="form-control"
                  readOnly
                  value={iaSuggestion}
                />
              </div>

              {/* Botões */}
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-success flex-grow"
                  onClick={genPrompts}
                >
                  <i className="fa-solid fa-magic" /> Gerar Prompts
                </button>
                <button
                  type="reset"
                  className="btn btn-outline-secondary flex-grow"
                  onClick={() => {
                    setForm({ objetivo: "", dados: "", estilo: "" });
                    setUserPrompt("");
                    setIaPrompt("");
                  }}
                >
                  Limpar
                </button>
              </div>
            </form>

            {/* Resultados */}
            <div className="mt-5">
              <h3 className="fw-bold fs-5 mb-2 text-gray-700">
                Prompt do Usuário
              </h3>
              <pre className="bg-gray-100 p-3 rounded-md">{userPrompt}</pre>

              <h3 className="fw-bold fs-5 mt-4 mb-2 text-blue-700">
                Prompt Sugerido pela IA
              </h3>
              <pre className="bg-blue-50 p-3 rounded-md">{iaPrompt}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
