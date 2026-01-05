import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCategoryEmbeddingEntity } from './entity/test-category-embeddings.entity';
import { EmbeddingTestService } from './embedding-test.service';
import { TensorflowjsModule } from '../tensorflowjs/tensorflowjs.module';

@Module({
  imports: [
    TensorflowjsModule,
    TypeOrmModule.forFeature([TestCategoryEmbeddingEntity]),
  ],
  providers: [EmbeddingTestService],
})
export class EmbeddingTestModule {}
