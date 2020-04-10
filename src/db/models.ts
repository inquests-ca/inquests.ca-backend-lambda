export interface Authority {
  authorityId: number;
  primary: boolean;
  name: string;
  overview: string;
  synopsis: string;
  quotes: string;
  notes: string;
}

export interface AuthorityCategory {
  authorityCategoryId: string;
  name: string;
  description: string;
}

export interface AuthorityDocuments {
  authorityId: number;
  documentId: number;
  sourceId: string;
  primary: boolean;
}

export interface AuthorityKeyword {
  authorityKeywordId: string;
  authorityCategoryId: string;
  name: string;
  description: string;
}

export interface DeathManner {
  deathMannerId: string;
  name: string;
}

export interface Deceased {
  deceasedId: number;
  inquestId: number;
  inquestTypeId: string;
  deathMannerId: string;
  deathCause: string;
  deathDate: Date;
  lastName: string;
  givenNames: string;
  age: number;
  gender: string;
}

export interface Document {
  documentId: number;
  name: string;
  created: Date;
  documentTypeId: string;
}

export interface DocumentSource {
  documentSourceId: string;
  name: string;
}

export interface DocumentType {
  documentTypeId: string;
  name: string;
  description: string;
}

export interface Inquest {
  inquestId: number;
  jurisdictionId: string;
  primary: boolean;
  name: string;
  synopsis: string;
  presidingOfficer: string;
  start: Date;
  end: Date;
  sittingDays: number;
  exhibits: number;
}

export interface InquestCategory {
  inquestCategoryId: string;
  name: string;
  description: string;
}

export interface InquestKeyword {
  inquestKeywordId: string;
  inquestCategoryId: string;
  name: string;
  description: string;
}

export interface InquestType {
  inquestTypeId: string;
  name: string;
}

export interface Jurisdiction {
  jurisdictionId: string;
  jurisdictionCategoryId: string;
  name: string;
  federal: boolean;
}

export interface JurisdictionCategory {
  jurisdictionCategoryId: string;
  name: string;
}

export interface Source {
  sourceId: string;
  jurisdictionId: string;
  name: string;
  code: string;
  rank: number;
}
