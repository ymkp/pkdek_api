import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evolution')
export class Evolution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
