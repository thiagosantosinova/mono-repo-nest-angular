import { DynamicModule, Module } from '@nestjs/common';
import { LibInovaAuthService } from './lib-inova-auth.service';
import { CustomExceptionFilter } from '../shared/filters';
import { APP_FILTER } from '@nestjs/core';
import { SSOApiService } from '../shared/services/sso-api.service';

@Module({
  exports: [LibInovaAuthService],
  providers: [
    LibInovaAuthService,
    SSOApiService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class LibInovaAuthModule {
  static forRoot(envConfig: Record<string, any>): DynamicModule {
    return {
      module: LibInovaAuthModule,
      providers: [
        {
          provide: 'ENV_CONFIG',
          useValue: envConfig,
        },
      ],
      exports: ['ENV_CONFIG'],
    };
  }
}
