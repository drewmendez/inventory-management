import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export type ThemeContextState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeContextState = {
  theme: 'dark',
  setTheme: () => null,
}

export const ThemeContext = createContext<ThemeContextState>(initialState)
