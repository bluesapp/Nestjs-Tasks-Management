import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

	constructor(private tasksSerivice: TasksService) { }

	@Get()
	getTasks(
		@Query(ValidationPipe) filterDto: GetTaskFilterDto,
		@GetUser() user: User
	): Promise<Task[]> {
		return this.tasksSerivice.getTasks(filterDto, user);
	}

	@Get('/:id')
	getTaskById(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() user: User
	): Promise<Task> {
		return this.tasksSerivice.getTaskById(id, user)
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(
		@Body() createTaskDto: CreateTaskDto,
		@GetUser() user: User
	): Promise<Task> {
		return this.tasksSerivice.createTask(createTaskDto, user);
	}

	@Delete('/:id')
	deleteTask(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() user: User
	): Promise<void> {
		return this.tasksSerivice.deleteTask(id, user)
	}

	@Patch('/:id/status')
	updateStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', TaskStatusValidationPipe) status: TaskStatus,
		@GetUser() user: User
	): Promise<Task> {
		return this.tasksSerivice.updateTaskStatus(id, status, user)
	}

}
