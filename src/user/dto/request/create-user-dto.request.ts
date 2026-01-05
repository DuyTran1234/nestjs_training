import userZodSchema from "src/zod/user.zod";
import z from "zod/v3";

export const CreateUserRequestDtoSchema = z.object({
    username: userZodSchema.username,
    pwd: userZodSchema.pwd,
    confirmPwd: z.string().min(8).max(30),
    email: userZodSchema.email,
    dob: userZodSchema.dob.optional(),
}).refine((data) => data.pwd == data.confirmPwd, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPwd"]
});

// export type CreateUserRequestDto = z.infer<typeof CreateUserRequestDtoSchema>;
export class CreateUserRequestDto extends (class { } as new () => z.infer<typeof CreateUserRequestDtoSchema>) { }