import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsconfigPaths()],
   test: {
    coverage: {
      exclude: [
        "node_modules/",
        "generated/",   // pasta do prisma
      ],
    },
  },
})