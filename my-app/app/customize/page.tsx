"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { PromptEditor } from "@/components/prompt-editor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/types/template"
import { ArrowLeft, Settings } from "lucide-react"
import Image from "next/image"

export default function CustomizePage() {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Get selected template from localStorage
        const stored = localStorage.getItem("selectedTemplate")
        if (stored) {
            setSelectedTemplate(JSON.parse(stored))
        } else {
            // Redirect back if no template selected
            router.push("/")
        }
    }, [router])

    const handleGenerate = async (prompt: string) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)

        // Here you would typically send the prompt to your AI service
        console.log("Generating template with prompt:", prompt)
        console.log("Template ID:", selectedTemplate?.id)
    }

    if (!selectedTemplate) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 font-mono">Loading template...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.push("/")}
                    className="mb-8 text-gray-400 hover:text-white font-mono"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Template Preview */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <Settings className="w-6 h-6 text-blue-400" />
                            <h1 className="text-2xl font-bold text-white font-mono">Customize Template</h1>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                            <div className="relative aspect-video bg-gray-800">
                                <iframe
                                    className="w-full h-[80vh] border rounded"
                                    srcDoc={selectedTemplate.html}
                                    sandbox=""
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h2 className="text-xl font-semibold text-white font-mono">{selectedTemplate.title}</h2>
                                    <Badge variant="secondary">{selectedTemplate.category}</Badge>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">{selectedTemplate.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTemplate.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md font-mono">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customization Panel */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-white font-mono mb-2">AI-Powered Customization</h2>
                            <p className="text-gray-400 text-sm font-mono">
                                Describe the changes you want to make to this template. Our AI will generate the updated version for
                                you.
                            </p>
                        </div>

                        <PromptEditor onGenerate={handleGenerate} isLoading={isLoading} />

                        {/* Tips */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-white font-mono mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-400 font-mono">
                                <li>• Be specific about colors, layouts, and components</li>
                                <li>• Mention exact sections you want to modify</li>
                                <li>• Include functionality requirements</li>
                                <li>• Reference design patterns or frameworks</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
