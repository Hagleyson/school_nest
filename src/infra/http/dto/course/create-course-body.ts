import { IsNotEmpty } from 'class-validator';

export class CreateCourseBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  period: string;

  @IsNotEmpty()
  teacher_name: string;
}
