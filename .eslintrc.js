module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "object-curly-newline": ["error", {
         // "ObjectExpression": "always",
         // "ObjectPattern": { "multiline": true },
         "ImportDeclaration": "never",
         "ExportDeclaration": { "multiline": true, "minProperties": 3 }
     }],

    indent: ['warn', 2],

    'vue/script-indent': ['warn', 2, {
      'baseIndent': 1
    }],

    semi: ['error', 'never'],
    'no-use-before-define': ['warn', {'functions': true, 'classes': true}],
    'no-undef': 'warn',
    'max-len': ['warn', {'ignoreTrailingComments': true}, { "code": 120 }],
    'no-unused-vars': ['warn', {'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false}],
    'no-return-assign': 'off', // for forEach without return
    'no-unused-expressions': ['warn', {
      allowShortCircuit: true,
      allowTernary: true
    }],
    /* allow first letter for a new instance */
    'new-cap': [
      'warn',
      {
        newIsCapExceptions: ['moment'],
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    /* Запретить использовать конечные запятые */
    'comma-dangle': 0,

    /* Завершающие пробелы в конце строк */
    'no-trailing-spaces': 0,

    /* Cкобки в аргументах стрелочной функции */
    'arrow-parens': 0,

    /* Отступы в html */
    // 'vue/html-indent': ['error', 2, {
    //   attribute: 1,
    //   baseIndent: 1,
    //   alignAttributesVertically: true,
    //   ignores: []
    // }],
    // 'vue/html-indent': 0,
    'vue/singleline-html-element-content-newline': 0,
    'spaced-comment': 0,
    'prefer-const': 0,
    camelcase: 0,
    eqeqeq: 0,
    'no-useless-return': 0,

    /* Разрешает несколько атрибутов в строке */
    'vue/max-attributes-per-line': 0,

    /* Заполнение внутри блоков js */
    'padded-blocks': 0
  },
  overrides: [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off"
      }
    }
  ]
}
