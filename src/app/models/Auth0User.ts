import {Expose, Type} from 'class-transformer';

export class Auth0User {
  sub: string;
  nickname: string;
  name: string;
  picture: string; // url

  @Expose({name: 'updated_at'})
  @Type(() => Date)
  updatedAt: Date;

  email: string;

  @Expose({name: 'email_verified'})
  @Type(() => Boolean)
  emailVerified: boolean;
}
