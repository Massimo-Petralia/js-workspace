import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileModule } from '../file/file.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierCategoryEntity } from './entity/supplier-category.entity';
import { CategoryController } from './category.controller';
import { MarketplaceCategoryEntity } from './entity/marketplace-category.entity';
import { TensorflowjsModule } from '../tensorflowjs/tensorflowjs.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      SupplierCategoryEntity,
      MarketplaceCategoryEntity,
    ]),
    FileModule,
    TensorflowjsModule,
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
