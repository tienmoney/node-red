import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from 'src/auth/dto/createDto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // find user by email
  async findUser(email: string): Promise<UserEntity> {
    // find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  // register user
  async createUsers(createDto: CreateDto) {
    // check if user exists and confirm password
    const { fullName, email, password, confirmPassword } = createDto;
    const checkUser = await this.findUser(email); // check if user exists
    if (checkUser) {
      //throw new Error('User already exists'); // if user exists, throw error
      return 'User already exists';
    } else if (password !== confirmPassword) {
      //throw new Error('Passwords do not match'); // if passwords do not match, throw error
      return 'Passwords do not match';
    }

    // hash password
    // const salt = await bcrypt.genSalt(10); // generate salt
    // const hashedPassword = await bcrypt.hash(password, salt); // hash password

    const newUser = new UserEntity(); // create new user
    newUser.name = fullName; // set name
    newUser.email = email; // set email
    newUser.password = password; // set password
    newUser.isAdmin = false; // set isAdmin to false

    // const createNewUser = this.userRepository.create(createDto); // create new user
    return this.userRepository.save(newUser); // save to database
  }
  // find by email
  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  // find by id
  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  // find all users
  async findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // update user
  async updateUser(id: number, updateDto: CreateDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const { fullName, email, password, confirmPassword } = updateDto;
      if (password !== confirmPassword) {
        //throw new Error('Passwords do not match'); // if passwords do not match, throw error
        return null;
      }
      user.name = fullName;
      user.email = email;
      user.password = password;
      return this.userRepository.save(user);
    }
  }

  // // delete user
  // async deleteUser(id: number): Promise<UserEntity> {
  //   return this.userRepository.delete(id);
  // }

  // check if user is admin
  async isAdmin(id: number): Promise<boolean> {
    return this.userRepository.findOne({ where: { id } }).then((user) => {
      return user.isAdmin;
    });
  }
}
