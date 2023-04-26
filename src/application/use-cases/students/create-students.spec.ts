import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { CreateStudent } from './create-students';
import { ListStudent } from './list-students';

describe('Create student use cases', () => {
  it('should be able to create student', async () => {
    const studentRepository = new InMemoryStudentRepository();
    const createStudent = new CreateStudent(studentRepository);
    const findStudent = new ListStudent(studentRepository);

    const { student } = await createStudent.execute({
      name: 'hagleyson',
      birth_date: new Date(),
      cpf: '087.405.434-63',
      rg: '000000000',
      school_education: 'superior completo',
    });

    const list = await findStudent.execute();
    expect(list.student).toHaveLength(1);
    expect(list.student).toEqual([student]);
  });
});
