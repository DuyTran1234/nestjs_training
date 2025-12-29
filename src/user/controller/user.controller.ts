import { Body, Controller, Get, HttpCode, Param, Query } from "@nestjs/common";
import { CreateUserRequestDto } from "../dto/request/create-user-dto.request";
import { UserValidationPipe } from "../validation/user.validation";

@Controller('user')
export class UserController {
    @Get('get')
    async getUser(@Body(new UserValidationPipe()) createUserRequestDto: CreateUserRequestDto): Promise<string> {
        console.log(createUserRequestDto);
        return "test get all user";
    }
}