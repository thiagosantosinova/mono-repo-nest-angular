import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibInovaAuthModule } from '@libs-rast/nest-inova-auth-lib';

@Module({
  imports: [LibInovaAuthModule.forRoot({
    SSO_API_URL: ""
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
