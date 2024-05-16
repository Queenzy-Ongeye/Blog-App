import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.dto';
import { UpdateBlogDto } from './dtos/update.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async create(@Body() body: CreateBlogDto, @Req() req) {
        try {
            const createResponse = await this.blogService.create({
                ...body, 
                userId:req.user?.userId
            });
            return createResponse;
        } catch (err) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post("update")
    async update(@Body() body: UpdateBlogDto) {
        try {
            return await this.blogService.update(body);
        } catch (err) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get("post/:id")
    async getOne(@Param('id') id: string) {
        try {
            return await this.blogService.getOne(id);
        } catch (err) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.NOT_FOUND
            )
        }
    }

    @Get("all")
    async getAll() {
        try {
            return await this.blogService.getAll();
        } catch (err) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.NOT_FOUND
            )
        }
    }

    @Delete("delete/:id")
    async delete(@Param('id') id: string) {
        try{
            return await this.blogService.deleteOne(id);
        } catch (err){
            throw new HttpException(
                'Something went wrong',
                HttpStatus.NO_CONTENT
            )
        } 
    }
}
