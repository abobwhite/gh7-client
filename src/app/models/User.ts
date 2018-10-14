import {PhoneNumber} from './PhoneNumber';
import {Transform, Type} from 'class-transformer';
import {Locale} from './Locale';
import {ASSISTANCE_CAPABILITY} from './ASSISTANCE_CAPABILITY';
import {localeArrayTransformer, localeTransformer} from './transforms/localeTransformer';

export class User {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  capabilitiesVerified: boolean;

  @Type(() => PhoneNumber)
  phoneNumber: PhoneNumber;

  @Type(() => Locale)
  @Transform(localeArrayTransformer)
  knownLanguages: Locale[];

  @Type(() => Locale)
  @Transform(localeTransformer)
  preferredLanguage: string;

  @Type(() => Locale)
  @Transform(localeTransformer)
  assistanceLanguage: string;

  assistanceCapabilities: ASSISTANCE_CAPABILITY[];

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
