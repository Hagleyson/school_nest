import { Course } from './courses';
import { Student } from './student';

describe('Course test', () => {
  it('should be able to create course', () => {
    const course1 = new Course({
      content: 'conteudo',
      name: 'curso',
      period: '10 de abril 2023 até 30 de maio de 2023 ',
      teacher_name: 'Hagleyson',
    });
    const course2 = new Course({
      content: 'conteudo2',
      name: 'curso2',
      period: '10 de abril 2023 até 30 de maio de 2023 ',
      teacher_name: 'Hagleyson',
    });
    const student = new Student({
      birth_date: new Date(),
      cpf: '0000000000',
      course: [course1, course2],
      name: 'hagleyson fernandes',
      rg: '000000000',
      school_education: 'Graduado',
    });

    expect(student).toBeTruthy();
  });
});
