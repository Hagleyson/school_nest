import { Course } from 'src/application/entities/courses';
import { CourseRepository } from 'src/application/repositories/course-repository';
import { IListAllCorse } from 'src/shared/interfaces/course';
import { IParamsListAllCourse } from 'src/shared/interfaces/course';

export class InMemoryCourseRepository implements CourseRepository {
  public courses: Course[] = [];

  async create(course: Course): Promise<void> {
    course.id = this.courses.length;
    this.courses.push(course);
  }
  async findById(course_id: number): Promise<Course | null> {
    const course = this.courses.find((item) => item.id === course_id);
    if (!course) {
      return null;
    }
    return course;
  }
  async findAll(query?: IParamsListAllCourse): Promise<IListAllCorse> {
    return { meta: { total_pages: 1, current_page: 1 }, courses: this.courses };
  }
  async update(id: number, course: Course): Promise<void> {
    const updatedCourse = this.courses.map((item) => {
      if (item.id === id) {
        return course;
      }
      return item;
    });

    this.courses = updatedCourse;
  }
  async delete(course_id: number): Promise<void> {
    const filteredCourse = this.courses.filter((item) => item.id !== course_id);
    this.courses = filteredCourse;
  }
}
