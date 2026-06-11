import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "**/.next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "backups/**",
    "app_backup/**",
    "feduptv/**",
    "**/*.backup.ts",
    "**/*.backup.tsx",
    "**/*.bak",
    "**/*.broken",
  ]),
]);

export default eslintConfig;
