import { useRouter } from 'vue-router'

export function useGoBack() {
  const router = useRouter()

  const goBack = (fallbackPath = '/') => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackPath)
    }
  }

  return { goBack }
}
