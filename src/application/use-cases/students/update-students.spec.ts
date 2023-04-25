import { makeCourse } from '@test/factories/course-factory';
import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { CreateStudent } from './create-students';

import { ShowStudents } from './show-students';
import { UpdateStudent } from './update-students';

describe('Show student use cases', () => {
  it('should be able to show student', async () => {
    const studentRepository = new InMemoryStudentRepository();
    const createStudent = new CreateStudent(studentRepository);
    const updateStudent = new UpdateStudent(studentRepository);
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

    const { student: studentUpdated } = await updateStudent.execute({
      id: student.id,
      name: 'hagleyson 1',
      birth_date: new Date(),
      cpf: '087.405.434-63',
      rg: '000000000',
      school_education: 'superior completo 1',
      course: [course],
    });
    const list = await show.execute({ id: studentUpdated.id });
    expect(studentUpdated).not.toEqual(student);
    expect(studentUpdated).toEqual(list.student);
  });
});
