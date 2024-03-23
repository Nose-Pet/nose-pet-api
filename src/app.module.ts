import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './app/logger/logger.module';
import { HealthModule } from './health/health.module';
import { SentryModule } from './app/sentry/sentry.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './app/interceptors/logging.interceptor';
import { TokenTimeLeftInterceptor } from './app/interceptors/token-time-left.interceptor';
import { AllExceptionFilter } from './app/filters/all-exception.filter';
import { RequestMiddleware } from './app/middlewares/request.middleware';
import { MysqlConfigService } from './app/mysql/mysql-config.service';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { UserPetGroupModule } from './user-pet-group/user-pet-group.module';
import { UserSecretModule } from './user-secret/user-secret.module';
import { PetModule } from './pet/pet.module';
import { PetTypeModule } from './pet-type/pet-type.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [
    RavenModule,
    TypeOrmRootModule,
    LoggerModule,
    HealthModule,
    SentryModule,
    UserModule,
    TokenModule,
    AuthModule,
    UserPetGroupModule,
    UserSecretModule,
    PetModule,
    PetTypeModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useValue: new RavenInterceptor() },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: TokenTimeLeftInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
