import { type EntityState } from "@reduxjs/toolkit";
import { BlobOptions } from "buffer";
import { type Comment } from "entities/Comment";

export interface ArticleDetailsCommentsSchema
  extends EntityState<Comment, string> {
  isLoading: boolean;
  error?: "";
}
