import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('authorityDocumentType')
export class AuthorityDocumentType extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  authorityDocumentTypeId: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string | null;
}
