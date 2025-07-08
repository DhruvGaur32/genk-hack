import { Header } from "@/components/header"
import { TemplateCard } from "@/components/template-card"
import { templates } from "@/data/templates"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono">
            Ship <span className="text-blue-400">faster</span> with
            <br />
            pre-built templates
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            Choose from our collection of production-ready templates. Customize with AI-powered prompts and deploy in
            minutes.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-blue-400 font-mono mb-2">7</div>
            <div className="text-gray-400 font-mono text-sm">Templates Available</div>
          </div>
          <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-green-400 font-mono mb-2">{"<5min"}</div>
            <div className="text-gray-400 font-mono text-sm">Setup Time</div>
          </div>
          <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
            <div className="text-3xl font-bold text-purple-400 font-mono mb-2">100%</div>
            <div className="text-gray-400 font-mono text-sm">TypeScript</div>
          </div>
        </div>
      </main>
    </div>
  )
}
