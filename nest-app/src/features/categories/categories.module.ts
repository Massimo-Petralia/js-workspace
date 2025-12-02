import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileModule } from '../file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, FileModule],
  providers: [CategoriesService],
})
export class CategoriesModule {}
