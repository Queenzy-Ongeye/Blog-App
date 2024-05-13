import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dtos/create.dto';
import { UpdateBlogDto } from './dtos/update.dto';
@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private BlogModel: Model<BlogDocument>) { }
    // Creating a blog post
    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = new this.BlogModel(createBlogDto);
        return await blog.save()
    }

    // Updating a specific blog post
    async update(updateBlogDto: UpdateBlogDto): Promise<Blog> {
        return this.BlogModel.findOneAndUpdate(
            { _id: updateBlogDto._id, },
            updateBlogDto.clientPrps,
            { new: true }
        )
    }

    // Getting one blog
    async getOne(id: string): Promise<Blog>{
        return await this.BlogModel.findOne({ _id: id})
    }
    // Getting all blogs
    async getAll(): Promise<Blog[]>{
        return await this.BlogModel.find({})
    }

    // Deleting one blog
    async deleteOne(id: string){
        return this.BlogModel.findOneAndReplace({_id: id})
    }
}
