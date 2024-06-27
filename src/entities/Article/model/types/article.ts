import { type User } from "entities/User";

export enum ArticleBlockType {
  CODE = "CODE",
  IMAGE = "IMAG",
  TEXT = "TEXT",
}

export enum ArticleSortField {
  VIEWS = "views",
  TITLE = "title",
  CREATED = "created",
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export enum ArticlesListView {
  LIST = "LIST",
  TILE = "TILE",
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
  user: User;
  img: string;
  type: ArticleType[];
  blocks: ArticleBlockType[];
}

export enum ArticleType {
  ALL = "all",
  IT = "IT",
  COURSE = "Course",
  LANGUAGE = "Language",
  FRAMEWORK = "Framework",
  AI = "AI",
  DEVOPS = "DevOps",
}
