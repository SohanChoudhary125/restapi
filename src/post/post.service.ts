import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';
import { Model } from 'mongoose';
import { getpostFilter, updatingPost } from './dto/getpost.dto';
import { addPost } from './dto/addpost.dto';
import { User } from './../user/user.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private PostData: Model<Post>) {}

  async getallPost() {
    const post = await this.PostData.find().exec();
    return post.map((use) => ({
      id: use.id,
      title: use.title,
      description: use.description,
      date: use.date,
      userid: use.userid,
    }));
  }

  async getbyfilter(fillerpost: getpostFilter) {
    const { search } = fillerpost;

    let post = await this.getallPost();

    if (search) {
      post = post.filter(
        (use) => use.title.includes(search) || use.description.includes(search),
      );
    }

    return post;
  }

  async getbyID(id: string) {
    let post;
    try {
      post = await this.PostData.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`ID ${id} is not found`);
    }

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      date: post.date,
      userid: post.userid,
    };
  }

  async addpost(addingpost: addPost, user: User) {
    const { title, description } = addingpost;

    const post = new this.PostData({
      title,
      description,
      userid: user.id,
    });

    const use = await post.save();

    return {
      id: use.id,
      title: use.title,
      description: use.description,
      date: use.date,
      userid: use.userid,
    };
  }

  async updatepost(id: string, updatingpost: updatingPost, user: User) {
    const post = await this.findpost(id);

    const { title, description } = updatingpost;

    if (title) post.title = title;
    if (description) post.description = description;

    if (!(post.userid === user.id))
      throw new UnauthorizedException('You cannot change this post');

    await post.save();
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      date: post.date,
      userid: post.userid,
    };
  }

  private async findpost(id: string) {
    let post;
    try {
      post = await this.PostData.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`ID ${id} is not found`);
    }

    return post;
  }

  async deleteuser(id: string, user: User) {
    const post = await this.findpost(id);
    if (!(post.userid === user.id))
      throw new UnauthorizedException('You cannot delete this post');
    const result = await this.PostData.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException(`ID ${id} is not found`);
    return 'Deletion Successful';
  }
}
