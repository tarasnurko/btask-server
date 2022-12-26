import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
