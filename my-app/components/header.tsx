import { Code2, Zap } from "lucide-react"

export function Header() {
    return (
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white font-mono">DevTemplates</h1>
                            <p className="text-sm text-gray-400">Ship faster with pre-built templates</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Zap className="w-4 h-4" />
                        <span className="font-mono">v1.0.0</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
