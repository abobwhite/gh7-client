import {PhoneNumber} from './PhoneNumber';
import {Transform, Type} from 'class-transformer';
import {Locale} from './Locale';
import {ASSISTANCE_CAPABILITY} from './ASSISTANCE_CAPABILITY';

export class User {
  id: string;
  username: string;
  givenName: string;
  familyName: string;

  @Type(() => PhoneNumber)
  phoneNumber: PhoneNumber;

  // @Type(() => Locale)
  // @Transform((localeString) => )
  // TODO: ALEX transform
  knownLanguages: string[]; // Locale[];

  preferredLanguage: string;
  assistanceLanguage: string;
  assistanceCapabilities: ASSISTANCE_CAPABILITY[];
}
