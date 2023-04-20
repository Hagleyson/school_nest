import { Course } from 'src/application/entities/courses';
import { CourseRepository } from 'src/application/repositories/course-repository';

export class InMemoryCourseRepository implements CourseRepository {
  public courses: Course[] = [];

  async create(course: Course): Promise<void> {
    this.courses.push(course);
  }
  async findById(course_id: string): Promise<Course | null> {
    const course = this.courses.find((item) => item.id === course_id);
    if (!course) {
      return null;
    }
    return course;
  }
  async findAll(): Promise<Course[]> {
    return this.courses;
  }
  async update(id: string, course: Course): Promise<void> {
    const updatedCourse = this.courses.map((item) => {
      if (item.id === id) {
        return course;
      }
      return item;
    });
    this.courses = updatedCourse;
  }
  async delete(course_id: string): Promise<void> {
    const filteredCourse = this.courses.filter((item) => item.id !== course_id);
    this.courses = filteredCourse;
  }
}
