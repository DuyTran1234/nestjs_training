import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserRequestDto } from "../dto/request/create-user-dto.request";
import { UpdateUserRequestDto } from "../dto/request/update-user-dto.request";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<User> {
        const exists = await this.userRepository.existsBy({ username: createUserRequestDto.username });
        if (exists) {
            throw new BadRequestException('username existsed');
        }
        const user = this.userRepository.create(createUserRequestDto);
        return await this.userRepository.save(user);
    }

    async findAll(page: number, limit: number): Promise<User[]> {
        const users = await this.userRepository.createQueryBuilder('users')
            .limit(limit).offset(limit * page).getMany();
        return users;
    }

    async getUserById(userId: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id: userId });
    }

    async removeUserById(userId: number) {
        const rs = await this.userRepository.delete(userId);
        if (rs.affected == 0) {
            throw new NotFoundException('not found');
        }
    }

    async updateUserById(userId: number, updateUserRequestDto: UpdateUserRequestDto): Promise<User> {
        const user = await this.userRepository.preload({
            id: userId,
            ...updateUserRequestDto
        });
        if (!user) {
            throw new BadRequestException("not found user");
        }
        return await this.userRepository.save(user);
    }
}
