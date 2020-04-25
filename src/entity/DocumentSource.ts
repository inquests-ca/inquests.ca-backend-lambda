import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';
import { AuthorityDocumentLinks } from './AuthorityDocumentLinks';
import { InquestDocument } from './InquestDocument';

@Entity('documentSource', { schema: 'inquestsca' })
export class DocumentSource extends BaseEntity {
  @Column('char', { primary: true, name: 'documentSourceId', length: 100 })
  documentSourceId: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('tinyint', {
    name: 'hasPaywall',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  hasPaywall: number | null;

  @OneToMany(
    () => AuthorityDocumentLinks,
    authorityDocumentLinks => authorityDocumentLinks.documentSource
  )
  authorityDocumentLinks: AuthorityDocumentLinks[];

  @OneToMany(
    () => InquestDocument,
    inquestDocument => inquestDocument.documentSource
  )
  inquestDocuments: InquestDocument[];
}
