import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AnalyticsModule } from './core/analytics/analytics.module';
import { AuthModule } from './core/auth/auth.module';
import { LeadModule } from './core/lead/lead.module';
import { ScriptModule } from './core/script/script.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UserModule,
    LeadModule,
    ScriptModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
