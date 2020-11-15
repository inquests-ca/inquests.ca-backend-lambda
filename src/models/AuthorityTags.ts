import { JoinColumn, Entity, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';
import { Authority } from './Authority';

@Entity('authorityTags')
export class AuthorityTags extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  authorityId!: number;

  @PrimaryColumn('varchar', { length: 255 })
  tag!: string;

  @ManyToOne(() => Authority, (authority) => authority.authorityTags)
  @JoinColumn({ name: 'authorityId', referencedColumnName: 'authorityId' })
  authority!: Authority;
}
