import dayjs from "dayjs";
import z from "zod/v3";

const userSchema = {
    username: z.string()
        .min(6, 'Tối thiểu 6 ký tự').max(30, 'Tối đa 30 ký tự')
        .regex(/^[a-z0-9_]+$/)
        .refine(s => !s.includes("__"), "Không được dùng 2 dấu gạch dưới liên tiếp")
        .refine(s => !s.startsWith("_") && !s.endsWith("_"), "Không được đặt gạch dưới ở đầu hoặc cuối"),

    pwd: z.string().min(8, 'Tối thiểu 8 ký tự').max(30, 'Tối đa 30 ký tự'),

    email: z.string().min(5).max(255).email(),

    dob: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày tháng không đúng định dạng")
        .refine((dateStr: string) => {
            return dayjs(dateStr, 'YYYY-MM-DD', true).isValid();
        }, {
            message: "Ngày tháng không hợp lệ"
        }).transform((val: string) => new Date(val)),
};

export default userSchema;