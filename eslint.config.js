import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
    quotes: 'single',
  },
  rules: {
    'style/semi': ['error', 'always'],
    'style/quotes': ['error', 'single'],
  },
  ignores: ['*.md', '**/*.md', 'dist/', 'node_modules/', 'docs/'],
});
