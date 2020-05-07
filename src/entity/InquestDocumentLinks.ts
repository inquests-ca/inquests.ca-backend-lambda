import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { DocumentSource } from './DocumentSource';
import { InquestDocument } from './InquestDocument';

@Entity('inquestDocumentLinks')
export class InquestDocumentLinks extends BaseEntity {
  @Column('int', { primary: true, unsigned: true })
  inquestDocumentId: number;

  @Column('char', { primary: true, length: 100 })
  documentSourceId: string;

  @Column('varchar', { name: 'link', length: 1000 })
  link: string;

  @ManyToOne(() => DocumentSource)
  @JoinColumn({ name: 'documentSourceId', referencedColumnName: 'documentSourceId' })
  documentSource: DocumentSource;

  @ManyToOne(
    () => InquestDocument,
    inquestDocument => inquestDocument.inquestDocumentLinks
  )
  @JoinColumn({ name: 'inquestDocumentId', referencedColumnName: 'inquestDocumentId' })
  inquestDocument: InquestDocument;
}
