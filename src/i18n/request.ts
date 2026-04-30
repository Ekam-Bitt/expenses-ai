import { getRequestConfig } from 'next-intl/server'

export const localeLabels = {
  'en-US': 'English',
} as const

export const locales: (keyof typeof localeLabels)[] = Object.keys(
  localeLabels,
) as any
export type Locale = keyof typeof localeLabels
export type Locales = ReadonlyArray<Locale>
export const defaultLocale: Locale = 'en-US'

export default getRequestConfig(async () => {
  const messages = (await import(`../../messages/en-US.json`)).default

  return {
    locale: defaultLocale,
    messages,
  }
})
