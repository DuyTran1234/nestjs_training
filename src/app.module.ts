import { Module } from '@nestjs/common';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [],
})
export class AppModule { };