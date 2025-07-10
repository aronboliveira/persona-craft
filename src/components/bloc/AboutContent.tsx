// AboutContent.tsx
import type { JSX } from "react";
import { memo, useMemo, useState } from "react";

export const AboutContent = memo(function AboutContent(): JSX.Element {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const features = useMemo(
    () => [
      {
        icon: "fa-brain",
        title: "Modelo de Personalidade Completo",
        desc: "Utiliza o modelo Big Five (OCEAN) para criar perfis psicológicos detalhados, garantindo personagens com traços consistentes e críveis.",
      },
      {
        icon: "fa-book",
        title: "Backstory Profunda",
        desc: "Gera histórias de fundo ricas com eventos formativos, motivações e conflitos internos que moldam o comportamento do personagem.",
      },
      {
        icon: "fa-comments",
        title: "Estilo de Comunicação",
        desc: "Define padrões de fala, vocabulário, tom e maneirismos únicos para cada personagem, adaptados ao seu perfil psicológico.",
      },
      {
        icon: "fa-cogs",
        title: "Sistema de Valores",
        desc: "Mapeia crenças fundamentais, princípios éticos e dilemas morais que guiam as decisões do personagem.",
      },
      {
        icon: "fa-magic",
        title: "Arquétipos Adaptáveis",
        desc: "Oferece 12 arquétipos fundamentais como base, com infinitas variações e combinações para personagens únicos.",
      },
      {
        icon: "fa-random",
        title: "Geração de Conflitos",
        desc: "Cria tensões internas e externas naturais que adicionam profundidade e oportunidades de desenvolvimento ao personagem.",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        init: "JD",
        color: "bg-purple-500",
        name: "Joana Dias",
        role: "Desenvolvedora de Chatbots",
        quote:
          "O PersonaCraft revolucionou nossa abordagem de criação de personagens. Nossos chatbots agora têm personalidades tão ricas que os usuários frequentemente esquecem que estão falando com uma IA!",
        stars: 5,
      },
      {
        init: "MR",
        color: "bg-pink-500",
        name: "Marcos Rocha",
        role: "Escritor de RPG",
        quote:
          "Como escritor, eu lutava para criar NPCs memoráveis. Com o PersonaCraft, consigo gerar dezenas de personagens únicos em uma tarde, cada um com personalidade e backstory convincentes.",
        stars: 5,
      },
      {
        init: "AS",
        color: "bg-blue-500",
        name: "Ana Souza",
        role: "Produtora de Conteúdo Educativo",
        quote:
          "Nossos tutores virtuais agora têm personalidades tão distintas que os alunos desenvolvem preferências por um ou outro. O engajamento com nosso material educativo aumentou 300%!",
        stars: 4.5,
      },
    ],
    []
  );

  const plans = useMemo(
    () => [
      {
        name: "Básico",
        price: "R$ 47",
        highlight: false,
        colorBox: "bg-gray-800",
        extras: [],
        features: [
          "Prompt completo PersonaCraft v2.0",
          "Guia de uso detalhado (PDF)",
          "10 templates de personagens populares",
        ],
        misses: ["Atualizações futuras", "Suporte prioritário"],
      },
      {
        name: "Profissional",
        price: "R$ 97",
        highlight: true,
        colorBox: "bg-gray-800 border-2 border-purple-500",
        extras: [
          "+50 templates de nichos específicos",
          "Atualizações gratuitas por 1 ano",
          "Suporte por email prioritário",
          "Guia avançado de ajustes finos",
        ],
        features: ["Tudo no plano Básico"],
        misses: [],
      },
      {
        name: "Empresarial",
        price: "R$ 197",
        highlight: false,
        colorBox: "bg-gray-800",
        extras: [
          "Atualizações vitalícias",
          "Suporte VIP (chat + email)",
          "Licença para uso comercial",
          "Workshop exclusivo (2h)",
        ],
        features: ["Tudo no plano Profissional"],
        misses: [],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Como recebo o prompt após a compra?",
        a: (
          <>
            <p>
              Imediatamente após a confirmação do pagamento, você receberá um
              email com:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Link para download do prompt em formato .txt</li>
              <li>
                Versão formatada para diferentes plataformas (ChatGPT, Claude,
                etc.)
              </li>
              <li>Guia de uso em PDF com exemplos práticos</li>
              <li>
                Instruções para copiar e colar diretamente no seu chatbot
                favorito
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "Posso usar para criar personagens comerciais?",
        a: (
          <>
            <p>
              Sim! Todos os planos permitem uso comercial, com algumas
              diferenças:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Básico:</strong> Até 3 personagens comerciais
              </li>
              <li>
                <strong>Profissional:</strong> Até 15 personagens comerciais
              </li>
              <li>
                <strong>Empresarial:</strong> Personagens ilimitados para sua
                empresa
              </li>
            </ul>
            <p className="mt-2">
              Personagens criados são de sua propriedade intelectual.
            </p>
          </>
        ),
      },
      {
        q: "O prompt funciona em qualquer modelo de IA?",
        a: (
          <>
            <p>O PersonaCraft foi otimizado para os principais modelos:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>ChatGPT (3.5 e 4)</li>
              <li>Claude (todas versões)</li>
              <li>Google Gemini</li>
              <li>LLaMA 2 / 3</li>
            </ul>
            <p className="mt-2">
              Incluímos variações do prompt adaptadas para cada plataforma. Para
              modelos menores ou especializados, recomendamos pequenos ajustes
              que ensinamos no guia avançado.
            </p>
          </>
        ),
      },
      {
        q: "E se eu não gostar dos resultados?",
        a: (
          <>
            <p>
              Oferecemos garantia incondicional de 7 dias. Se por qualquer
              motivo você não ficar satisfeito:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Envie um email para suporte@personacraft.com</li>
              <li>Devolveremos 100% do seu dinheiro sem perguntas</li>
              <li>Você pode manter os materiais recebidos</li>
            </ul>
            <p className="mt-2">
              Nos últimos 6 meses, menos de 2% dos clientes pediram reembolso.
            </p>
          </>
        ),
      },
    ],
    []
  );

  /* ─────────────────────────── helpers ──────────────────────────── */
  const smoothScroll = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const mobileMenu = () =>
    alert("Menu mobile seria implementado aqui em uma versão completa");

  /* ───────────────────────────── JSX ────────────────────────────── */
  return (
    <>
      {/* ────────────── Header / Navbar ────────────── */}
      <header className="gradient-bg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="bi bi-palette2" />
              <span className="text-xl font-bold">PersonaCraft</span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              {[
                { href: "/project", label: "Recursos" },
                { href: "#project", label: "Como Funciona" },
                { href: "#testimonials", label: "Depoimentos" },
                { href: "#pricing", label: "Preços" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={smoothScroll(
                    l.href.startsWith("#") ? l.href.slice(1) : ""
                  )}
                  className="hover:text-purple-200 transition"
                >
                  {l.label}
                </a>
              ))}

              <a
                href="#experiment"
                onClick={smoothScroll("experiment")}
                className="hover:text-purple-200 transition font-bold px-4 py-2 rounded-lg"
                style={{
                  border: "1px solid #999",
                  borderBottomWidth: "3px",
                  borderRightWidth: "2px",
                  background: "linear-gradient(90deg,#302f,transparent)",
                }}
              >
                Experimente agora!
              </a>
            </div>

            <button className="md:hidden text-white" onClick={mobileMenu}>
              <i className="fas fa-bars text-2xl" />
            </button>
          </div>
        </nav>
      </header>

      {/* ────────────── Hero ────────────── */}
      <section className="gradient-bg py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crie Personagens de IA Incríveis com{" "}
              <span className="text-purple-300">PersonaCraft</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              O prompt definitivo para desenvolver personalidades ricas e
              coerentes para seus assistentes de IA, chatbots e personagens
              virtuais.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#pricing"
                onClick={smoothScroll("pricing")}
                className="bg-white text-purple-800 hover:bg-purple-100 font-bold py-3 px-8 rounded-full text-center transition duration-300 transform hover:scale-105"
              >
                Compre Agora <i className="fas fa-arrow-right ml-2" />
              </a>
              <a
                href="#features"
                onClick={smoothScroll("features")}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-800 font-bold py-3 px-8 rounded-full text-center transition duration-300 transform hover:scale-105"
              >
                Saiba Mais <i className="fas fa-info-circle ml-2" />
              </a>
            </div>
          </div>

          {/* laptop-style mockup */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
              <div className="relative bg-gray-800 p-6 rounded-2xl shadow-xl glow">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                  <p className="text-green-400"># PersonaCraft Prompt v2.0</p>
                  <p className="text-gray-400">
                    Você é um especialista em criação de personagens. Seu
                    objetivo é ajudar a desenvolver personalidades ricas e
                    coerentes ...
                  </p>
                  <p className="text-gray-400 mt-4">[INSTRUÇÕES]</p>
                  <p className="text-gray-300">1. Comece perguntando ...</p>
                  <p className="text-gray-300">
                    2. Explore traços de personalidade ...
                  </p>
                  <p className="text-gray-300">
                    3. Desenvolva backstory detalhada ...
                  </p>
                  <p className="text-gray-300">
                    4. Defina estilo de comunicação ...
                  </p>
                  <p className="text-purple-300 mt-4">[EXEMPLO DE SAÍDA]</p>
                  <p className="text-gray-300">Nome: Dr. Elias Vance</p>
                  <p className="text-gray-300">Personalidade: Analítico ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── Features ────────────── */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Recursos Exclusivos do{" "}
            <span className="text-purple-400">PersonaCraft</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-900 p-8 rounded-xl hover-scale transition duration-300"
              >
                <div className="text-center mb-6">
                  <i className={`fas ${f.icon} feature-icon`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  {f.title}
                </h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── How It Works ────────────── */}
      <section id="project" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Como o <span className="text-purple-400">PersonaCraft</span>{" "}
            Transforma Sua Criação
          </h2>

          {/* Block 1 */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-gray-800 p-6 rounded-xl glow">
                <div className="flex items-center mb-4">
                  {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((c) => (
                    <div key={c} className={`w-3 h-3 rounded-full ${c} mr-2`} />
                  ))}
                </div>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                  <p className="text-purple-400">
                    PersonaCraft: Vamos criar seu personagem!
                  </p>
                  <p className="text-gray-400">
                    1. Qual o propósito deste personagem? ...
                  </p>
                  <p className="text-gray-300 mt-4">
                    &gt; Assistente de estudos para universitários
                  </p>
                  <p className="text-green-400 mt-4">
                    Ótimo! Criando perfil para "Professor Alviss"…
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl font-bold mb-6">
                Processo Interativo e Guiado
              </h3>
              <p className="text-gray-400 mb-6">
                O PersonaCraft guia você através de um processo de criação passo
                a passo, fazendo perguntas relevantes para extrair o máximo de
                potencial do seu personagem.
              </p>
              <ul className="space-y-4">
                {[
                  "Adapta-se ao seu nível de experiência – de iniciantes a escritores profissionais",
                  "Oferece sugestões inteligentes quando você está em dúvida",
                  "Gera múltiplas variações para você escolher ou combinar",
                ].map((txt) => (
                  <li key={txt} className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-3" />
                    <span className="text-gray-300">{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row items-center mt-20">
            <div className="md:w-1/2 mb-10 md:mb-0 order-1 md:order-2">
              <div className="bg-gray-800 p-6 rounded-xl glow">
                <div className="flex items-center mb-4">
                  {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((c) => (
                    <div key={c} className={`w-3 h-3 rounded-full ${c} mr-2`} />
                  ))}
                </div>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                  <p className="text-purple-400">
                    PersonaCraft: Perfil Completo
                  </p>
                  <p className="text-yellow-300">Nome: Professor Alviss</p>
                  <p className="text-gray-300">
                    Arquétipo: Mentor (80%) + Cientista Louco (20%)
                  </p>
                  <p className="text-green-400">
                    Deseja ajustar algum aspecto ou gerar variações?
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-6">
                Resultados Profissionais em Minutos
              </h3>
              <p className="text-gray-400 mb-6">
                Em vez de gastar horas tentando criar personagens coerentes, o
                PersonaCraft gera perfis completos em poucos minutos, com:
              </p>
              <ul className="space-y-4">
                {[
                  "Consistência psicológica em todas as interações",
                  "Profundidade emocional que engaja usuários",
                  "Flexibilidade para diferentes contextos e cenários",
                  "Detalhes únicos que diferenciam seus personagens",
                ].map((txt) => (
                  <li key={txt} className="flex items-start">
                    <i className="fas fa-star text-purple-400 mt-1 mr-3" />
                    <span className="text-gray-300">{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── Testimonials ────────────── */}
      <section id="testimonials" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O Que Nossos Clientes Dizem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testimonial-card p-6 rounded-xl hover-scale transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-xl font-bold mr-4`}
                  >
                    {t.init}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-purple-300 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">"{t.quote}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(Math.floor(t.stars))].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                  {t.stars % 1 ? <i className="fas fa-star-half-alt" /> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── Pricing ────────────── */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-center text-gray-400 mb-16">
            Investimento único – Use para sempre
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`${p.colorBox} rounded-xl p-8 hover-scale relative transition duration-300`}
              >
                {p.highlight && (
                  <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    MAIS POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-purple-300">
                  {p.name}
                </h3>
                <p className="text-gray-400 mb-6">
                  {p.name === "Básico"
                    ? "Para criadores individuais e pequenos projetos"
                    : p.name === "Profissional"
                    ? "Para desenvolvedores sérios e equipes criativas"
                    : "Para agências e grandes projetos comerciais"}
                </p>

                <div className="text-4xl font-bold mb-6">{p.price}</div>

                <ul className="space-y-3 mb-8">
                  {[...p.features, ...p.extras].map((txt) => (
                    <li key={txt} className="flex items-start">
                      <i className="fas fa-check text-purple-400 mt-1 mr-3" />
                      <span className="text-gray-300">{txt}</span>
                    </li>
                  ))}
                  {p.misses.map((m) => (
                    <li key={m} className="flex items-start">
                      <i className="fas fa-times text-gray-500 mt-1 mr-3" />
                      <span className="text-gray-500">{m}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                  Comprar Agora
                </button>
              </div>
            ))}
          </div>

          {/* Secure note */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Não está certo? Oferecemos garantia de 7 dias sem perguntas.
            </p>
            <div className="flex items-center justify-center">
              <i className="fas fa-lock text-purple-400 mr-2" />
              <span className="text-sm text-gray-400">
                Pagamento seguro processado por
              </span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
                alt="PayPal"
                className="h-6 ml-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── FAQ ────────────── */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {faqs.map(({ q, a }, idx) => (
              <div key={q} className="bg-gray-900 rounded-xl p-6">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-bold">{q}</h3>
                  <i
                    className={`fas ${
                      openFaq === idx ? "fa-chevron-up" : "fa-chevron-down"
                    } text-purple-400 transition-transform`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="mt-4 text-gray-400">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section id="experiment" className="gradient-bg py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Elevar Seus Personagens de IA?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 3.200 criadores que já transformaram sua
            abordagem à criação de personagens com o PersonaCraft.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#pricing"
              onClick={smoothScroll("pricing")}
              className="bg-white text-purple-800 hover:bg-purple-100 font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
            >
              Compre Agora <i className="fas fa-arrow-right ml-2" />
            </a>
            <a
              href="#features"
              onClick={smoothScroll("features")}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-800 font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
            >
              Ver Demonstração <i className="fas fa-play-circle ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* ────────────── Footer ────────────── */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-robot text-2xl text-purple-400" />
                <span className="text-xl font-bold">PersonaCraft</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                O prompt definitivo para criação de personagens de IA ricos e
                coerentes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Produto",
                  links: [
                    { id: "features", label: "Recursos" },
                    { id: "pricing", label: "Preços" },
                    { id: "testimonials", label: "Depoimentos" },
                  ],
                },
                {
                  title: "Suporte",
                  links: [
                    { id: "", label: "FAQ" },
                    { id: "", label: "Contato" },
                    { id: "", label: "Política de Reembolso" },
                  ],
                },
                {
                  title: "Legal",
                  links: [
                    { id: "", label: "Termos de Uso" },
                    { id: "", label: "Política de Privacidade" },
                    { id: "", label: "Licenças" },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-lg font-bold mb-4">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map((lk) => (
                      <li key={lk.label}>
                        <a
                          href={lk.id ? `#${lk.id}` : "#"}
                          onClick={lk.id ? smoothScroll(lk.id) : undefined}
                          className="text-gray-400 hover:text-purple-300 transition"
                        >
                          {lk.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2023 PersonaCraft. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              {["twitter", "discord", "github", "youtube"].map((net) => (
                <a
                  key={net}
                  href="#"
                  className="text-gray-400 hover:text-purple-300 transition"
                >
                  <i className={`fab fa-${net}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});
