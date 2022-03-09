import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create.dto';
import { gettaskdto } from './dto/get.dto';
import { TaskStatusValid } from './pipes/taskstatus.pipe';

@Controller('task')
export class TaskController {
  constructor(private taskservice: TaskService) {}

  @Get()
  getTask(@Query(ValidationPipe) fillterdto: gettaskdto): Task[] {
    if (Object.keys(fillterdto).length) {
      return this.taskservice.getTaskFilter(fillterdto);
    }
    return this.taskservice.getallTask();
  }

  @Get('/:id')
  getbyId(@Param('id') id: string): Task {
    return this.taskservice.getbyID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createtaskdto: CreateTaskDto): Task {
    return this.taskservice.createTask(createtaskdto);
  }

  @Delete('/:id')
  deletetask(@Param('id') id: string) {
    return this.taskservice.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValid) status: TaskStatus,
  ) {
    return this.taskservice.updatetask(id, status);
  }
}
