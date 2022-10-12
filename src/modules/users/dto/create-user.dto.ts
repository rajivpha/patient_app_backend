import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() password: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class LoginUserDto {
  @IsNotEmpty() readonly username: string;
  @IsNotEmpty() readonly password: string;
}
