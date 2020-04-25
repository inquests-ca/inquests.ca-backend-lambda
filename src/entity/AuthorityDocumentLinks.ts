import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { AuthorityDocument } from './AuthorityDocument';
import { DocumentSource } from './DocumentSource';

@Entity('authorityDocumentLinks')
export class AuthorityDocumentLinks extends BaseEntity {
  @Column('int', { primary: true, unsigned: true })
  authorityDocumentId: number;

  @Column('char', { primary: true, length: 100 })
  documentSourceId: string;

  @Column('varchar', { length: 1000 })
  link: string;

  @ManyToOne(
    () => AuthorityDocument,
    authorityDocument => authorityDocument.authorityDocumentLinks
  )
  @JoinColumn({ name: 'authorityDocumentId', referencedColumnName: 'authorityDocumentId' })
  authorityDocument: AuthorityDocument;

  @ManyToOne(() => DocumentSource)
  @JoinColumn({ name: 'documentSourceId', referencedColumnName: 'documentSourceId' })
  documentSource: DocumentSource;
}
