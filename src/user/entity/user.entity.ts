import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'pwd' })
    pwd: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'dob', type: 'timestamptz', default: new Date() })
    dob: Date;
}