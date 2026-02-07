# Character Prompt Creator

A type-safe character builder and prompt assistant for generative image workflows with comprehensive test coverage and production-ready architecture.

## 🏗️ Architecture Overview

The project follows a modular, type-safe architecture:

- **Frontend**: React 19 + TypeScript 5.8 + Vite 6 + Redux Toolkit 2.8
- **Testing**: Jest + React Testing Library with 70%+ coverage threshold
- **Backend**: Django + Chainlit
- **LLM/Chat Layer**: Chainlit-based assistants embeddable in UI

## ✨ Key Features

### Anatomy-Driven Character Modeling

Structured character definition through strongly typed anatomical components:

- **Body**: Height, weight/body-fat, muscle, gender, narrative tags
- **Hair**: Texture, length, tidiness with bangs substructure
- **Eyes**: Comprehensive modeling including eyeball, iris, pupil, shape, eyelids, eye bags, lashes, and brows
- **Mouth & Lips**: Detailed lip structure, Cupid's bow, commissure, and dimples

### Type Safety Guarantees

Each anatomical feature is backed by literal constant arrays and corresponding union types, ensuring:

- Valid form options at compile-time
- Type-checked Redux state updates
- Runtime data integrity
- Comprehensive test coverage with input/output variation matrices

### Testing Infrastructure

**Unit Tests**: Component behavior, Redux store, utilities
**Performance Tests**: Sub-millisecond validation, efficient rendering
**Integration Tests**: Redux middleware, state persistence
**Accessibility Tests**: ARIA labels, keyboard navigation

Coverage thresholds enforced at 70% for branches, functions, lines, and statements.

## 🧠 Core Design Patterns

### PromptState Management

Global Redux state containing:

- Current art style selection
- Complete typed character anatomy tree
- Environmental scene configuration
- Automatic timestamp tracking on modifications

### Anatomy Type System

Hierarchical interfaces and union types model biological structures with compile-time validation. The system maintains synchronization between type definitions and their constant value arrays.

### Builder & Validator Patterns

Centralized state management through complementary classes:

- **CharacterValidator**: Ensures required anatomical substructures exist, initializing with defaults when necessary
- **CharacterBuilder**: Handles type-safe merging of updates into nested anatomical structures

### Domain Invariant Enforcement

Reducers maintain biological plausibility through conditional logic that preserves anatomical constraints (e.g., epicanthic fold variations only apply when folds exist).

### DeepAnatomicOption Generic

A reusable pattern for form options that provides:

- Type-safe key paths into nested character structures
- Friendly display names
- Associated image resources
- Language-aware labeling

## 🧩 Error Handling & UX

### React Error Boundaries

All form components are wrapped with error boundaries that:

- Catch and isolate rendering errors
- Provide contextual error information
- Display user-friendly fallback interfaces

### Centralized Error Handler

Unified error management with:

- Structured logging with component context
- Configurable user notification methods (toast/alerts)
- Separation of error presentation from business logic

## 🌐 Internationalization

### Dictionary-Driven Text System

- FORM_DICT and GENERIC_DICT provide language-specific content
- React context manages language selection
- Form components consume text via language-aware hooks
- Easy addition of new language support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ (for backend)

### Installation & Development

```bash
# Install frontend dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test:coverage

# Run tests in watch mode
npm test:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
# Set up Python environment
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations and start server
cd prompt_creator_app_backend
python manage.py migrate
python manage.py runserver
```

## 🧪 Testing

### Test Structure

```
src/
├── __tests__/              # Integration tests
├── components/
│   └── __tests__/          # Component tests
├── redux/
│   └── __tests__/          # Store tests
└── classes/
    └── __tests__/          # Unit tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- GenderForm.test.tsx

# Run with coverage report
npm test:coverage

# Run in watch mode for development
npm test:watch

# Run with verbose output
npm test:verbose
```

### Test Coverage

Current coverage thresholds (enforced):

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

View detailed coverage report:

```bash
npm test:coverage
open coverage/lcov-report/index.html
```

## 📊 Performance Benchmarks

- **Validation**: <1ms per character validation (1000 iterations)
- **Redux Dispatch**: <1ms per action
- **Component Render**: <100ms initial render
- **State Persistence**: 300ms debounced sessionStorage write

## 🔁 Development Workflow

### Adding New Anatomical Features

Follow this systematic six-step pattern to extend the character model while maintaining type safety and system consistency:

1. **Type Definitions** (Focus: Compile-time safety)  
   Create union types with corresponding `as const` literal arrays to ensure type validation at compile time.

2. **Domain Modeling** (Focus: Architecture)  
   Extend the hierarchical TypeScript interfaces to integrate the new feature into the character anatomy structure.

3. **Default Configuration** (Focus: Initial state)  
   Add sensible defaults to the initial character configuration for immediate usability.

4. **Validation & Building** (Focus: State management)  
   Implement corresponding `ensure*` and `merge*` methods in helper classes for type-safe state manipulation.

5. **State Management** (Focus: Data flow)  
   Create Redux reducers using `DeepPartial` typing to handle controlled, granular updates to the state.

6. **UI Components** (Focus: User experience)  
   Build form components following established patterns:
   - Wrap with error boundaries
   - Integrate language context for internationalization
   - Use `DeepAnatomicOption` for type-safe configuration
   - Follow consistent styling and layout conventions

This structured approach ensures new features integrate seamlessly while preserving the system's type safety guarantees, maintainability, and consistent user experience.

## 🛠️ Code Quality

### Type Safety

- Strict TypeScript configuration
- No `any` types (replaced with `unknown` + type guards)
- Compile-time validation of all form options
- Redux state fully typed

### Testing Strategy

- **Unit Tests**: Validators, utilities, strategists
- **Component Tests**: User interactions, rendering, accessibility
- **Integration Tests**: Redux store, middleware, persistence
- **Performance Tests**: Sub-millisecond benchmarks
- **I/O Variation Matrices**: Comprehensive input/output testing

### Build Status

- ✅ TypeScript compilation: Clean
- ✅ ESLint: No errors
- ✅ Test coverage: >70% all metrics
- ✅ Build size: 623KB (gzipped: 187KB)

## 📁 Project Structure

```
prompt-creator-app/
├── src/
│   ├── components/        # React components
│   │   ├── forms/        # Form components (66 anatomy forms)
│   │   ├── buttons/      # Action buttons, swipe handlers
│   │   ├── modals/       # Tips, dialogs
│   │   └── __tests__/    # Component tests
│   ├── redux/
│   │   ├── mainStore/    # Redux store configuration
│   │   │   ├── slices/   # State slices
│   │   │   ├── selectors/# Memoized selectors
│   │   │   └── __tests__/# Store tests
│   │   └── data/
│   │       ├── classes/  # Validators, builders
│   │       └── defaults/ # Initial state
│   ├── classes/
│   │   ├── strategists/  # Form routing logic
│   │   └── validators/   # Type guards
│   ├── lib/
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Helper functions
│   │   └── declarations/ # TypeScript types
│   └── pages/            # Route components
├── jest.config.ts        # Jest configuration
├── tsconfig.json         # TypeScript config
└── vite.config.ts        # Vite bundler config
```

## 🤝 Contributing

### Git Workflow

All commits follow atomic commit principles:

```bash
# Feature commits
git commit -m "feat: add eyebrow symmetry form"

# Bug fixes
git commit -m "fix: correct selector state access in HairLengthForm"

# Tests
git commit -m "test: add comprehensive CharacterValidator test suite"

# Documentation
git commit -m "docs: update README with testing instructions"

# Refactoring
git commit -m "refactor: replace any types with unknown in validators"
```

### Commit Guidelines

- One logical change per commit
- Clear, descriptive commit messages
- Run tests before committing: `npm test`
- Ensure build passes: `npm run build`

## 📝 License

MIT License - See LICENSE file for details

---

### Padrões de Construtor e Validador

Gerenciamento de estado centralizado através de classes complementares:

- **CharacterValidator**: Garante que subestruturas anatômicas necessárias existam, inicializando com padrões quando necessário
- **CharacterBuilder**: Lida com mesclagem segura de atualizações em estruturas anatômicas aninhadas

### Aplicação de Invariantes de Domínio

Redutores mantêm plausibilidade biológica através de lógica condicional que preserva restrições anatômicas (ex.: variações de dobra epicântica só se aplicam quando dobras existem).

### Genérico DeepAnatomicOption

Um padrão reutilizável para opções de formulário que fornece:

- Caminhos de chaves seguras em estruturas de personagem aninhadas
- Nomes de exibição amigáveis
- Recursos de imagem associados
- Rotulagem com consciência de idioma

## 🧩 Tratamento de Erros e UX

### Limites de Erro do React

Todos os componentes de formulário são envolvidos por limites de erro que:

- Capturam e isolam erros de renderização
- Fornecem informações contextuais de erro
- Exibem interfaces de fallback amigáveis

### Manipulador de Erros Centralizado

Gerenciamento unificado de erros com:

- Registro estruturado com contexto do componente
- Métodos configuráveis de notificação ao usuário (toast/alertas)
- Separação entre apresentação de erros e lógica de negócio

## 🌐 Internacionalização

### Sistema de Texto Baseado em Dicionários

- FORM_DICT e GENERIC_DICT fornecem conteúdo específico por idioma
- Contexto React gerencia seleção de idioma
- Componentes de formulário consomem texto via hooks conscientes de idioma
- Adição fácil de suporte a novos idiomas

## 🚀 Começando

### Desenvolvimento

```bash
npm install          # Instalar dependências
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Construir para produção
npm run preview      # Pré-visualizar build de produção
# Configurar ambiente Python
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Instalar dependências e executar
pip install -r requirements.txt
cd prompt_creator_app_backend
python manage.py migrate
python manage.py runserver
```

## 🔁 Fluxo de Trabalho de Desenvolvimento

### Adicionando Novas Características Anatômicas

Siga este padrão sistemático de seis etapas para estender o modelo de personagem mantendo a segurança de tipos e consistência do sistema:

1. **Definições de Tipo** _(Foco: Segurança em tempo de compilação)_  
   Crie tipos de união com arrays literais `as const` correspondentes para garantir validação de tipo em tempo de compilação.

2. **Modelagem de Domínio** _(Foco: Arquitetura)_  
   Estenda as interfaces hierárquicas TypeScript para integrar a nova característica na estrutura anatômica do personagem.

3. **Configuração Padrão** _(Foco: Estado inicial)_  
   Adicione padrões sensíveis à configuração inicial do personagem para usabilidade imediata.

4. **Validação e Construção** _(Foco: Gerenciamento de estado)_  
   Implemente métodos `ensure*` e `merge*` correspondentes nas classes auxiliares para manipulação segura de estado.

5. **Gerenciamento de Estado** _(Foco: Fluxo de dados)_  
   Crie redutores Redux usando tipagem `DeepPartial` para lidar com atualizações granulares e controladas do estado.

6. **Componentes de UI** _(Foco: Experiência do usuário)_  
   Construa componentes de formulário seguindo padrões estabelecidos:
   - Envolva com limites de erro
   - Integre contexto de idioma para internacionalização
   - Use `DeepAnatomicOption` para configuração segura de tipos
   - Siga convenções consistentes de estilo e layout

Esta abordagem estruturada garante que novas características se integrem perfeitamente enquanto preserva as garantias de segurança de tipos do sistema, a capacidade de manutenção e uma experiência de usuário consistente.

</details>

<details>
<summary>🇪🇸 Español (es-ES)</summary>

# Character Prompt Creator

Un creador de personajes y asistente de prompts con tipado seguro para flujos de trabajo de generación de imágenes.

## 🏗️ Visión General de la Arquitectura

El proyecto sigue una arquitectura modular con tipado seguro:

- **Frontend**: React + TypeScript + Vite + Redux Toolkit
- **Backend**: Django + Chainlit
- **Capa LLM/Chat**: Asistentes basados en Chainlit integrables en la interfaz

## ✨ Características Principales

### Modelado de Personajes Basado en Anatomía

Definición estructurada de personajes mediante componentes anatómicos fuertemente tipados:

- **Cuerpo**: Altura, peso/grasa corporal, músculos, género, etiquetas narrativas
- **Cabello**: Textura, longitud, orden con subestructura de flequillo
- **Ojos**: Modelado integral incluyendo globo ocular, iris, pupila, forma, párpados, ojeras, pestañas y cejas
- **Boca y Labios**: Estructura labial detallada, arco de cupido, comisura y hoyuelos

### Garantías de Seguridad de Tipos

Cada característica anatómica está respaldada por arrays constantes literales y tipos de unión correspondientes, asegurando:

- Opciones de formulario válidas en tiempo de compilación
- Actualizaciones de estado Redux verificadas por tipos
- Integridad de datos en tiempo de ejecución

## 🧠 Patrones de Diseño Centrales

### Gestión del PromptState

Estado global de Redux que contiene:

- Selección actual de estilo artístico
- Árbol anatómico completo del personaje tipado
- Configuración de la escena ambiental
- Seguimiento automático de marca temporal en modificaciones

### Sistema de Tipos Anatómicos

Interfaces jerárquicas y tipos de unión que modelan estructuras biológicas con validación en tiempo de compilación. El sistema mantiene sincronización entre definiciones de tipos y sus arrays de valores constantes.

### Patrones de Constructor y Validador

Gestión centralizada del estado mediante clases complementarias:

- **CharacterValidator**: Asegura que existan subestructuras anatómicas necesarias, inicializando con valores por defecto cuando sea necesario
- **CharacterBuilder**: Maneja la fusión segura de actualizaciones en estructuras anatómicas anidadas

### Aplicación de Invariantes de Dominio

Los reductores mantienen plausibilidad biológica mediante lógica condicional que preserva restricciones anatómicas (ej.: variaciones del pliegue epicántico solo se aplican cuando existen pliegues).

### Genérico DeepAnatomicOption

Un patrón reutilizable para opciones de formulario que proporciona:

- Rutas de claves seguras en estructuras de personaje anidadas
- Nombres de visualización amigables
- Recursos de imagen asociados
- Etiquetado con conciencia de idioma

## 🧩 Manejo de Errores y UX

### Límites de Error de React

Todos los componentes de formulario están envueltos con límites de error que:

- Capturan y aíslan errores de renderizado
- Proporcionan información contextual de errores
- Muestran interfaces alternativas amigables

### Manejador de Errores Centralizado

Gestión unificada de errores con:

- Registro estructurado con contexto del componente
- Métodos configurables de notificación al usuario (toast/alertas)
- Separación entre presentación de errores y lógica de negocio

## 🌐 Internacionalización

### Sistema de Texto Basado en Diccionarios

- FORM_DICT y GENERIC_DICT proporcionan contenido específico por idioma
- El contexto React gestiona la selección de idioma
- Los componentes de formulario consumen texto mediante hooks conscientes del idioma
- Adición sencilla de soporte para nuevos idiomas

## 🚀 Comenzando

### Desarrollo

```bash
npm install          # Instalar dependencias
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar construcción de producción
# Configurar entorno Python
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Instalar dependencias y ejecutar
pip install -r requirements.txt
cd prompt_creator_app_backend
python manage.py migrate
python manage.py runserver
```

## 🔁 Flujo de Trabajo de Desarrollo

### Añadiendo Nuevas Características Anatómicas

Siga este patrón sistemático de seis pasos para extender el modelo de personaje manteniendo la seguridad de tipos y consistencia del sistema:

1. **Definiciones de Tipo** _(Enfoque: Seguridad en tiempo de compilación)_  
   Cree tipos de unión con arrays literales `as const` correspondientes para garantizar validación de tipo en tiempo de compilación.

2. **Modelado de Dominio** _(Enfoque: Arquitectura)_  
   Extienda las interfaces jerárquicas de TypeScript para integrar la nueva característica en la estructura anatómica del personaje.

3. **Configuración por Defecto** _(Enfoque: Estado inicial)_  
   Añada valores por defecto sensatos a la configuración inicial del personaje para usabilidad inmediata.

4. **Validación y Construcción** _(Enfoque: Gestión de estado)_  
   Implemente métodos `ensure*` y `merge*` correspondientes en clases auxiliares para manipulación segura del estado.

5. **Gestión de Estado** _(Enfoque: Flujo de datos)_  
   Cree reductores Redux usando tipado `DeepPartial` para manejar actualizaciones granulares y controladas del estado.

6. **Componentes de UI** _(Enfoque: Experiencia de usuario)_  
   Construya componentes de formulario siguiendo patrones establecidos:
   - Envuélvalos con límites de error
   - Integre contexto de idioma para internacionalización
   - Use `DeepAnatomicOption` para configuración segura de tipos
   - Siga convenciones consistentes de estilo y diseño

Este enfoque estructurado garantiza que nuevas características se integren perfectamente mientras se preservan las garantías de seguridad de tipos del sistema, la mantenibilidad y una experiencia de usuario consistente.

</details>

<details>
<summary>🇫🇷 Français (fr-FR)</summary>

# Character Prompt Creator

Un créateur de personnages et assistant de prompts avec typage fort pour les flux de travail de génération d'images.

## 🏗️ Vue d'ensemble de l'Architecture

Le projet suit une architecture modulaire avec typage fort :

- **Frontend** : React + TypeScript + Vite + Redux Toolkit
- **Backend** : Django + Chainlit
- **Couche LLM/Chat** : Assistants basés sur Chainlit intégrables dans l'interface

## ✨ Fonctionnalités Principales

### Modélisation de Personnages Basée sur l'Anatomie

Définition structurée des personnages via des composants anatomiques fortement typés :

- **Corps** : Taille, poids/masse graisseuse, musculature, genre, étiquettes narratives
- **Cheveux** : Texture, longueur, soin avec sous-structure de frange
- **Yeux** : Modélisation complète incluant globe oculaire, iris, pupille, forme, paupières, poches sous les yeux, cils et sourcils
- **Bouche et Lèvres** : Structure labiale détaillée, arc de Cupidon, commissure et fossettes

### Garanties de Sécurité de Typage

Chaque caractéristique anatomique est soutenue par des tableaux constants littéraux et des types union correspondants, assurant :

- Des options de formulaire valides à la compilation
- Des mises à jour d'état Redux vérifiées par type
- L'intégrité des données à l'exécution

## 🧠 Modèles de Conception Centraux

### Gestion de l'État PromptState

État global Redux contenant :

- La sélection actuelle de style artistique
- L'arbre anatomique complet du personnage typé
- La configuration de la scène environnementale
- Le suivi automatique des horodatages lors des modifications

### Système de Types Anatomiques

Des interfaces hiérarchiques et des types union modélisent les structures biologiques avec validation à la compilation. Le système maintient la synchronisation entre les définitions de types et leurs tableaux de valeurs constantes.

### Modèles Constructeur et Validateur

Gestion centralisée de l'état via des classes complémentaires :

- **CharacterValidator** : Garantit l'existence des sous-structures anatomiques requises, initialisant avec des valeurs par défaut si nécessaire
- **CharacterBuilder** : Gère la fusion sécurisée des mises à jour dans les structures anatomiques imbriquées

### Application des Invariants de Domaine

Les réducteurs maintiennent la plausibilité biologique via une logique conditionnelle qui préserve les contraintes anatomiques (ex. : les variations du pli épicanthique ne s'appliquent que lorsque les plis existent).

### Générique DeepAnatomicOption

Un modèle réutilisable pour les options de formulaire qui fournit :

- Des chemins de clés sécurisés dans les structures de personnage imbriquées
- Des noms d'affichage conviviaux
- Des ressources d'images associées
- Un étiquetage sensible à la langue

## 🧩 Gestion des Erreurs et UX

### Limites d'Erreur React

Tous les composants de formulaire sont encapsulés avec des limites d'erreur qui :

- Capturent et isolent les erreurs de rendu
- Fournissent des informations contextuelles sur les erreurs
- Affichent des interfaces de secours conviviales

### Gestionnaire d'Erreurs Centralisé

Gestion unifiée des erreurs avec :

- Journalisation structurée avec contexte du composant
- Méthodes configurables de notification utilisateur (toast/alertes)
- Séparation entre la présentation des erreurs et la logique métier

## 🌐 Internationalisation

### Système de Texte Basé sur des Dictionnaires

- FORM_DICT et GENERIC_DICT fournissent du contenu spécifique à la langue
- Le contexte React gère la sélection de la langue
- Les composants de formulaire consomment du texte via des hooks sensibles à la langue
- Ajout facile du support de nouvelles langues

## 🚀 Pour Commencer

### Développement

```bash
npm install          # Installer les dépendances
npm run dev          # Démarrer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build de production
# Configurer l'environnement Python
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Installer les dépendances et exécuter
pip install -r requirements.txt
cd prompt_creator_app_backend
python manage.py migrate
python manage.py runserver
```

## 🔁 Flux de Travail de Développement

### Ajout de Nouvelles Caractéristiques Anatomiques

Suivez ce modèle systématique en six étapes pour étendre le modèle de personnage tout en conservant la sécurité de typage et la cohérence du système :

1. **Définitions de Types** _(Focus : Sécurité à la compilation)_  
   Créez des types union avec les tableaux littéraux `as const` correspondants pour garantir la validation des types à la compilation.

2. **Modélisation du Domaine** _(Focus : Architecture)_  
   Étendez les interfaces hiérarchiques TypeScript pour intégrer la nouvelle caractéristique dans la structure anatomique du personnage.

3. **Configuration par Défaut** _(Focus : État initial)_  
   Ajoutez des valeurs par défaut pertinentes à la configuration initiale du personnage pour une utilisabilité immédiate.

4. **Validation et Construction** _(Focus : Gestion d'état)_  
   Implémentez les méthodes `ensure*` et `merge*` correspondantes dans les classes auxiliaires pour une manipulation sécurisée de l'état.

5. **Gestion d'État** _(Focus : Flux de données)_  
   Créez des réducteurs Redux en utilisant le typage `DeepPartial` pour gérer les mises à jour granulaires et contrôlées de l'état.

6. **Composants UI** _(Focus : Expérience utilisateur)_  
   Construisez des composants de formulaire en suivant les modèles établis :
   - Encapsulez avec des limites d'erreur
   - Intégrez le contexte de langue pour l'internationalisation
   - Utilisez `DeepAnatomicOption` pour une configuration sécurisée des types
   - Suivez des conventions cohérentes de style et de mise en page

Cette approche structurée garantit que les nouvelles caractéristiques s'intègrent parfaitement tout en préservant les garanties de sécurité de typage du système, la maintenabilité et une expérience utilisateur cohérente.

</details>

<details>
<summary>🇮🇹 Italiano (it-IT)</summary>

# Character Prompt Creator

Un creatore di personaggi e assistente per prompt con tipizzazione sicura per flussi di lavoro di generazione di immagini.

## 🏗️ Panoramica dell'Architettura

Il progetto segue un'architettura modulare e type-safe:

- **Frontend**: React + TypeScript + Vite + Redux Toolkit
- **Backend**: Django + Chainlit
- **Strato LLM/Chat**: Assistenti basati su Chainlit integrabili nell'interfaccia

## ✨ Caratteristiche Principali

### Modellazione Anatomica dei Personaggi

Definizione strutturata dei personaggi tramite componenti anatomici fortemente tipizzati:

- **Corpo**: Altezza, peso/massa grassa, muscolatura, genere, tag narrativi
- **Capelli**: Texture, lunghezza, ordine con sottostruttura della frangia
- **Occhi**: Modellazione completa comprendente globo oculare, iride, pupilla, forma, palpebre, occhiaie, ciglia e sopracciglia
- **Bocca e Labbra**: Struttura labiale dettagliata, arco di Cupido, commessura e fossette

### Garanzie di Type Safety

Ogni caratteristica anatomica è supportata da array costanti letterali e corrispondenti tipi union, garantendo:

- Opzioni di form valide in fase di compilazione
- Aggiornamenti dello stato Redux verificati dal sistema di tipi
- Integrità dei dati durante l'esecuzione

## 🧠 Modelli di Progetto Fondamentali

### Gestione dello PromptState

Stato globale Redux che contiene:

- Selezione corrente dello stile artistico
- Albero anatomico completo del personaggio tipizzato
- Configurazione della scena ambientale
- Tracciamento automatico dei timestamp durante le modifiche

### Sistema dei Tipi Anatomici

Interfacce gerarchiche e tipi union che modellano strutture biologiche con validazione in fase di compilazione. Il sistema mantiene la sincronizzazione tra le definizioni dei tipi e i loro array di valori costanti.

### Pattern Builder e Validator

Gestione centralizzata dello stato attraverso classi complementari:

- **CharacterValidator**: Garantisce l'esistenza delle sottostrutture anatomiche necessarie, inizializzandole con valori predefiniti quando necessario
- **CharacterBuilder**: Gestisce la fusione type-safe degli aggiornamenti nelle strutture anatomiche annidate

### Applicazione degli Invarianti di Dominio

I reducer mantengono la plausibilità biologica attraverso una logica condizionale che preserva i vincoli anatomici (es.: le variazioni della piega epicantica si applicano solo quando le pieghe esistono).

### Generico DeepAnatomicOption

Un pattern riutilizzabile per le opzioni dei form che fornisce:

- Percorsi di chiavi type-safe nelle strutture annidate dei personaggi
- Nomi visualizzati amichevoli
- Risorse di immagini associate
- Etichettatura consapevole della lingua

## 🧩 Gestione degli Errori e UX

### React Error Boundaries

Tutti i componenti del form sono racchiusi da error boundary che:

- Catturano e isolano gli errori di rendering
- Forniscono informazioni contestuali sugli errori
- Visualizzano interfacce di fallback user-friendly

### Gestione Errori Centralizzata

Gestione unificata degli errori con:

- Logging strutturato con contesto del componente
- Metodi configurabili di notifica all'utente (toast/alert)
- Separazione tra presentazione degli errori e logica di business

## 🌐 Internazionalizzazione

### Sistema Testuale Basato su Dizionari

- FORM_DICT e GENERIC_DICT forniscono contenuti specifici per lingua
- Il contesto React gestisce la selezione della lingua
- I componenti del form consumano il testo tramite hook consapevoli della lingua
- Aggiunta facile del supporto per nuove lingue

## 🚀 Per Iniziare

### Sviluppo

```bash
npm install          # Installa le dipendenze
npm run dev          # Avvia il server di sviluppo
npm run build        # Build di produzione
npm run preview      # Anteprima del build di produzione
# Configura l'ambiente Python
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Installa le dipendenze ed esegui
pip install -r requirements.txt
cd prompt_creator_app_backend
python manage.py migrate
python manage.py runserver
```

## 🔁 Flusso di Sviluppo

### Aggiunta di Nuove Caratteristiche Anatomiche

Segui questo modello sistematico in sei passaggi per estendere il modello del personaggio mantenendo la type safety e la consistenza del sistema:

1. **Definizioni dei Tipi** _(Focus: Sicurezza in fase di compilazione)_  
   Crea tipi union con gli array letterali `as const` corrispondenti per garantire la validazione dei tipi in fase di compilazione.

2. **Modellazione del Dominio** _(Focus: Architettura)_  
   Estendi le interfacce gerarchiche TypeScript per integrare la nuova caratteristica nella struttura anatomica del personaggio.

3. **Configurazione Predefinita** _(Focus: Stato iniziale)_  
   Aggiungi valori predefiniti sensati alla configurazione iniziale del personaggio per un'usabilità immediata.

4. **Validazione e Costruzione** _(Focus: Gestione dello stato)_  
   Implementa i metodi `ensure*` e `merge*` corrispondenti nelle classi helper per la manipolazione sicura dello stato.

5. **Gestione dello Stato** _(Focus: Flusso di dati)_  
   Crea reducer Redux usando la tipizzazione `DeepPartial` per gestire aggiornamenti granulari e controllati dello stato.

6. **Componenti UI** _(Focus: Esperienza utente)_  
   Costruisci componenti del form seguendo i pattern stabiliti:
   - Racchiudi con error boundary
   - Integra il contesto della lingua per l'internazionalizzazione
   - Usa `DeepAnatomicOption` per la configurazione type-safe
   - Segui convenzioni consistenti di stile e layout

Questo approccio strutturato garantisce che le nuove caratteristiche si integrino perfettamente preservando le garanzie di type safety del sistema, la manutenibilità e un'esperienza utente consistente.

</details>

<details>
<summary>🇨🇳 中文 (zh-CN)</summary>

# Character Prompt Creator

面向生成式图像工作流程的类型安全角色构建器和提示助手。

## 🏗️ 架构概览

项目采用模块化、类型安全的架构设计：

- **前端**: React + TypeScript + Vite + Redux Toolkit
- **后端**: Django + Chainlit
- **LLM/聊天层**: 基于Chainlit的助手，可嵌入UI界面

## ✨ 核心功能

### 解剖学驱动的角色建模

通过强类型解剖学组件进行结构化角色定义：

- **身体**: 身高、体重/体脂率、肌肉、性别、叙事标签
- **头发**: 质地、长度、整洁度，包含刘海子结构
- **眼睛**: 全面建模，包括眼球、虹膜、瞳孔、形状、眼睑、眼袋、睫毛和眉毛
- **嘴部与嘴唇**: 详细的唇部结构、唇弓、口角和酒窝

### 类型安全保证

每个解剖学特征都由字面常量数组和相应的联合类型支持，确保：

- 编译时表单选项的有效性
- Redux状态更新的类型检查
- 运行时数据完整性

## 🧠 核心设计模式

### PromptState状态管理

全局Redux状态包含：

- 当前艺术风格选择
- 完整的类型化角色解剖树
- 环境场景配置
- 修改时的自动时间戳追踪

### 解剖学类型系统

通过层次化接口和联合类型对生物结构进行建模，实现编译时验证。系统保持类型定义与其常量值数组之间的同步。

### 构建器与验证器模式

通过互补类实现集中状态管理：

- **CharacterValidator**: 确保必要的解剖学子结构存在，必要时使用默认值初始化
- **CharacterBuilder**: 处理嵌套解剖学结构的类型安全更新合并

### 领域不变量强制执行

Reducers通过条件逻辑保持生物合理性，维护解剖学约束（例如：内眦赘皮变体仅在存在褶皱时适用）。

### DeepAnatomicOption泛型

可复用的表单选项模式，提供：

- 嵌套角色结构中的类型安全键路径
- 友好的显示名称
- 关联的图像资源
- 语言感知的标签

## 🧩 错误处理与用户体验

### React错误边界

所有表单组件都通过错误边界包装，实现：

- 捕获并隔离渲染错误
- 提供上下文错误信息
- 显示用户友好的回退界面

### 集中化错误处理器

统一错误管理包含：

- 带有组件上下文的结构化日志记录
- 可配置的用户通知方法（toast/警告框）
- 错误呈现与业务逻辑的分离

## 🌐 国际化

### 词典驱动文本系统

- FORM_DICT和GENERIC_DICT提供特定语言内容
- React上下文管理语言选择
- 表单组件通过语言感知钩子消费文本
- 轻松添加新语言支持

## 🚀 快速开始

### 前端开发

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run preview      # 预览生产构建
# 设置Python环境
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# 安装依赖并运行
pip install -r requirements.txt
cd prompt_creator_app_backend
python manage.py migrate
python manage.py runserver
```

## 🔁 开发工作流程

### 添加新解剖学特征

遵循此系统性六步模式扩展角色模型，同时保持类型安全性和系统一致性：

1. **类型定义** _(重点：编译时安全性)_  
   创建带有相应`as const`字面数组的联合类型，确保编译时类型验证。

2. **领域建模** _(重点：架构)_  
   扩展TypeScript层次化接口，将新特征集成到角色解剖结构中。

3. **默认配置** _(重点：初始状态)_  
   为初始角色配置添加合理的默认值，实现即时可用性。

4. **验证与构建** _(重点：状态管理)_  
   在辅助类中实现相应的`ensure*`和`merge*`方法，进行类型安全的状态操作。

5. **状态管理** _(重点：数据流)_  
   使用`DeepPartial`类型创建Redux reducers，处理受控的细粒度状态更新。

6. **UI组件** _(重点：用户体验)_  
   按照既定模式构建表单组件：
   - 用错误边界包装
   - 集成语言上下文实现国际化
   - 使用`DeepAnatomicOption`进行类型安全配置
   - 遵循一致的样式和布局规范

这种结构化方法确保新功能无缝集成，同时维护系统的类型安全保证、可维护性和一致的用户体验。

</details>
