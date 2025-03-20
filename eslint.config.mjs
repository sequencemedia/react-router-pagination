import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import typescript from '@sequencemedia/eslint-config-typescript/configs/recommended/merge'
import babelParser from '@babel/eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import storybookPlugin from 'eslint-plugin-storybook'

const reactParserOptions = {
  ecmaFeatures: {
    jsx: true
  }
}

const reactPlugins = {
  react: reactPlugin
}

const storybookPlugins = {
  storybook: storybookPlugin
}

const reactRules = {
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'React'
    }
  ],
  quotes: [
    'error',
    'single'
  ],
  'jsx-quotes': [
    'error',
    'prefer-single'
  ],
  'react/jsx-indent': [
    'error',
    2,
    {
      checkAttributes: true,
      indentLogicalExpressions: true
    }
  ]
}

const reactSettings = {
  react: {
    version: 'detect'
  }
}

export default [
  {
    ignores: [
      '.coverage'
    ]
  },
  /**
   *  React config for all `jsx` and `tsx` files
   */
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      ...reactPlugin.configs.flat.recommended.settings,
      ...reactSettings
    }
  },
  /**
   *  Storybook config
   */
  ...storybookPlugin.configs['flat/recommended'],
  /**
   *  Standard config
   */
  standard({
    files: [
      '**/*.{mjs,cjs,mts,cts}'
    ],
    ignores: [
      'src',
      'stories'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  standard({
    files: [
      'src/**/*.{mjs,cjs,mts,cts}',
      'stories/**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  /**
   *  Standard config for all `jsx` and `tsx` files
   */
  standard({
    files: [
      'src/**/*.{mts,tsx}',
      'stories/**/*.{mjs,jsx}'
    ],
    ignores: [
      'src/__tests__/**/*.{mts,tsx}',
      'stories/**/__tests__/**/*.{mjs,jsx}'
    ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ...reactParserOptions,
        project: null
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      ...reactPlugins,
      ...storybookPlugins
    },
    rules: {
      ...reactRules
    },
    settings: {
      ...reactSettings
    }
  }),
  standard({
    files: [
      'src/**/__tests__/**/*.{mjs,jsx}',
      'stories/**/__tests__/**/*.{mjs,jsx}'
    ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ...reactParserOptions,
        project: null
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    plugins: {
      ...reactPlugins,
      ...storybookPlugins
    },
    rules: {
      ...reactRules
    },
    settings: {
      ...reactSettings
    }
  }),
  /**
   *  TypeScript config
   */
  typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'src',
      'stories'
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        CogsTypes: 'readonly'
      }
    }
  }),
  typescript({
    files: [
      'src/**/*.{mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  /**
   *  TypeScript config for only `tsx` files
   */
  typescript({
    files: [
      'src/**/*.{mts,tsx}'
    ],
    ignores: [
      'src/**/__tests__/**/*.{mts,tsx}'
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ...reactParserOptions,
        projectService: true,
        project: 'tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ReactRouterPaginationTypes: 'readonly'
      }
    },
    plugins: {
      ...reactPlugins
    },
    rules: {
      ...reactRules,
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/prefer-destructuring': 'warn',
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
    settings: {
      ...reactSettings
    }
  }),
  typescript({
    files: [
      'src/**/__tests__/**/*.{mts,tsx}'
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ...reactParserOptions,
        projectService: true,
        project: 'tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    plugins: {
      ...reactPlugins
    },
    rules: {
      ...reactRules,
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/no-empty-function': 'off'
    },
    settings: {
      ...reactSettings
    }
  })
]
