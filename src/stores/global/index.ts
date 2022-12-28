type Theme = 'light' | 'dark'

export const useGlobalStore = defineStore('global', () => {
  const theme = ref((document.documentElement.dataset['theme'] ?? 'light') as Theme)

  const toggleTheme = (target?: Theme) => {
    localStorage.setItem(
      'theme',
      (document.documentElement.dataset['theme'] = theme.value =
        target ? target : theme.value === 'light' ? 'dark' : 'light')
    )
  }

  return {
    theme,
    toggleTheme
  }
})
