import { Replace } from 'src/shared/helpers/Replace';
import { Course } from './courses';

export interface StudentProps {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  password?: string;
  school_education: string;
  birth_date: Date;
  created_at?: Date;
  course?: Course[];
}

export class Student {
  private _id: number;
  private props: StudentProps;

  constructor(
    props: Replace<StudentProps, { created_at?: Date }>,
    id?: number,
  ) {
    this.props = {
      ...props,
      course: props.course ?? [],
      created_at: props.created_at ?? new Date(),
    };
    this.id = id;
  }

  public set id(_id: number) {
    this._id = this.id ?? _id;
  }
  public get id() {
    return this._id;
  }

  public get course() {
    return this.props.course;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get name() {
    return this.props.name;
  }
  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }
  public get cpf() {
    return this.props.cpf;
  }
  public set rg(rg: string) {
    this.props.rg = rg;
  }
  public get rg() {
    return this.props.rg;
  }
  public set school_education(school_education: string) {
    this.props.school_education = school_education;
  }
  public get school_education() {
    return this.props.school_education;
  }
  public set birth_date(birth_date: Date) {
    this.props.birth_date = birth_date;
  }
  public get birth_date() {
    return this.props.birth_date;
  }
  public add_course(course: Course) {
    this.props.course.push(course);
  }
  public remove_course(course: Course) {
    this.props.course = this.props.course.filter(
      (current) => current.id !== course.id,
    );
  }
  public get email() {
    return this.props.email;
  }
  public get password() {
    return this.props.password;
  }
}
