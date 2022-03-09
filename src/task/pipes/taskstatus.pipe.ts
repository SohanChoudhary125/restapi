import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValid implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isvalidsatus(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }

    return value;
  }

  private isvalidsatus(status: any) {
    const id = this.allowedStatus.indexOf(status);
    return id != -1;
  }
}
