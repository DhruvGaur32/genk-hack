export interface Template {
    id: string
    title: string
    description: string
    category: string
    previewImage: string
    tags: string[]
    html : string
}

export interface CustomizationPrompt {
    templateId: string
    prompt: string
}
  