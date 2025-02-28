import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        reporters: ['default', 'html'],
        coverage: {
            enabled: true,
            provider: 'v8',
            cleanOnRerun: true,
            reporter: ['text', 'json', 'html'],
            exclude: ['**/*.stories.tsx', '**/*.stories.ts', "**/example/**", "**/interface.ts", ...coverageConfigDefaults.exclude]
        }
    }
})