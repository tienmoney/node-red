import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post(':userId')
  async createTodo(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const addTodo = this.todoService.create(userId, createTodoDto);
    if (addTodo === null) {
      return req.status(409).json({
        status: 409,
        message: 'Todo already exists',
      });
    }
    return addTodo;
  }
  @Get()
  async findAll(@Req() req): Promise<Todo[]> {
    const id = req.user.id;
    console.log(this.todoService.findAllByUserId(id));
    return this.todoService.findAllByUserId(id);
  }
  @Get(':id')
  async findAllByUser(@Param('id', ParseIntPipe) id: number): Promise<Todo[]> {
    return this.todoService.findAllByUserId(id);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() res,
  ) {
    console.log('Put:', res.body);
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async removeTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }
}
