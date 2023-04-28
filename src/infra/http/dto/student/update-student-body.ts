import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateStudentBody {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  school_education: string;

  @IsNotEmpty()
  birth_date: Date;
}
