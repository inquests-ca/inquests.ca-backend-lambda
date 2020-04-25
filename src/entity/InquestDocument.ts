import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { DocumentSource } from './DocumentSource';
import { InquestDocumentType } from './InquestDocumentType';
import { Inquest } from './Inquest';

@Index('inquestDocumentId_UNIQUE', ['inquestDocumentId'], { unique: true })
@Index('fk_inquestDocumentTypeId_inquestDocuments1_idx', ['inquestDocumentTypeId'], {})
@Index('fk_documentSourceId_inquestDocuments1_idx', ['documentSourceId'], {})
@Index('fk_inquestId_inquestDocuments1', ['inquestId'], {})
@Entity('inquestDocument', { schema: 'inquestsca' })
export class InquestDocument extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'inquestDocumentId',
    unsigned: true,
  })
  inquestDocumentId: number;

  @Column('int', { name: 'inquestId', unsigned: true })
  inquestId: number;

  @Column('char', {
    name: 'inquestDocumentTypeId',
    nullable: true,
    comment: 'E.g., verdict, ruling, exhibit.\nCan be NULL if document falls into misc. category.',
    length: 100,
  })
  inquestDocumentTypeId: string | null;

  @Column('char', { name: 'documentSourceId', nullable: true, length: 100 })
  documentSourceId: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('date', { name: 'created', nullable: true })
  created: string | null;

  @Column('varchar', { name: 'link', nullable: true, length: 1000 })
  link: string | null;

  @ManyToOne(
    () => DocumentSource,
    documentSource => documentSource.inquestDocuments,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'documentSourceId', referencedColumnName: 'documentSourceId' }])
  documentSource: DocumentSource;

  @ManyToOne(
    () => InquestDocumentType,
    inquestDocumentType => inquestDocumentType.inquestDocuments,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    {
      name: 'inquestDocumentTypeId',
      referencedColumnName: 'inquestDocumentTypeId',
    },
  ])
  inquestDocumentType: InquestDocumentType;

  @ManyToOne(
    () => Inquest,
    inquest => inquest.inquestDocuments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'inquestId', referencedColumnName: 'inquestId' }])
  inquest: Inquest;
}
