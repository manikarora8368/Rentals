import { Appartment } from "src/appartments/entities/appartment.entity";
import { Column, Entity , OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    @Column()
    @ApiProperty({example:'John Doe'})
    name: string;
    @Column()
    @ApiProperty({example:'example@gmail.com'})
    email: string;
    @Column()
    @ApiProperty()
    password: string;
    @Column()
    @ApiProperty({example: 'user|realtor|admin'})
    role: string;
    @OneToMany(()=>Appartment,appartment=>appartment.realtor)
    appartments: Appartment[]
}
