import { Injectable, OnModuleInit } from '@nestjs/common';
import { TfService } from '../tensorflowjs/tf.service';

@Injectable()
export class TensorFlowTest implements OnModuleInit {
  constructor(private tfService: TfService) {}

  async onModuleInit() {
    await this.tfService.ready();
    this.testTensorFlow();
  }

  testTensorFlow() {
    const tf = this.tfService.get();
    const shape = [2, 2];
    const tensor = tf.tensor([3, 5, 5, 7], shape, 'int32');
    void tensor.array().then((array) => console.log(array));
  }
}
