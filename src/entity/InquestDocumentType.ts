import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { InquestDocument } from './InquestDocument';

@Index('documentType_UNIQUE', ['inquestDocumentTypeId'], { unique: true })
@Entity('inquestDocumentType', { schema: 'inquestsca' })
export class InquestDocumentType extends BaseEntity {
  @Column('char', { primary: true, name: 'inquestDocumentTypeId', length: 100 })
  inquestDocumentTypeId: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => InquestDocument,
    inquestDocument => inquestDocument.inquestDocumentType
  )
  inquestDocuments: InquestDocument[];
}
