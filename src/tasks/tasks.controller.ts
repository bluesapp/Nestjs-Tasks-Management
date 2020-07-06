import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';


@Controller('tasks')
export class TasksController {

	constructor(private tasksSerivice: TasksService) { }

	@Get()
	getAllTasks(): Task[] {
		return this.tasksSerivice.getAllTasks();
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string	): Task{
		return this.tasksSerivice.getTaskById(id)
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksSerivice.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id:string): void {
		this.tasksSerivice.deleteTask(id)		
	}
	

}
