"use client"

import type { Template } from "@/types/template"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface TemplateCardProps {
    template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
    const router = useRouter()

    const handleSelect = () => {
        // Store selected template in localStorage for the customize page
        localStorage.setItem("selectedTemplate", JSON.stringify(template))
        router.push("/customize")
    }

    return (
        <div className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
            {/* Preview Image */}
            <div className="relative aspect-video bg-gray-800 overflow-hidden">
                <Image
                    src={template.previewImage || "/assets/whackamole.png"}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-lg font-semibold text-white font-mono mb-1">{template.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                            {template.category}
                        </Badge>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md font-mono">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Button */}
                <Button onClick={handleSelect} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono group/btn">
                    Select Template
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </div>
        </div>
    )
}
