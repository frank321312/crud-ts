import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbBaseTypescript from 'eslint-config-airbnb-base-typescript';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslintPluginPrettierRecommended,
    js.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            'unused-imports': unusedImports,
            '@typescript-eslint': tseslint,
            prettier: prettier,
        },
        rules: {
            ...airbnbBase.rules,
            ...airbnbBaseTypescript.rules,
            'prefer-const': ['warn'],
            'no-var': ['warn'],
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    argsIgnorePattern: '^_',
                    args: 'after-used',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    singleQuote: true,
                    tabWidth: 4,
                    bracketSpacing: true,
                },
            ],
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    },
];
