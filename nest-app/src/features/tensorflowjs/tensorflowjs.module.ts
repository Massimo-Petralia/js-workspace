import { Module } from '@nestjs/common';
import { TfService } from './tensorflowjs.service';

@Module({
  providers: [TfService],
  exports: [TfService],
})
export class TensorflowjsModule {}
