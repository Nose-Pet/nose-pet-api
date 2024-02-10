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

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [RavenModule, TypeOrmRootModule, LoggerModule, HealthModule, SentryModule],
  providers: [
    { provide: APP_INTERCEPTOR, useValue: new RavenInterceptor() },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TokenTimeLeftInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
