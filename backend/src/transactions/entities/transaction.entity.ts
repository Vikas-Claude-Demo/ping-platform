import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentRail {
  MPESA = 'MPESA',
  UPI = 'UPI',
  STRIPE = 'STRIPE',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  recipientIdentifier: string; // Phone number, wallet ID, etc.

  @Column({
    type: 'enum',
    enum: PaymentRail,
  })
  destinationRail: PaymentRail;

  @Column('decimal', { precision: 10, scale: 2 })
  amountHomeCurrency: number; // e.g., USD amount

  @Column('decimal', { precision: 10, scale: 2 })
  amountDestinationCurrency: number; // e.g., KES amount

  @Column('decimal', { precision: 10, scale: 4 })
  exchangeRate: number;

  @Column('decimal', { precision: 10, scale: 2 })
  fees: number;

  @Column()
  homeCurrency: string; // e.g. 'USD'

  @Column()
  destinationCurrency: string; // e.g. 'KES'

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  railTransactionId: string; // ID returned by M-Pesa / UPI

  @Column({ nullable: true })
  failureReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
