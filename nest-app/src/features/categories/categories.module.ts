import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileModule } from '../file/file.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Category]), FileModule],
  providers: [CategoriesService],
})
export class CategoriesModule {}
