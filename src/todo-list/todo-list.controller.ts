import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoListService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoListService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
