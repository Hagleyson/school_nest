import { Student } from '@application/entities/student';
import { StudentRepository } from '@application/repositories/student-repository';
import { AddingOrRemovingStudentCourseRequest } from 'src/shared/interfaces';

export class InMemoryStudentRepository implements StudentRepository {
  public student: Student[] = [];

  async create(student: Student): Promise<void> {
    student.id = this.student.length + 1;
    this.student.push(student);
  }
  async findById(student_id: number): Promise<Student> {
    const student = this.student.find((item) => item.id === student_id);

    if (!student) {
      return null;
    }
    return student;
  }
  async findAll(): Promise<Student[]> {
    return this.student;
  }
  async update(id: number, student: Student): Promise<void> {
    const updatedStudent = this.student.map((item) => {
      if (item.id === id) {
        student.id = id;
        return student;
      }
      return item;
    });
    this.student = updatedStudent;
  }
  async delete(student_id: number): Promise<void> {
    const filteredStudent = this.student.filter(
      (item) => item.id !== student_id,
    );
    this.student = filteredStudent;
  }

  async addingOrRemovingStudentCourse(
    props: AddingOrRemovingStudentCourseRequest,
  ): Promise<any> {
    console.log(props);
  }
}
