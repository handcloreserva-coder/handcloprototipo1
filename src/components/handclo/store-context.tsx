import { createContext, useContext, type ReactNode } from "react";
import { usePecas, useLooks, useTarefas } from "@/lib/handcloStore";

type StoreValue = ReturnType<typeof useTarefas> & {
  pecas: ReturnType<typeof usePecas>;
  looks: ReturnType<typeof useLooks>;
};

const StoreContext = createContext<StoreValue | null>(null);

export function HandcloStoreProvider({ children }: { children: ReactNode }) {
  const tarefas = useTarefas();
  const pecas = usePecas();
  const looks = useLooks();

  return (
    <StoreContext.Provider value={{ ...tarefas, pecas, looks }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore deve ser usado dentro de HandcloStoreProvider");
  return ctx;
}