import { Student } from './../../application/entities/student';
import { StudentRepository } from './../../application/repositories/student-repository';

export class InMemoryStudentRepository implements StudentRepository {
  public student: Student[] = [];

  async create(student: Student): Promise<void> {
    this.student.push(student);
  }
  async findById(student_id: string): Promise<Student> {
    const student = this.student.find((item) => item.id === student_id);
    if (!student) {
      return null;
    }
    return student;
  }
  async findAll(): Promise<Student[]> {
    return this.student;
  }
  async update(id: string, student: Student): Promise<void> {
    const updatedStudent = this.student.map((item) => {
      if (item.id === id) {
        return student;
      }
      return item;
    });
    this.student = updatedStudent;
  }
  async delete(student_id: string): Promise<void> {
    const filteredStudent = this.student.filter(
      (item) => item.id !== student_id,
    );
    this.student = filteredStudent;
  }
}
