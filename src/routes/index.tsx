import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')  ({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          Bem-vindo ao HandcloProtype
        </h1>
        <p className="text-xl text-slate-300">
          Seu projeto está funcionando! 🚀
        </p>
        <Button size="lg" className="mt-8">
          Começar
        </Button>
      </div>
    </div>
  )
}