import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';

@Injectable()
export class TfService implements OnModuleInit {
  private readyPromise: Promise<void>;
  async onModuleInit() {
    this.readyPromise = (async () => {
      await tf.setBackend('wasm');
      await tf.ready();
      console.log('Tensorflowjs backend is: ', tf.getBackend());
    })();
    await this.readyPromise;
  }

  ready() {
    return this.readyPromise;
  }

  get(): typeof import('@tensorflow/tfjs') {
    return tf;
  }
}
