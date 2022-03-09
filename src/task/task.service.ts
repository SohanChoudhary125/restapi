import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create.dto';
import { gettaskdto } from './dto/get.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getallTask(): Task[] {
    return this.tasks;
  }

  getTaskFilter(fillerdto: gettaskdto): Task[] {
    const { status, search } = fillerdto;
    let task = this.getallTask();

    if (status) {
      task = this.tasks.filter((tk) => tk.status === status);
    }

    if (search) {
      task = this.tasks.filter(
        (tk) => tk.title.includes(search) || tk.description.includes(search),
      );
    }
    return task;
  }

  getbyID(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException(`ID ${id} not found`);

    return task;
  }

  createTask(createtaskdto: CreateTaskDto): Task {
    const { title, description } = createtaskdto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const tk = this.getbyID(id);
    this.tasks = this.tasks.filter((task) => task.id != tk.id);
    return 'Deletion Sccessful';
  }

  updatetask(id: string, status: TaskStatus) {
    const task = this.getbyID(id);
    task.status = status;
    return task;
  }
}
