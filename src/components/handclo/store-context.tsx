import { createContext, useContext, type ReactNode } from "react";
import { usePecas, useLooks, useTarefas, useViagens, useConfig } from "@/lib/handcloStore";

type StoreValue = ReturnType<typeof useTarefas> & {
  pecas: ReturnType<typeof usePecas>;
  looks: ReturnType<typeof useLooks>;
  viagens: ReturnType<typeof useViagens>;
  config: ReturnType<typeof useConfig>;
};

const StoreContext = createContext<StoreValue | null>(null);

export function HandcloStoreProvider({ children }: { children: ReactNode }) {
  const tarefas = useTarefas();
  const pecas = usePecas();
  const looks = useLooks();
  const viagens = useViagens();
  const config = useConfig();

  return (
    <StoreContext.Provider value={{ ...tarefas, pecas, looks, viagens, config }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore deve ser usado dentro de HandcloStoreProvider");
  return ctx;
}