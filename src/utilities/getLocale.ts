export function getLocaleFromSearchParams() {
  if (typeof window === 'undefined') return 'vi'
  const params = new URLSearchParams(window.location.search)
  const locale = params.get('locale')
  if (locale === 'vi' || locale === 'en' || locale === 'ja') return locale
  return 'en'
}
