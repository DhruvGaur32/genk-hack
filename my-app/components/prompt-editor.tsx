"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Send } from "lucide-react"

interface PromptEditorProps {
    onGenerate: (prompt: string) => void
    isLoading?: boolean
}

export function PromptEditor({ onGenerate, isLoading = false }: PromptEditorProps) {
    const [prompt, setPrompt] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (prompt.trim()) {
            onGenerate(prompt.trim())
        }
    }

    const examplePrompts = [
        "Make the header blue and add a gradient background",
        "Add a contact form to the footer section",
        "Change the color scheme to green and white",
        "Add a testimonials section with customer reviews",
        "Include a pricing table with three tiers",
    ]

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="prompt" className="text-white font-mono text-sm mb-3 block">
                    Describe your customization
                </Label>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        id="prompt"
                        placeholder="e.g., Make the header blue, add a contact form, change the layout to 3 columns..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[120px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 font-mono text-sm resize-none focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <Button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono"
                    >
                        {isLoading ? (
                            <>
                                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Generate Updated Template
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {/* Example Prompts */}
            <div>
                <Label className="text-gray-400 font-mono text-xs mb-3 block">Example prompts:</Label>
                <div className="space-y-2">
                    {examplePrompts.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => setPrompt(example)}
                            className="block w-full text-left p-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-colors font-mono"
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
