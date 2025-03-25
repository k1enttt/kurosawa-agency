import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useRef } from 'react'
import { locales } from '@/middleware'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@/utilities/ui'

const mapLanguageString: Record<string, string> = {
  en: 'English',
  vi: 'Vietnamese',
  ja: 'Japanese',
}

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const langSelectRef = useRef<HTMLSelectElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const locale = searchParams.get('locale')
    if (locale) {
      if (langSelectRef.current) {
        langSelectRef.current.value = locale
      }
    }
  }, [searchParams])

  const languageList = locales
  return (
    <Select
      value={searchParams.get('locale') || ''}
      onValueChange={(selectedLanguage) => {
        // Update locale search param with the selected locale
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('locale', selectedLanguage)
        const newUrl = `${pathname}?${newSearchParams.toString()}`
        router.replace(newUrl)

        // Save to the cookie
        document.cookie = `locale=${selectedLanguage}; path=/; max-age=31536000`
      }}
    >
      <SelectTrigger className={cn('w-16 md:w-36', className)}>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languageList &&
          languageList.map(
            (lang) =>
              Object.keys(mapLanguageString).includes(lang) && (
                <SelectItem key={lang} value={lang}>
                  <div className="hidden md:flex">{mapLanguageString[lang]}</div>
                  <div className="flex md:hidden">{lang.toUpperCase()}</div>
                </SelectItem>
              ),
          )}
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher
