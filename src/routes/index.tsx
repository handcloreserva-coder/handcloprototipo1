import { createFileRoute } from "@tanstack/react-router";
import Desktop from "@/components/handclo/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "handclō os · desktop" },
      { name: "description", content: "seu guarda-roupa digital: agenda, closet, looks e travel num desktop retrô." },
      { property: "og:title", content: "handclō os · desktop" },
      { property: "og:description", content: "seu guarda-roupa digital: agenda, closet, looks e travel num desktop retrô." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
