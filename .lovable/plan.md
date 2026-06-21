# handclō OS — desktop em React com agenda e closet funcionais

Recriar fielmente o "handclō OS" do HTML enviado em React/TanStack, e tornar funcionais a **agenda** (CRUD completo de tarefas) e o **closet/armário** (adicionar peças do dispositivo, com categoria e envio pro arquivo de estilo). Persistência em `localStorage`.

## Visual e fontes
- Portar 1:1 o CSS/markup: fundo jeans animado, statusbar, grid de ícones 52px, taskbar (clō, provador, +look, relógio), gaveta closet à direita, janela assistente clō.
- Fontes `DM Mono` e `Anonymous Pro` via `@fontsource` (sem CDN). Tokens de cor (`--mg`, `--azc`, `--am`, etc.) no `src/styles.css`.
- Sistema de janelas flutuantes (abrir/fechar/arrastar/trazer pra frente) reimplementado em React.

## Estrutura de componentes (em `src/components/handclo/`)
```
Desktop.tsx        -> shell: fundos, statusbar, área, taskbar, relógio
DesktopIcons.tsx   -> ícones dos apps (SVGs originais)
WindowManager.tsx  -> janelas flutuantes (drag, z-index, foco, fechar)
CloAssistant.tsx   -> janela clō
ClosetDrawer.tsx   -> gaveta closet/armário + upload
apps/AgendaApp.tsx     -> agenda funcional
apps/ArquivoApp.tsx    -> arquivo de estilo (recebe peças enviadas)
apps/TravelApp.tsx     -> checklist (estático, do HTML)
apps/AnalyticsApp.tsx  -> métricas (estático, do HTML)
apps/ConfigApp.tsx     -> configurações com abas (do HTML)
```
Renderizado a partir de `src/routes/index.tsx` (substitui o placeholder).

## Estado e persistência (`src/lib/handcloStore.ts`)
Hooks com `localStorage` (chaves `handclo.tarefas`, `handclo.pecas`, `handclo.looks`):
- `useTarefas()` — lista de tarefas
- `usePecas()` — peças do closet
- `useLooks()` — itens do arquivo de estilo

## Agenda completa (CRUD)
Substitui o conteúdo estático da janela agenda por app funcional:
- **Cabeçalho da semana** mantido (visual original).
- **Contador**: "X pendentes · Y concluídas".
- **Formulário inline** (toggle por botão "+ tarefa") com campos: **título**, **data**, **tag** (travel/social/devolução/closet), **nota**.
- **Lista de tarefas**: cada item com faixa colorida pela tag, checkbox de **concluir** (risca o texto), botões **editar** (reabre o form inline preenchido) e **excluir**.
- Ordenação por data; concluídas vão pro fim. Tudo salvo em `localStorage`.
- Modelo: `{ id, titulo, data, tag, nota, concluida }`.

## Closet/armário — adicionar peças do dispositivo
- Botão **"+ peça"** no header da gaveta closet abre `<input type="file" accept="image/*">` (no mobile aciona câmera/galeria).
- Imagem lida como **dataURL (base64)** e salva em `localStorage` — funciona offline e persiste.
- Mini-form ao adicionar: **nome**, **categoria** (top, calça, vestido, jaqueta, sapato), e checkbox **"enviar pro arquivo de estilo"**.
- Grid do closet renderiza as peças salvas (substitui os `<img>` fixos `jc1.png` etc.); cada peça tem ação de **excluir** e **enviar pro arquivo de estilo**.
- "Enviar pro arquivo de estilo" cria um look no store de looks → aparece imediatamente na janela **arquivo de estilo** (linkando as funções).

## Arquivo de estilo
- O card "+" vira um botão que também abre upload de peça/look do dispositivo.
- Grid mostra os looks padrão + os enviados do closet (do store), com persistência.

## Detalhes técnicos
- 100% frontend, sem backend (Lovable Cloud não é necessário — pedido explícito de localStorage).
- Componentes pequenos e tipados; sem `dangerouslySetInnerHTML` (markup convertido pra JSX).
- Limite de tamanho de imagem com aviso simples se exceder (ex.: >2MB) pra não estourar o localStorage.
- Janela agenda cresce em altura conforme a lista; mantém scroll interno.

Ao final: criar, editar, concluir e excluir tarefas na agenda funcionando com persistência; adicionar peças no closet/armário a partir do dispositivo e enviá-las pro arquivo de estilo, tudo linkado.