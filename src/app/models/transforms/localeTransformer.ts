import {Locale} from '../Locale';

export function localeArrayTransformer(localCodes: string[]): Locale[] {
  return localCodes.map((localCode) => localeTransformer(localCode));
}

export function localeTransformer(localCode: string): Locale {
  if (localCode) {
    const localeParts = localCode.split('_');
    const language = localeParts[0];
    let country: string;
    if (localeParts.length > 1) {
      country = localeParts[1];
    }

    const locale = new Locale();
    locale.language = language;

    if (country) {
      locale.country = country;
    }

    return locale;
  }

  return undefined;
}

export function localeCodeArrayTransformer(locales: Locale[]): string[] {
  return locales.map((locale) => localeCodeTransformer(locale));
}

export function localeCodeTransformer(locale: Locale): string {
  return locale ? (locale.language + (!!locale.country ? `_${locale.country}` : '')) : undefined;
}
