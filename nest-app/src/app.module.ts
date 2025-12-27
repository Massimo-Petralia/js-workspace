import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CategoryModule } from './features/categories/category.module';
import { Category } from './features/categories/category.entity';
import { TensorFlowTest } from './features/tensor-flow-test/tensor-flow-service';
import { TfService } from './src/features/tensorflowjs/tf/tf.service';
import { TfService } from './features/tensorflowjs/tf/tf.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Category],
      migrations: [],
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, TensorFlowTest, TfService],
})
export class AppModule {}
