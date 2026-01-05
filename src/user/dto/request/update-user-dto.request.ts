import userZodSchema from "src/zod/user.zod";
import z from "zod/v3";

export const UpdateUserRequestDtoSchema = z.object({
    username: userZodSchema.username.optional(),
    pwd: userZodSchema.pwd.optional(),
    email: userZodSchema.email.optional(),
    dob: userZodSchema.dob.optional(),
});

export class UpdateUserRequestDto extends (class { } as new () => z.infer<typeof UpdateUserRequestDtoSchema>) { }