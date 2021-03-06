import {PhoneNumber} from './PhoneNumber';
import {Transform, Type} from 'class-transformer';
import {Locale} from './Locale';
import {ASSISTANCE_CAPABILITY} from './ASSISTANCE_CAPABILITY';
import {localeArrayTransformer, localeCodeArrayTransformer, localeCodeTransformer, localeTransformer} from './transforms/localeTransformer';
import {phoneNumberDeserialize, phoneNumberSerialize} from './transforms/phoneNumberTransformer';

export class User {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  capabilitiesVerified: boolean;

  @Type(() => PhoneNumber)
  @Transform(phoneNumberDeserialize, {toPlainOnly: true})
  @Transform(phoneNumberSerialize, {toClassOnly: true})
  phoneNumber: string;

  @Type(() => Locale)
  @Transform(localeArrayTransformer, {toClassOnly: true})
  @Transform(localeCodeArrayTransformer, {toPlainOnly: true})
  knownLanguages: Locale[] = [];

  @Type(() => Locale)
  @Transform(localeTransformer, {toClassOnly: true})
  @Transform(localeCodeTransformer, {toPlainOnly: true})
  preferredLanguage: Locale;

  @Type(() => Locale)
  @Transform(localeTransformer, {toClassOnly: true})
  @Transform(localeCodeTransformer, {toPlainOnly: true})
  assistanceLanguage: Locale;

  assistanceCapabilities: ASSISTANCE_CAPABILITY[] = [];

  get hasProfile(): boolean {
    return this.phoneNumber && !!this.knownLanguages.length && !!this.preferredLanguage;
  }

  get needsAssistance(): boolean {
    return !!this.assistanceLanguage;
  }

  get canAssist(): boolean {
    return !!this.assistanceCapabilities && !!this.assistanceCapabilities.length;
  }

  get fullName(): string {
    return `${this.givenName} ${this.familyName}`;
  }
}
