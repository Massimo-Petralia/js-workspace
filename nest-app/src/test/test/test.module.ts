import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { ConfigModule } from '@nestjs/config';
import { SupplierModule } from 'src/features/supplier/supplier.module';
import { FileModule } from 'src/features/file/file.module';

@Module({
  imports: [
    ConfigModule,
    FileModule,
    SupplierModule.forFeature({ titolo: 'SupplierA !' }),
  ],
  providers: [
    {
      provide: 'MY-TOKEN',
      useClass: TestService,
    },
  ],
  controllers: [TestController],
  exports: ['MY-TOKEN', SupplierModule],
})
export class TestModule {}
