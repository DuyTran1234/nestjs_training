import { IsBoolean, IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateUserRequestDto {
    @IsString()
    @Length(5, 15)
    username: string;

    @IsString()
    @Length(5, 15)
    pwd: string;

    @IsInt()
    @Min(0)
    @Max(150)
    age: number;

    @IsString()
    @Length(5, 15)
    fullname: string;

    @IsBoolean()
    gender: boolean;
}