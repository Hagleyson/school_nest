import { Student } from '../entities/student';

export abstract class StudentRepository {
  abstract create(student: Student): Promise<void>;
  abstract findById(student_id: string): Promise<Student | null>;
  abstract findAll(): Promise<Student[] | null>;
  abstract update(id: string, student: Student): Promise<void>;
  abstract delete(student_id: string): Promise<void>;
}
