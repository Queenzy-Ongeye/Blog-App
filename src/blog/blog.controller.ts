import { Body, Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.dto';
@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }
    
    @Post("create")
    async create(@Body() body: CreateBlogDto){
        return await this.blogService.create(body);
    }
}
