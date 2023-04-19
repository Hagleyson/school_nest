import { randomUUID } from 'crypto';
import { Replace } from 'src/shared/helpers/Replace';
import { Course } from './courses';

export interface StudentProps {
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  course?: Course[];
  birth_date: Date;
  createdAt: Date;
}

export class Student {
  private _id: string;
  private props: StudentProps;

  constructor(props: Replace<StudentProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public set id(_id: string) {
    this._id = _id;
  }
  public get id() {
    return this._id;
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
}
