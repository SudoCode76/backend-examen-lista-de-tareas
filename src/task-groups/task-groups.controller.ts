import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { UpdateTaskGroupDto } from './dto/update-task-group.dto';
import { TaskGroupsService } from './task-groups.service';

@Controller('task-groups')
export class TaskGroupsController {
  constructor(private readonly taskGroupsService: TaskGroupsService) {}

  @Post()
  async create(@Body() createTaskGroupDto: CreateTaskGroupDto) {
    return this.taskGroupsService.create(createTaskGroupDto);
  }

  @Get()
  async findAll() {
    return this.taskGroupsService.findAll();
  }

  @Get(':id/tasks')
  async findTasksByGroup(@Param('id', ParseIntPipe) id: number) {
    return this.taskGroupsService.findTasksByGroup(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskGroupsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskGroupDto: UpdateTaskGroupDto,
  ) {
    return this.taskGroupsService.update(id, updateTaskGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskGroupsService.remove(id);
  }
}
