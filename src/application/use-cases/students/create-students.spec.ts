import { makeCourse } from '../../../test/factories/course-factory';
import { InMemoryStudentRepository } from '../../../test/repositories/in-memory-student-repository';
import { CreateStudent } from './create-students';
import { ListStudent } from './list-students';

describe('Create student use cases', () => {
  it('should be able to create course', async () => {
    const studentRepository = new InMemoryStudentRepository();
    const createStudent = new CreateStudent(studentRepository);
    const course = makeCourse();
    const findStudent = new ListStudent(studentRepository);

    const { student } = await createStudent.execute({
      name: 'hagleyson',
      birth_date: new Date(),
      cpf: '087.405.434-63',
      rg: '000000000',
      school_education: 'superior completo',
      course: [course],
    });

    const { student: student2 } = await createStudent.execute({
      name: 'hagleyson',
      birth_date: new Date(),
      cpf: '087.405.434-63',
      rg: '000000000',
      school_education: 'superior completo',
    });

    const list = await findStudent.execute();
    expect(list.student).toHaveLength(2);
    expect(list.student).toEqual([student, student2]);
  });
});
