import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupplierService } from 'src/features/supplier/supplier.service';

// interface EnvironmentVariables {
//   host: string;
//   pass: string;
// }

@Injectable()
export class TestService {
  titolo: string = '';
  message: string = '';

  constructor(
    private configService: ConfigService,
    private supplierService: SupplierService,
  ) {
    this.getWholeEnv();
  }

  getWholeEnv() {
    // const environment =
    //   this.configService.get<EnvironmentVariables>('environment');
    console.log(
      'environment is: ' + this.configService.get<string>('http.host'),
    );
    this.titolo = this.supplierService.data.options!.titolo;
    this.message = this.supplierService.data.message;
    console.log('Provider value is: ' + this.titolo + ' ' + this.message);
  }
}
