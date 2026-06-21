import type { ComponentType } from "react";
import AgendaApp from "./AgendaApp";
import ArquivoApp from "./ArquivoApp";
import TravelApp from "./TravelApp";
import AnalyticsApp from "./AnalyticsApp";
import ConfigApp from "./ConfigApp";
import ProvadorApp from "./ProvadorApp";

export type AppKey = "agenda" | "arquivo" | "travel" | "analytics" | "config" | "provador";

export interface AppDef {
  titulo: string;
  cor: string;
  largura: number;
  Component: ComponentType;
}

export const APPS: Record<AppKey, AppDef> = {
  agenda: { titulo: "agenda · semana", cor: "#D0DCEE", largura: 280, Component: AgendaApp },
  arquivo: { titulo: "arquivo de estilo", cor: "#FDEAB8", largura: 300, Component: ArquivoApp },
  travel: { titulo: "travel · checklist", cor: "#F5D0C0", largura: 260, Component: TravelApp },
  analytics: { titulo: "analytics · closet", cor: "#E8D4E8", largura: 270, Component: AnalyticsApp },
  config: { titulo: "configurações", cor: "#D8E8D0", largura: 280, Component: ConfigApp },
  provador: { titulo: "provador", cor: "#F5D0C0", largura: 280, Component: ProvadorApp },
};