import { Course } from './courses';

describe('Course test', () => {
  it('should be able to create course', () => {
    const course = new Course({
      content: 'conteudo',
      name: 'curso',
      period: '10 de abril 2023 até 30 de maio de 2023 ',
      teacher_name: 'Hagleyson',
    });

    expect(course).toBeTruthy();
  });
});
