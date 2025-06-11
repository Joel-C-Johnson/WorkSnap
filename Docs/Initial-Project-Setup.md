# Project Set up

## Project setup using vite react + JavaScript with shadcn
Note : As we are using JavaScript instead of TypeScript i have used below steps for initial steps for setuping shadcn in react vite application.

1. Create project
   `pnpm create vite@latest`
   
   FrameWork : react
   Variant : JavaScript
then,
- cd WorkSnap
  npm install

2. Add Tailwind CSS
  `npm install tailwindcss @tailwindcss/vite`
  then,
  Replace everything in src/index.css with the following:
  `@import "tailwindcss";`

3. Create jsconfig.json file
  then paste the below code,
  `{
  "files": [],
  "references": [],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`

4. Update vite.config.ts
  Add the following code to the vite.config.ts so your app can resolve paths without error:
  `npm install -D @types/node`

5. Replace the file name to 'vite.config.ts'
    then paste the below code
    `
    import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
    `


6. Initialize shadcn/ui
   Run this command in your project root:
   `npx shadcn@latest init`

### Now it is ready. You can use the components from shadcn websites
