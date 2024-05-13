import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { BlogService } from './blog/blog.service';
import { BlogController } from './blog/blog.controller';
import { Blog, BlogSchema } from './blog/blog.schema';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: ".env"}),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}])
  ],
  controllers: [AppController, UserController, BlogController],
  providers: [AppService, UserService, BlogService],
})
export class AppModule {}
