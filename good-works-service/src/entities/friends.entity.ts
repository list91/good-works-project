import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Users } from './users.entity';

@Entity()
@Unique("UQ_user_friend", ["user_id", "friend_id"])
export class Friends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  friend_tag: string;

  @Column({ name: "user_id" })
  user_id: number;

  @Column({ name: "friend_id" })
  friend_id: number;

  @ManyToOne(() => Users, user => user.id, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Users, user => user.id, { cascade: true, eager: true })
  @JoinColumn({ name: 'friend_id' })
  friend: Users;
}
