import { makeCourse } from '@test/factories/course-factory';
import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';

import { CreateStudent } from './create-students';
import { ListStudent } from './list-students';
import { DeleteStudents } from './delete-students';
import { StudentNotFound } from './erros/student-not-found';

describe('Delete student use cases', () => {
  const studentRepository = new InMemoryStudentRepository();
  const deleteStudent = new DeleteStudents(studentRepository);
  it('should be able to delete student', async () => {
    const createStudent = new CreateStudent(studentRepository);
    const listStudent = new ListStudent(studentRepository);

    const { student } = await createStudent.execute({
      birth_date: new Date(),
      cpf: '',
      name: '',
      rg: '',
      school_education: '',
    });

    await deleteStudent.execute({ id: student.id });
    const { students: list } = await listStudent.execute({
      page: 1,
      perPage: 0,
    });

    expect(list).toHaveLength(0);
  });
  it('should not be able to delete the student', async () => {
    expect(async () => {
      return deleteStudent.execute({ id: 8 });
    }).rejects.toThrow(StudentNotFound);
  });
});
