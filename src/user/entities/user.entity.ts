/* eslint-disable prettier/prettier */
import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity extends BaseEntity{
  @ApiProperty({ example: '1', description: 'Id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Kaka', description: 'Tên người dùng' })
  @Column()
  name: string;

  @ApiProperty({ example: '999999999', description: 'Mật khẩu' })
  @Column()
  password: string;

  @ApiProperty({ example: '2@gmail.com', description: 'Email' })
  @Column()
  email: string;

  @ApiProperty({description: 'Admin or User'})
  @Column('boolean', { default: 1 })
  isAdmin: boolean;

  @OneToMany(() => Todo, (todo) => todo.author,{ cascade: true })
  todos: Todo[];

  @BeforeInsert()
  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password || password , salt);
  }
}
