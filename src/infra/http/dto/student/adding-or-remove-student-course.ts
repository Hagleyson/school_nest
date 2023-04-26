import { IsNotEmpty } from 'class-validator';

export class AddingOrRemoveStudentCourseBody {
  @IsNotEmpty()
  student_id: number;

  new_courses: number[];

  removed_courses: number[];
}
