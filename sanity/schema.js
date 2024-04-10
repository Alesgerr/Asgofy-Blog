import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { post } from "./schemaTypes/post";
import { author } from "./schemaTypes/author";
import { metaTags } from "./schemaTypes/metaTags";
import tags from "./schemaTypes/tags";
import user from "./schemaTypes/user";

export const schema = {
  types: [post, tags, author, user, metaTags, category, blockContent],
};
