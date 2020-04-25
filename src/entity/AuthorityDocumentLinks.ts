import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { AuthorityDocument } from './AuthorityDocument';
import { DocumentSource } from './DocumentSource';

@Index('fk_documentSourceId_documentLinks1_idx', ['documentSourceId'], {})
@Entity('authorityDocumentLinks', { schema: 'inquestsca' })
export class AuthorityDocumentLinks extends BaseEntity {
  @Column('int', { primary: true, name: 'authorityDocumentId', unsigned: true })
  authorityDocumentId: number;

  @Column('char', { primary: true, name: 'documentSourceId', length: 100 })
  documentSourceId: string;

  @Column('varchar', { name: 'link', length: 1000 })
  link: string;

  @ManyToOne(
    () => AuthorityDocument,
    authorityDocument => authorityDocument.authorityDocumentLinks,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    {
      name: 'authorityDocumentId',
      referencedColumnName: 'authorityDocumentId',
    },
  ])
  authorityDocument: AuthorityDocument;

  @ManyToOne(
    () => DocumentSource,
    documentSource => documentSource.authorityDocumentLinks,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'documentSourceId', referencedColumnName: 'documentSourceId' }])
  documentSource: DocumentSource;
}
