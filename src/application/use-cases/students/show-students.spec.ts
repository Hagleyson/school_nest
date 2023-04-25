import { makeCourse } from '@test/factories/course-factory';
import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { CreateStudent } from './create-students';

import { ShowStudents } from './show-students';

describe('Show student use cases', () => {
  it('should be able to show student', async () => {
    const studentRepository = new InMemoryStudentRepository();
    const createStudent = new CreateStudent(studentRepository);
    const course = makeCourse();
    const show = new ShowStudents(studentRepository);

    const { student } = await createStudent.execute({
      name: 'hagleyson',
      birth_date: new Date(),
      cpf: '087.405.434-63',
      rg: '000000000',
      school_education: 'superior completo',
      course: [course],
    });

    const list = await show.execute({ id: student.id });

    expect(list.student).toEqual(student);
  });
});
