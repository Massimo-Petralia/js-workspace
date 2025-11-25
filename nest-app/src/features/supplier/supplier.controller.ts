import { Controller, Get } from '@nestjs/common';
import { Greeting } from 'shared';

@Controller('api')
export class SupplierController {
  @Get('supplier')
  getSupplier() {
    const greeting: Greeting = { message: 'hello im a supplier !' };
    return greeting;
  }
}
