import { Controller, Get } from '@nestjs/common';
import { Greeting } from 'shared';

@Controller('test')
export class TestController {
  @Get('hello')
  getHello() {
    const greeting: Greeting = { message: 'ciao dal backend Nestjs !' };
    return greeting;
  }

  @Get('cat')
  getMyCat() {
    const mycat = { message: 'ciao sono i gatto arancino !' };
    return mycat;
  }
}
