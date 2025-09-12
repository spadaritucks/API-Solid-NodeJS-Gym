import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { dir } from 'console'
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        "node_modules/",
        "generated/",   // pasta do prisma
      ],
    },
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/services'
        }
      },
      {
        extends : true,
        test: {
          name : 'e2e',
          dir : "src/http/controllers",
          environment : "./prisma/vitest-enviroment-prisma/prisma-test-enviroment.ts"
        }
      }
    ]
  },
})