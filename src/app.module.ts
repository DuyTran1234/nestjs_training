import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development'],
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
            entities: [],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { };