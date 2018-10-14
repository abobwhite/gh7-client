export class Locale {
  language: string;
  country: string;

  constructor(language?: string, country?: string) {
    this.language = language;
    this.country = country;
  }
}
