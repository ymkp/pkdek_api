import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  natDex: number;

  @Column()
  name: string;

  @Column('simple-array')
  types: string[];

  @Column({ nullable: true, default: null })
  spriteDefault: string;

  @Column({ nullable: true, default: null })
  spriteDream: string;

  @Column({ nullable: true, default: null })
  officialArtwork: string;
}
