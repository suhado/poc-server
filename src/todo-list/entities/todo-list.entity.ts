import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo-list')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}
