import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    const newTodo = this.todoRepository.create({
      ...createTodoDto,
      createdAt: new Date(),
    });
    return await this.todoRepository.save(newTodo);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with Id ${id} is not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    todo.title = updateTodoDto.title;
    todo.isDone = updateTodoDto.isDone;
    todo.updatedAt = new Date();
    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    // softDelete
    todo.deletedAt = new Date();
    return await this.todoRepository.save(todo);
  }
}
