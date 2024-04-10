/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\pages\dashboard\[[...index]].jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
// import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels'
export default defineConfig({
  basePath: "/dashboard",
  projectId,
  dataset,

  // Add and edit the content schema in the './sanity/schema' folder
  schema,

  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),

    // pexelsImageAsset({
    //   API_KEY: "nnszTPrU8LhldcL89fnCkLRdtkHoJp7x7u4gYpvstBmlWNJJxgZi2UaO",
    //   results: {
    //     perPage: 50,
    //   },
    //   searchTimeout: 1000,
    // }),
  ],
});
