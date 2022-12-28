import { fileURLToPath, URL } from 'node:url'

export default function envDir() {
  return fileURLToPath(new URL('./', import.meta.url))
}
