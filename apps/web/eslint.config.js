import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default antfu(
  {
    react: true,
    stylistic: false,
    typescript: true,
    rules: {
      'no-console': 'off',
      'ts/consistent-type-definitions': 'off',
      'react-naming-convention/use-state': 'off',
    },
  },
  eslintConfigPrettier,
)
