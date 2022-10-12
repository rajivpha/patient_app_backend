import { IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  contactNo: string;

  @IsNotEmpty()
  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  isSpecial: boolean;
}
