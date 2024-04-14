import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { post } from "./schemaTypes/post";
import { author } from "./schemaTypes/author";
import { metaTags } from "./schemaTypes/metaTags";
import tags from "./schemaTypes/tags";
import user from "./schemaTypes/user";
import postComment from "./schemaTypes/postComment";
import { tableSchema } from "./schemaTypes/tableSchema";

export const schema = {
  types: [
    post,
    tags,
    author,
    user,
    tableSchema,
    metaTags,
    category,
    postComment,
    blockContent,
  ],
};
