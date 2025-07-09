"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Send } from "lucide-react"

interface PromptEditorProps {
    onVisualGenerate: (prompt: string) => void
    onAudioGenerate: (prompt: string, fileName?: string) => void | Promise<any>
    isLoading?: boolean
}

export function PromptEditor({ onVisualGenerate,onAudioGenerate, isLoading = false }: PromptEditorProps) {
    const [AudioPrompt, setAudioPrompt] = useState("")
    const [VisualPrompt, setVisualPrompt] = useState("")

    const handleVisualSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (VisualPrompt.trim()) {
            onVisualGenerate(VisualPrompt.trim())
        }
    }
    const handleAudioSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (AudioPrompt.trim()) {
            onAudioGenerate(AudioPrompt.trim())
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
                <Label htmlFor="VisualPrompt" className="text-white font-mono text-sm mb-3 block">
                    Describe your visual customization
                </Label>
                <form onSubmit={handleVisualSubmit} className="space-y-4">
                    <Textarea
                        id="VisualPrompt"
                        placeholder="e.g., Make the header blue, add a contact form, change the layout to 3 columns..."
                        value={VisualPrompt}
                        onChange={(e) => setVisualPrompt(e.target.value)}
                        className="min-h-[120px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 font-mono text-sm resize-none focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <Button
                        type="submit"
                        disabled={!VisualPrompt.trim() || isLoading}
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

            <div>
                <Label htmlFor="AudioPrompt" className="text-white font-mono text-sm mb-3 block">
                    Describe your audio customization
                </Label>
                <form onSubmit={handleAudioSubmit} className="space-y-4">
                    <Textarea
                        id="AudioPrompt"
                        placeholder="e.g., Make the header blue, add a contact form, change the layout to 3 columns..."
                        value={AudioPrompt}
                        onChange={(e) => setAudioPrompt(e.target.value)}
                        className="min-h-[120px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 font-mono text-sm resize-none focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <Button
                        type="submit"
                        disabled={!AudioPrompt.trim() || isLoading}
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
                            onClick={() => setAudioPrompt(example)}
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
