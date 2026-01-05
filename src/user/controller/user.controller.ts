import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipe/validation.pipe";
import { CreateUserRequestDto, CreateUserRequestDtoSchema } from "../dto/request/create-user-dto.request";
import { UpdateUserRequestDto, UpdateUserRequestDtoSchema } from "../dto/request/update-user-dto.request";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('create')
    async getUser(@Body(new ZodValidationPipe(CreateUserRequestDtoSchema)) createUserRequestDto: CreateUserRequestDto): Promise<string> {
        console.log(await this.userService.createUser(createUserRequestDto));
        return "create user done!";
    }

    @Get('find-all')
    async findAllUser(@Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number): Promise<User[]> {
        return await this.userService.findAll(page, limit);
    }

    @Get('get/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        return await this.userService.getUserById(id);
    }

    @Delete('delete/:id')
    async removeUserById(@Param('id', ParseIntPipe) id: number): Promise<string> {
        await this.userService.removeUserById(id);
        return "delete done";
    }

    @Patch('update/:id')
    async updateUserById(@Param('id', ParseIntPipe) id: number,
        @Body(new ZodValidationPipe(UpdateUserRequestDtoSchema)) updateUserRequestDto: UpdateUserRequestDto): Promise<User> {
        return this.userService.updateUserById(id, updateUserRequestDto);
    }
}