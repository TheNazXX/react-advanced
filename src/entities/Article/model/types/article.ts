export enum ArticleBlockType {
  CODE = "CODE",
  IMAGE = "IMAG",
  TEXT = "TEXT",
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  title: string;
  text: string[];
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  src: string;
  title: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  code: string;
}

export type ArticleBlock =
  | ArticleImageBlock
  | ArticleTextBlock
  | ArticleCodeBlock;

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  views: number;
  createAt: string;
  type: ArticleType[];
  blocks: ArticleBlockType[];
}

export enum ArticleType {
  IT = "IT",
  COURSE = "Course",
}
