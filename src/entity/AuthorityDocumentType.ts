import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { AuthorityDocument } from './AuthorityDocument';

@Index('documentType_UNIQUE', ['authorityDocumentTypeId'], { unique: true })
@Entity('authorityDocumentType', { schema: 'inquestsca' })
export class AuthorityDocumentType extends BaseEntity {
  @Column('char', {
    primary: true,
    name: 'authorityDocumentTypeId',
    length: 100,
  })
  authorityDocumentTypeId: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => AuthorityDocument,
    authorityDocument => authorityDocument.authorityDocumentType
  )
  authorityDocuments: AuthorityDocument[];
}
