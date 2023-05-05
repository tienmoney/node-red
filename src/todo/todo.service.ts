import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllByUserId(userId: number): Promise<Todo[]> {
    const user = this.userRepository.findOne({
      relations: ['todos'],
      where: { id: userId },
    });
    return user ? (await user).todos : null;
  }

  async getOneTodo(id: number): Promise<Todo> {
    const user = this.todoRepository.findOne({
      relations: ['todo'],
      where: { id: id },
    });
    console.log(user);
    return user ? user : null;
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id: id } });
  }

  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description, media } = createTodoDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.status = createTodoDto.status;
    todo.media = media;
    todo.author = user;
    // check if todo exist
    const todoExist = await this.todoRepository.findOne({
      where: {
        title: title,
        description: description,
        media: media,
      },
    });
    if (todoExist) {
      return null;
    }
    return this.todoRepository.save(todo); // save to database
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { title, description, media } = updateTodoDto;
    return this.todoRepository.update(id, {
      title,
      description,
      status: updateTodoDto.status,
      media: media || null,
    });
  }

  async remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
