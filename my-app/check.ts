import fs from 'fs'
import path from 'path'

const dirPath = path.join(process.cwd(), 'public', 'assets')

// Check if folder exists
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
}

// Check if folder is writable
try {
    fs.accessSync(dirPath, fs.constants.W_OK)
    console.log('public/assets is writable')
} catch (err) {
    console.error('public/assets is NOT writable')
}
