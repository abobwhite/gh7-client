import {Expose, Type} from 'class-transformer';

export class Auth0User {
  sub: string; // openid
  nickname: string;

  @Expose({name: 'given_name'})
  givenName: string;

  @Expose({name: 'family_name'})
  familyName: string;

  gender: string;
  locale: string;
  picture: string; // url

  @Expose({name: 'updated_at'})
  @Type(() => Date)
  updatedAt: Date;

  email: string;

  @Expose({name: 'email_verified'})
  @Type(() => Boolean)
  emailVerified: boolean;
}
