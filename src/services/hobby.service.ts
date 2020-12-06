import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Hobby, HobbyDocument } from '../schemas/hobby.schema';
import { CreateHobbyInput } from '../typeDefs/hobby.dto';

@Injectable()
export class HobbyService {
  constructor(@InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>) { }

  async findAll(): Promise<Hobby[]> {
    const hobbies = await this.hobbyModel.find().exec();

    return hobbies;
  }

  async create(hobby: CreateHobbyInput): Promise<Hobby> {
    const createdHobby = new this.hobbyModel(hobby);
    createdHobby.createdAt = new Date();

    const existedHobby = await this.hobbyModel.findOne({name: hobby.name});
    
    if(existedHobby){
      throw new HttpException('Hobby already exists', HttpStatus.BAD_REQUEST);
    }

    await createdHobby.save();

    return createdHobby;
  }

  async delete(id: String): Promise<Hobby | undefined> {
    
    const itemInstance = await this.hobbyModel.findOneAndDelete({_id: id})

    return itemInstance;
  }
}
