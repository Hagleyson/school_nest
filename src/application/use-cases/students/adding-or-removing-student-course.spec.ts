import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { CreateStudent } from './create-students';
import { AddingOrRemovingStudentCourse } from './adding-or-removing-student-course';
import { ListStudent } from './list-students';
import { InMemoryCourseRepository } from '@test/repositories/in-memory-course-repository';
import { makeCourse } from '@test/factories/course-factory';
import { CreateCourse } from '../courses';

describe('Adding curse in student use cases', () => {
  it('should be able to add course in student', async () => {
    const studentRepository = new InMemoryStudentRepository();
    const courseRepository = new InMemoryCourseRepository();
    const createStudent = new CreateStudent(studentRepository);
    const addingOrRemovingStudentCourse = new AddingOrRemovingStudentCourse(
      studentRepository,
      courseRepository,
    );
    const createCourse = new CreateCourse(courseRepository);
    const { student } = await createStudent.execute({
      name: 'hagleyson',
      birth_date: new Date(),
      cpf: '087.405.434-63',
      rg: '000000000',
      school_education: 'superior completo',
    });
    const course = await createCourse.execute({
      content: '01',
      name: '01',
      period: '01',
      teacher_name: '01',
    });
    course.course.id = 1;
    const course2 = await createCourse.execute({
      content: '02',
      name: '02',
      period: '02',
      teacher_name: '02',
    });
    course2.course.id = 2;
    const course3 = await createCourse.execute({
      content: '03',
      name: '03',
      period: '03',
      teacher_name: '03',
    });
    course3.course.id = 3;

    await addingOrRemovingStudentCourse.execute({
      student_id: student.id,
      newCourses: [course.course.id, course2.course.id],
      removedCourses: [],
    });
    await addingOrRemovingStudentCourse.execute({
      student_id: student.id,
      newCourses: [course3.course.id],
      removedCourses: [course2.course.id],
    });
  });
});
