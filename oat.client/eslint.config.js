import ParserTypescriptEslint from '@typescript-eslint/parser'
import PluginImport from 'eslint-plugin-import'
import PluginJest from 'eslint-plugin-jest'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parser: ParserTypescriptEslint,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tsPlugin,
            import: PluginImport,
            jest: PluginJest,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
        settings: {
            'import/resolver': {
                ...PluginImport.configs.typescript.settings['import/resolver'],
                typescript: {
                    project: ['tsconfig.json'],
                },
            },
        },
    },
]
