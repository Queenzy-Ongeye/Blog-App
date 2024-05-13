import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.dto';
import { UpdateBlogDto } from './dtos/update.dto';
@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }
    
    @Post("create")
    async create(@Body() body: CreateBlogDto){
        return await this.blogService.create(body);
    }

    @Post("update")
    async update(@Body() body:UpdateBlogDto){
        return await this.blogService.update(body);
    }

    @Get("post/:id")
    async getOne(@Param('id') id: string){
        return await this.blogService.getOne(id);
    }

    @Get("all")
    async getAll(){
        return await this.blogService.getAll();
    }

    @Delete("delete/:id")
    async delete(@Param('id') id: string){
        return await this.blogService.deleteOne(id);
    }
}
