import { randomUUID } from 'crypto';
import { Replace } from 'src/shared/helpers/Replace';

export interface CourseProps {
  name: string;
  content: string;
  period: string;
  teacher_name: string;
  createdAt?: Date;
}

export class Course {
  private _id: number;
  private props: CourseProps;
  constructor(props: Replace<CourseProps, { createdAt?: Date }>, id?: number) {
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
    this._id = id;
  }
  public set id(_id: number) {
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
  public set content(content: string) {
    this.props.content = content;
  }
  public get content() {
    return this.props.content;
  }
  public set period(period: string) {
    this.props.period = period;
  }
  public get period() {
    return this.props.period;
  }
  public set teacher_name(teacher_name: string) {
    this.props.teacher_name = teacher_name;
  }
  public get teacher_name() {
    return this.props.teacher_name;
  }
  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
