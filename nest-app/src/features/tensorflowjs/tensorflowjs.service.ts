import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';
import * as use from '@tensorflow-models/universal-sentence-encoder';

@Injectable()
export class TfService implements OnModuleInit {
  private readyPromise: Promise<void>;
  private model: use.UniversalSentenceEncoder;
  async onModuleInit() {
    this.readyPromise = (async () => {
      await tf.setBackend('cpu');
      await tf.ready();
      this.model = await use.load({
        modelUrl: 'http://127.0.0.1:8080/model.json',
      });
    })();
    await this.readyPromise;
  }

  ready() {
    return this.readyPromise;
  }

  get(): typeof import('@tensorflow/tfjs') {
    return tf;
  }

  async embed(texts: string[]): Promise<number[][]> {
    const embeddings = await this.model.embed(texts);
    const array = await embeddings.array();
    embeddings.dispose();
    return array;
  }

  cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}
