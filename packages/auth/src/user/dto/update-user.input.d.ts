import { CreateUserInput } from './create-user.input';
declare const UpdateUserInput_base: import("@nestjs/common").Type<Partial<CreateUserInput>>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
}
export {};
