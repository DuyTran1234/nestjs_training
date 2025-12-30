import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod/v3";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            if (metadata.metatype) {
                return Object.assign(new (metadata.metatype)(), value);
            }
            return parsedValue;
        } catch (error) {
            throw new BadRequestException(error?.issues[0]);
        }
    }
}