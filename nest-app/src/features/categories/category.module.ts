import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileModule } from '../file/file.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierCategoryEntity } from './entity/supplier-category.entity';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SupplierCategoryEntity]),
    FileModule,
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
