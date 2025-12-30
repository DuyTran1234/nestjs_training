import { Body, Controller, Get, HttpCode, Param, Query, UsePipes } from "@nestjs/common";
import { CreateUserRequestDto, CreateUserRequestDtoSchema } from "../dto/request/create-user-dto.request";
import { ZodValidationPipe } from "src/common/pipe/validation.pipe";

@Controller('user')
export class UserController {
    @Get('get')
    @UsePipes(new ZodValidationPipe(CreateUserRequestDtoSchema))
    async getUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<string> {
        console.log(createUserRequestDto);
        console.log(createUserRequestDto instanceof CreateUserRequestDto);
        console.log(process.env.DB_USERNAME);
        return "done!";
    }
}