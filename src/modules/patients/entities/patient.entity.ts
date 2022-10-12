import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'full_name',
    length: 100,
  })
  fullName: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'contact_no',
  })
  contactNo: string;

  @Column({
    name: 'dob',
  })
  dob: Date;

  @Column({
    name: 'address',
  })
  address: string;

  @Column({
    name: 'is_special',
    type: 'boolean',
    default: false,
  })
  isSpecial: boolean;
}
