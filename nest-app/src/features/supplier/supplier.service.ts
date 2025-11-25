import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class SupplierService {
  data: {
    message: string;
    options:
      | {
          titolo: string;
        }
      | undefined;
  } = { message: '', options: { titolo: '' } };

  constructor(
    @Inject('TEST_DATA')
    private testData: { message: string; options: { titolo: string } },
  ) {
    this.data = {
      message: testData.message,
      options: { titolo: testData.options.titolo },
    };
  }
}
