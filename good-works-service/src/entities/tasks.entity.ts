import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: "master" })
  master: number;

  @ManyToOne(() => Users, user => user.id, { cascade: true })
  @JoinColumn({name:'master'}) 
  user: Users;

}

