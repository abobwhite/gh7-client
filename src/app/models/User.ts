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
}
