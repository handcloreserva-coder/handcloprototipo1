# Completar o handclō OS — apps funcionais e interligados

Objetivo: deixar **Arquivo de estilo, Analytics, Configurações, Travel e Provador** completos com funções reais (igual à Agenda), todos "conversando" entre si pela store central, gerar dados relevantes no Analytics a partir do que existe na store, e adicionar mais marcadores/tags às peças do closet.

## 1. Ampliar a store (`src/lib/handcloStore.ts`)

Enriquecer os tipos e adicionar novos stores persistidos em localStorage.

**Peças (closet) — mais marcadores/tags:**
- `categoria`: ampliar para `top · calça · vestido · saia · jaqueta · casaco · sapato · bolsa · acessório`
- novos campos opcionais: `cor` (paleta: preto, branco, bege, azul, magenta, verde, terracota…), `estacao` (verão, inverno, meia-estação, todas), `ocasiao` (casual, social, trabalho, viagem, festa), `tags: string[]` (marcadores livres tipo "favorita", "nova", "alfaiataria"), `usos: number` (contador de vezes usada).
- `favorita: boolean` para destacar.

**Looks (arquivo de estilo):**
- adicionar `tag` (casual/social/inverno/viagem/festa) para os filtros funcionarem de verdade, `pecaIds: string[]` (peças que compõem o look, vindas do provador) e `origem` ("upload" | "provador" | "closet").

**Novos stores:**
- `useViagens` — viagens do Travel: `{ id, destino, inicio, fim, itens: { id, texto, pronta, pecaId? }[] }`.
- `useConfig` — preferências persistidas: idioma, moeda, tema, pecasPorLinha, toggles de notificação e personalidade do clō.

Cada store ganha `adicionar/atualizar/remover` no mesmo padrão dos hooks atuais. `store-context.tsx` passa a expor `viagens` e `config` além de `pecas`/`looks`/`tarefas`.

## 2. Provador (novo app `ProvadorApp.tsx`)

Hoje o botão "provador" na taskbar não faz nada. Vira um app de verdade:
- Lê as peças do closet e permite **montar um look** selecionando peças (1 por categoria-base, ex.: top + calça + sapato).
- Pré-visualização empilhada das peças escolhidas.
- Campo de nome + escolha de tag, botão **"salvar no arquivo de estilo"** → cria um `Look` com `pecaIds` e `origem: "provador"`, incrementa `usos` das peças usadas.
- Botão também acessível pelo ícone da taskbar (abre o app via `abrir("provador")` no `Desktop.tsx`).

## 3. Arquivo de estilo (`ArquivoApp.tsx`) — funcional

- Filtros (todos/casual/social/inverno/viagem/festa) passam a **filtrar de verdade** pela `tag` do look.
- Upload já existente ganha seleção de tag no envio.
- Cada look: **favoritar (estrela) com toggle real**, excluir, e mostrar as peças que o compõem (miniaturas via `pecaIds`).
- Botão "→ provador" para reabrir um look e remontar.

## 4. Travel (`TravelApp.tsx`) — CRUD de viagens

- Criar/editar/excluir viagens (destino, datas).
- Checklist por viagem: adicionar item manual **ou puxar peça do closet**; marcar pronta/excluir.
- Barra de progresso e contador "x / y prontas" calculados de verdade.
- Seletor de viagem ativa quando houver mais de uma.

## 5. Analytics (`AnalyticsApp.tsx`) — dados derivados reais

Substituir números fixos por métricas calculadas a partir da store (sem backend):
- total de peças, % não usadas (`usos === 0`), looks salvos, viagens, tarefas pendentes.
- gráfico "por categoria" gerado a partir das peças reais.
- distribuição por estação/ocasião e top peças mais usadas.
- quando a store estiver vazia, usar um conjunto de **dados de exemplo** plausíveis para a tela não ficar vazia (conforme pedido: não precisa de dados reais agora).

## 6. Configurações (`ConfigApp.tsx`) — funcional

- Toggles de notificação e selects (idioma, moeda, tema, peças por linha, personalidade clō) passam a **persistir** via `useConfig`.
- `pecasPorLinha` afeta o grid do Arquivo/Closet; `tema` ajusta variável de cor.

## 7. Interligação inteligente

- **Closet → Provador → Arquivo**: peças compõem looks; looks lembram suas peças.
- **Closet → Travel**: itens da mala podem ser peças reais do closet.
- **Tudo → Analytics**: métricas refletem peças, looks, viagens e tarefas.
- **Tudo → clō (CloAssistant)**: avisos gerados dinamicamente (ex.: "X peças sem uso", "viagem em N dias com Y/Z prontas", "N tarefas pendentes").
- **Closet → Agenda**: ao enviar peça com marcador, opção de criar tarefa "closet" relacionada (leve, opcional).

## 8. Registro e navegação

- `apps/registry.tsx`: registrar `provador`.
- `Desktop.tsx`: botão provador da taskbar abre o app; clō passa a receber dados da store.
- Sem backend; tudo em localStorage, componentes pequenos e tipados, mesmo estilo visual (sombras duras, fontes mono, paleta atual).

## Detalhes técnicos
- Reaproveitar `useLocalState`, `novoId`, `lerArquivoComoDataURL`, `LIMITE_IMG`.
- Manter migração suave: campos novos opcionais com defaults, para não quebrar dados já salvos.
- `CloAssistant` recebe props derivadas via `useStore` (avisos calculados com `useMemo`).
