import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassEntity {
  @Column()
  @ApiProperty()
  name: string;
}
