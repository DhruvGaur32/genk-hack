import type { Template } from "@/types/template"
import fs from "fs"
import path from "path"
const html = fs.readFileSync(
    path.join(process.cwd(), "public/templates/whack_a_mole.html"),
    "utf-8"
  )
export const templates: Template[] = [
    {
        id: "dashboard",
        title: "WhackAMole",
        description: "Modern dashboard with charts, metrics, and real-time data visualization",
        category: "Dashboard",
        previewImage: "/assets/whackamole.png",
        tags: ["React", "Charts", "Analytics"],
        html: html,
    },
    {
        id: "landing",
        title: "SaaS Landing Page",
        description: "Conversion-optimized landing page with hero section and pricing tiers",
        category: "Marketing",
        previewImage: "/placeholder.svg?height=200&width=300",
        tags: ["Landing", "SaaS", "Marketing"],
        html: ``,
    },
    {
        id: "portfolio",
        title: "Developer Portfolio",
        description: "Clean portfolio showcase with project gallery and contact form",
        category: "Portfolio",
        previewImage: "/placeholder.svg?height=200&width=300",
        tags: ["Portfolio", "Showcase", "Personal"],
        html: ``,
    },
    {
        id: "blog",
        title: "Technical Blog",
        description: "Markdown-powered blog with syntax highlighting and search functionality",
        category: "Content",
        previewImage: "/placeholder.svg?height=200&width=300",
        tags: ["Blog", "Markdown", "Content"],
        html: ``,
    },
    {
        id: "ecommerce",
        title: "E-commerce Store",
        description: "Full-featured online store with cart, checkout, and product management",
        category: "E-commerce",
        previewImage: "/placeholder.svg?height=200&width=300",
        tags: ["Store", "Commerce", "Shopping"],
        html: ``,
    },
    {
        id: "docs",
        title: "Documentation Site",
        description: "Technical documentation with search, navigation, and code examples",
        category: "Documentation",
        previewImage: "/placeholder.svg?height=200&width=300",
        tags: ["Docs", "Technical", "Guide"],
        html: ``,
    },
    {
        id: "admin",
        title: "Admin Panel",
        description: "Comprehensive admin interface with user management and data tables",
        category: "Admin",
        previewImage: "/placeholder.svg?height=200&width=300",
        tags: ["Admin", "Management", "CRUD"],
        html: ``,
    },
]
