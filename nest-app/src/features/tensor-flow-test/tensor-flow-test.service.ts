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

    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 100, activation: 'relu', inputShape: [10] }),
    );
    model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    const xs = tf.randomNormal([100, 10]);
    const ys = tf.randomNormal([100, 1]);

    void model.fit(xs, ys, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, log) =>
          console.log(`Epoch ${epoch}: loss = ${log?.loss}`),
      },
    });
  }
}
