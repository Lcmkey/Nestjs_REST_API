import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ID } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { hashPassword } from '../utils/password.util';
import { User, UserDocument } from '../schemas/user.schema';
import {
  UserSortingField,
  PaginationInput,
  CreateUserInput,
  UpdateUserInput,
  FindUsersInput,
  FindUserInput,
  ChangePasswordInput,
} from '../typeDefs/user.dto';

import { filterInputFormatter } from './../common/mongo-query-filter.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(user);
    const existedUser = await this.userModel.findOne({
      email: createdUser.email,
    });

    const {password, passwordCfm} = user;

    if (existedUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if(password != passwordCfm){
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }

    createdUser.password = await hashPassword(createdUser.password);

    await createdUser.save();

    return createdUser;
  }

  async totalUsers(input?: FindUsersInput | undefined): Promise<number> {
    let conditions = {};

    if (input) {
      conditions = filterInputFormatter(input);
    }

    Object.keys(conditions).map((key) => {
      if (key === 'hobbies') {
        if (conditions[key]['$in']) {
          conditions[key]['$in'].map(
            (v: (string | number) | Types.ObjectId) =>
              (v = Types.ObjectId(v as string)),
          );
        } else {
          conditions[key]['$eq'] = Types.ObjectId(
            conditions[key]['$eq'],
          ) as Types.ObjectId;
        }
      }
    });

    const totalUsers = await this.userModel.find(conditions).count().exec();

    return totalUsers;
  }

  async findAll(
    input?: FindUsersInput | undefined,
    sort?: UserSortingField | undefined,
    pagination?: PaginationInput | undefined,
  ): Promise<User[]> {
    const { limit, skip } = pagination || { limit: 0, skip: 0 };
    const { field, dire } = sort || { field: 'createdAt', dire: -1 };
    let conditions = {};

    if (input) {
      conditions = filterInputFormatter(input);
    }

    Object.keys(conditions).map((key) => {
      if (key === 'hobbies') {
        if (conditions[key]['$in']) {
          conditions[key]['$in'].map(
            (v: (string | number) | Types.ObjectId) =>
              (v = Types.ObjectId(v as string)),
          );
        } else {
          conditions[key]['$eq'] = Types.ObjectId(
            conditions[key]['$eq'],
          ) as Types.ObjectId;
        }
      }
    });

    const users = await this.userModel
      .find(conditions)
      .sort([[field, dire]])
      .limit(limit)
      .skip(skip)
      .exec();

    return users;
  }

  async findOne(input: FindUserInput): Promise<User> {
    let conditions = {};

    if (input) {
      conditions = filterInputFormatter(input);
    }
    const user = await this.userModel.findOne(conditions);

    return user;
  }

  async update(id: String, user: UpdateUserInput): Promise<User> {
    const userInstance = await this.userModel.findOneAndUpdate(
      id,
      { ...user, updatedAt: new Date() },
      { new: true },
    );

    return userInstance;
  }

  async changePassword(input: ChangePasswordInput): Promise<User> {
    const { email, password, passwordCfm } = input;

    if (password != passwordCfm) {
      throw new HttpException('Password not Match', HttpStatus.BAD_REQUEST);
    }

    const encryptedPw = await hashPassword(password);

    const userInstance = await this.userModel.findOneAndUpdate(
      { email },
      { password: encryptedPw, updatedAt: new Date() },
      { new: true },
    );

    return userInstance;
  }
}
