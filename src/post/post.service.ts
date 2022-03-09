import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';
import { Model } from 'mongoose';
import { getpostFilter, updatingPost } from './dto/getpost.dto';
import { addPost } from './dto/addpost.dto';

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
    };
  }

  async addpost(addingpost: addPost) {
    const { title, description } = addingpost;

    const post = new this.PostData({
      title,
      description,
    });

    const use = await post.save();

    return {
      id: use.id,
      title: use.title,
      description: use.description,
      date: use.date,
    };
  }

  async updatepost(id: string, updatingpost: updatingPost) {
    const post = await this.findpost(id);

    const { title, description } = updatingpost;

    if (title) post.title = title;
    if (description) post.description = description;

    await post.save();
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      date: post.date,
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

  async deleteuser(id: string) {
    await this.findpost(id);
    const result = await this.PostData.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException(`ID ${id} is not found`);
    return 'Deletion Successful';
  }
}
