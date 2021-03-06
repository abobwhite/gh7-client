export class Locale {
  language: string;
  country: string;
  displayName: string;

  constructor(language?: string, country?: string, displayName?: string) {
    this.language = language;
    this.country = country;
    this.displayName = displayName;
  }

  get localeCode(): string {
    return this.language + (!!this.country ? `_${this.country}` : '');
  }
}
