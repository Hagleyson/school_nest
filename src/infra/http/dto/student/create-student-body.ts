import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateCourseBody } from '../course/create-course-body';

export class CreateStudentBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  school_education: string;

  @IsNotEmpty()
  birth_date: Date;
}
