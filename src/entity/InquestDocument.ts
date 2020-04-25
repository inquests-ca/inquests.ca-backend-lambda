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

// TODO: why are indexes needed for this table, but no other tables?
@Index('fk_inquestDocumentTypeId_inquestDocuments1_idx', ['inquestDocumentTypeId'], {})
@Index('fk_documentSourceId_inquestDocuments1_idx', ['documentSourceId'], {})
@Index('fk_inquestId_inquestDocuments1', ['inquestId'], {})
@Entity('inquestDocument', { schema: 'inquestsca' })
export class InquestDocument extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  inquestDocumentId: number;

  @Column('int', { unsigned: true })
  inquestId: number;

  @Column('char', { nullable: true, length: 100 })
  inquestDocumentTypeId: string | null;

  @Column('char', { nullable: true, length: 100 })
  documentSourceId: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  name: string | null;

  @Column('date', { nullable: true })
  created: string | null;

  @Column('varchar', { nullable: true, length: 1000 })
  link: string | null;

  @ManyToOne(() => DocumentSource)
  @JoinColumn({ name: 'documentSourceId', referencedColumnName: 'documentSourceId' })
  documentSource: DocumentSource;

  @ManyToOne(() => InquestDocumentType)
  @JoinColumn({ name: 'inquestDocumentTypeId', referencedColumnName: 'inquestDocumentTypeId' })
  inquestDocumentType: InquestDocumentType;

  @ManyToOne(
    () => Inquest,
    inquest => inquest.inquestDocuments
  )
  @JoinColumn({ name: 'inquestId', referencedColumnName: 'inquestId' })
  inquest: Inquest;
}
