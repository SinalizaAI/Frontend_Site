# SinalizaAI — Front-end do Site

Front-end oficial da plataforma **SinalizaAI** (sinalizaai.com), responsável pela interface institucional/comercial do site: apresentação do produto, cadastro e login de clientes, catálogo de planos, área do cliente e o **Tradutor** — interface web onde o usuário interage em tempo real com o motor de tradução bidirecional Libras ↔ Português.

O site é construído em **React + Vite (JavaScript)**, consome a API REST do backend (`Back_end_Site`) para cadastro/login, e se conecta via **WebSocket** a um módulo Python separado responsável pelo reconhecimento e geração de sinais em Libras (visão computacional + machine learning).

> Repositório: `SinalizaAI/Frontend_Site`
> Diretório raiz do projeto: `FRONT_END/`

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Arquitetura e stack tecnológica](#arquitetura-e-stack-tecnológica)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Páginas e rotas](#páginas-e-rotas)
- [Integração com APIs](#integração-com-apis)
  - [Backend REST (Java/Spring)](#backend-rest-javaspring)
  - [Motor de tradução (Python/WebSocket)](#motor-de-tradução-pythonwebsocket)
  - [Renderização de Libras — Rybena](#renderização-de-libras--rybena)
- [Autenticação e segurança (front-end)](#autenticação-e-segurança-front-end)
- [Totem 3D](#totem-3d)
- [OttoChatBot](#ottochatbot)
- [Estilização](#estilização)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Executando localmente](#executando-localmente)
- [Build para produção](#build-para-produção)
- [Deploy](#deploy)
- [Testes](#testes)
- [Roadmap / observações técnicas](#roadmap--observações-técnicas)
- [Contribuindo](#contribuindo)
- [Autores](#autores)

---

## Sobre o projeto

O front-end do site do SinalizaAI cobre três grandes frentes:

1. **Site institucional/comercial** — Home, Sobre o Projeto, Sobre a Equipe, Planos, seções de funcionalidades e vantagens, e formulário de contato.
2. **Fluxo de conta** — Cadastro (em duas etapas), Login e Área do Usuário (rota protegida).
3. **Tradutor** — página que conecta o navegador ao motor de IA (câmera do usuário → reconhecimento de sinais em Libras → texto/fala em Português, e texto/fala em Português → avatar/renderização em Libras), em tempo real via WebSocket.

O projeto também inclui um assistente virtual próprio, o **Otto** (chatbot), e uma representação 3D do **Totem** físico do produto, renderizada diretamente no navegador.

---

## Arquitetura e stack tecnológica

| Camada | Tecnologia |
|---|---|
| Linguagem | JavaScript |
| Framework / Build tool | React + Vite |
| Roteamento | React Router (`react-router-dom`) |
| Formulários | React Hook Form |
| Estilização | CSS puro, com **CSS Modules** por componente (`*.module.css`) + `Global.css` |
| Animações | Framer Motion (`motion`, `motion-dom`, `motion-utils`) |
| Renderização 3D | Three.js, `@react-three/fiber` (pasta `@react-three`), `three-stdlib`, `camera-controls`, `troika-three-text`, `draco3d`, `meshoptimizer` |
| Reconhecimento de mão (client-side) | MediaPipe (`@mediapipe`) |
| Comunicação em tempo real | WebSocket nativo (hook customizado `useWebSocket`) |
| Ícones | `react-icons` |
| Linting | ESLint (`eslint.config.js`) |
| Empacotamento/Dev server | Vite (`vite.config.js`) |
| Hospedagem | Vercel |

> **Nota:** o projeto também contém uma subpasta `otto-server/` com `package.json` e `server.js` próprios — um serviço Node separado do site principal, usado pelo **OttoChatBot** (ver seção específica abaixo).

---

## Estrutura de pastas

```
FRONT_END/
├── node_modules/
├── otto-server/                    # Serviço Node separado (backend do chatbot Otto)
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── public/
│   └── models/
│       └── Totem_3D_Pintado.glb    # Modelo 3D do Totem físico
├── src/
│   ├── assets/                     # Imagens/mídias organizadas por seção
│   │   ├── Cadastro/
│   │   ├── Cadastro_Etapa2/
│   │   ├── Como_funciona/
│   │   ├── Footer/
│   │   ├── Funcionalidades/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Mascote/
│   │   ├── Perguntas/
│   │   ├── Planos/
│   │   ├── Sobre_Equipe/
│   │   ├── Sobre_Projeto/
│   │   ├── Tradutor/
│   │   ├── Usuario/
│   │   └── Vantagens/
│   ├── components/
│   │   ├── OttoChatBot/
│   │   │   ├── OttoChatBot.css
│   │   │   └── OttoChatBot.jsx
│   │   ├── Como_Funciona.jsx
│   │   ├── Equipe.jsx
│   │   ├── Fale.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Mascote.jsx
│   │   ├── Perguntas.jsx
│   │   ├── ScrollAnimate.jsx
│   │   ├── Section_funcionalidades.jsx
│   │   ├── Totem_3D_Oficial.jsx
│   │   ├── Vantagens.jsx
│   │   └── Video.jsx
│   ├── context/
│   │   └── OttoContext.jsx         # Contexto React do chatbot Otto
│   ├── css/                        # CSS Modules — um arquivo por componente/página
│   │   ├── Cadastro.module.css
│   │   ├── Cadastro_Etapa2.module.css
│   │   ├── Como_Funciona.module.css
│   │   ├── Fale.module.css
│   │   ├── Footer.module.css
│   │   ├── Global.css
│   │   ├── Header.module.css
│   │   ├── Hero.module.css
│   │   ├── Login.module.css
│   │   ├── Mascote.module.css
│   │   ├── Perguntas.module.css
│   │   ├── Planos.module.css
│   │   ├── Section_funcionalidades.module.css
│   │   ├── Sobre_Equipe.module.css
│   │   ├── Sobre_Projeto.module.css
│   │   ├── Tradutor.module.css
│   │   ├── Usuario.module.css
│   │   ├── Vantagens.module.css
│   │   └── Video.module.css
│   ├── hooks/
│   │   └── useWebSocket.js         # Hook de conexão com o motor de tradução (Python)
│   ├── lib/
│   │   ├── api.js                  # Chamadas REST ao backend Java/Spring
│   │   ├── auth.js                 # Gerenciamento do token JWT (localStorage)
│   │   └── utils.js
│   ├── pages/
│   │   ├── Cadastro.jsx
│   │   ├── Cadastro_Etapa2.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Planos.jsx
│   │   ├── Sobre_Equipe.jsx
│   │   ├── Sobre_Projeto.jsx
│   │   ├── Tradutor.jsx
│   │   └── Usuario.jsx
│   ├── App.css
│   ├── App.jsx                     # Definição das rotas (React Router)
│   ├── index.css
│   └── main.jsx                    # Entry point da aplicação
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Páginas e rotas

| Página | Arquivo (`src/pages/`) | Acesso | Descrição |
|---|---|---|---|
| Home | `Home.jsx` | Pública | Landing page: Hero, Como Funciona, Funcionalidades, Vantagens, Mascote, Totem 3D. |
| Login | `Login.jsx` | Pública | Autenticação do cliente contra o backend (`/api/auth/login`). |
| Cadastro | `Cadastro.jsx` | Pública | Etapa 1 do cadastro de cliente. |
| Cadastro — Etapa 2 | `Cadastro_Etapa2.jsx` | Pública | Etapa 2 do cadastro (dados complementares). |
| Planos | `Planos.jsx` | Pública | Catálogo de planos/produtos comercializados. |
| Sobre a Equipe | `Sobre_Equipe.jsx` | Pública | Apresentação do time do SinalizaAI. |
| Sobre o Projeto | `Sobre_Projeto.jsx` | Pública | Contexto, missão e proposta de acessibilidade do projeto. |
| Tradutor | `Tradutor.jsx` | Pública | Interface de tradução Libras ↔ Português em tempo real. |
| Usuário | `Usuario.jsx` | **Protegida (login obrigatório)** | Área logada do cliente. |

> A tabela acima referencia os arquivos/páginas; os paths exatos usados no `react-router-dom` estão definidos em `src/App.jsx`.

---

## Integração com APIs

O front-end se comunica com **dois back-ends distintos**:

### Backend REST (Java/Spring)

Usado **exclusivamente para cadastro e login** de clientes (fluxo de conta). As chamadas ficam centralizadas em `src/lib/api.js`.

- Endpoints consumidos: `POST /api/clientes/cadastro`, `POST /api/auth/login` (ver README do `Back_end_Site` para o contrato completo).
- Após login bem-sucedido, o token JWT retornado é armazenado via `src/lib/auth.js`.

### Motor de tradução (Python/WebSocket)

O reconhecimento e a geração de sinais em Libras **não passam pelo backend Java** — o front-end se conecta **diretamente via WebSocket** a um módulo Python que compila e orquestra os demais serviços de IA do projeto:

- **MediaPipe** — detecção dos pontos-chave (landmarks) da mão a partir do vídeo da câmera.
- **OpenCV** — renderização/processamento visual desses pontos.
- **PyTorch** — modelo de machine learning responsável pela classificação dos sinais em Libras e pela geração da tradução.

A conexão é gerenciada pelo hook customizado `src/hooks/useWebSocket.js`, usado principalmente na página `Tradutor.jsx`.

### Renderização de Libras — Rybena

Para a tradução de **Português → Libras** (avatar/renderização), o site utiliza a **API JavaScript da Rybena**, chamada tanto via console quanto de forma programática pelo código da aplicação.

---

## Autenticação e segurança (front-end)

- Após o login, o **token JWT** retornado pelo backend é salvo no **`localStorage`**, através das funções utilitárias em `src/lib/auth.js`:

```js
export function salvarToken(token) {
  localStorage.setItem("token", token);
}
export function getToken() {
  return localStorage.getItem("token");
}
export function removerToken() {
  localStorage.removeItem("token");
}
export function estaLogado() {
  return !!getToken();
}
export function getIdDoToken() {
  const token = getToken();
  if (!token) return null;

  // JWT tem 3 partes separadas por ponto — a do meio é o payload em base64
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
}
```

- `getIdDoToken()` faz o **decode manual do payload JWT** (sem validar assinatura no cliente — a validação de fato ocorre no backend a cada requisição autenticada).
- A rota **Usuário** (`Usuario.jsx`) é **protegida**: só é acessível se `estaLogado()` retornar `true`. Usuários não autenticados são redirecionados para o Login.
- Todas as requisições subsequentes ao backend devem enviar o token no header `Authorization: Bearer <token>`.

---

## Totem 3D

O componente `Totem_3D_Oficial.jsx` renderiza o modelo 3D do Totem físico do SinalizaAI diretamente no navegador, usando **Three.js** via `@react-three/fiber`, com:

- Modelo `.glb` carregado de `public/models/Totem_3D_Pintado.glb`.
- Compressão Draco (`draco3d`) para otimizar o carregamento do modelo.
- Controles de câmera interativos (`camera-controls`).
- Texto 3D renderizado via `troika-three-text`.

---

## OttoChatBot

**Otto** é o chatbot do site, com o objetivo de auxiliar os usuários em dúvidas sobre o produto. Foi desenvolvido de forma independente do site e depois integrado a ele.

- **Front-end**: `src/components/OttoChatBot/` (componente + estilos) e `src/context/OttoContext.jsx` (estado/contexto React do chat).
- **Back-end dedicado**: pasta `otto-server/` na raiz do projeto, com `package.json` e `server.js` próprios — um serviço Node/Express separado do site principal, consumido via a variável `VITE_OTTO_URL` (ver [Variáveis de ambiente](#variáveis-de-ambiente)).

---

## Estilização

- **CSS puro**, organizado por **CSS Modules** (`src/css/*.module.css`) — um arquivo de estilos por componente/página, evitando conflito de classes globais.
- `Global.css` concentra estilos e variáveis compartilhadas (ex.: cores, tipografia base).
- Animações de entrada/scroll são tratadas via **Framer Motion**, incluindo um componente auxiliar `ScrollAnimate.jsx`.

---

## Variáveis de ambiente

O projeto usa Vite, então variáveis de ambiente expostas ao client precisam ter o prefixo `VITE_` e são acessadas via `import.meta.env.VITE_ALGUMA_COISA`. Crie um arquivo `.env` (ou `.env.local`) na raiz do projeto (`FRONT_END/`) com:

| Variável | Descrição | Usada em |
|---|---|---|
| `VITE_API_URL` | URL base da API REST do backend Java/Spring (cadastro e login). Se não definida, cai no fallback `http://localhost:8080`. | `src/lib/api.js` |
| `VITE_OTTO_URL` | URL base do serviço `otto-server` (backend do chatbot Otto). | `src/components/OttoChatBot/OttoChatBot.jsx` |

Exemplo de `.env` local:

```
VITE_API_URL=http://localhost:8080
VITE_OTTO_URL=http://localhost:PORTA_DO_OTTO_SERVER
```

---

## Executando localmente

Pré-requisitos: **Node.js** (versão compatível com Vite 5/6) e **npm**.

```powershell
# 1. Clone o repositório
git clone https://github.com/SinalizaAI/Front_end_Site.git
cd Front_end_Site/FRONT_END

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente (ver seção acima)

# 4. Suba o servidor de desenvolvimento (Vite)
npm run dev
```

O site ficará disponível, por padrão, em `http://localhost:5173`.

> Para o **Tradutor** funcionar de ponta a ponta, o módulo Python (WebSocket) também precisa estar em execução localmente e acessível pela URL configurada.
> Para o **OttoChatBot** funcionar, o serviço `otto-server` precisa rodar separadamente (ver `otto-server/package.json` para o comando de start).

---

## Build para produção

```powershell
npm run build
```

Gera os arquivos estáticos otimizados (tipicamente na pasta `dist/`), prontos para deploy.

---

## Deploy

- **Plataforma:** Vercel
- **Branch de deploy:** `main` (deploy contínuo a cada push/merge)
- **Build command:** `npm run build` (padrão Vite, a confirmar nas configurações do projeto na Vercel)

---

## Testes

O projeto **ainda não possui suíte de testes automatizados** configurada. Fica como ponto de evolução futura (ex.: Vitest + React Testing Library, por ser o par natural do Vite).

---

## Roadmap / observações técnicas

- Implementar suíte de testes automatizados (inexistente atualmente), ex.: Vitest + React Testing Library.
- Adicionar um `.env.example` ao repositório para facilitar o onboarding de novos desenvolvedores.

---

## Contribuindo

1. Crie um branch a partir da `main`: `git checkout -b feature/minha-feature`.
2. Siga o padrão de organização existente: `pages/` para telas, `components/` para peças reutilizáveis, `css/` para os módulos de estilo correspondentes, `lib/` para integrações e utilitários.
3. Ao criar uma página ou componente novo, crie também o arquivo `*.module.css` correspondente em `src/css/`.
4. Novas chamadas ao backend Java devem ser centralizadas em `src/lib/api.js`; lógica de autenticação, em `src/lib/auth.js`.
5. Abra um Pull Request descrevendo a mudança.

---

## Autores

Desenvolvido por **Kauê Siqueira** e **Amanda Soares**
Desenvolvido para a plataforma SinalizaAI — sinalizaai.com
