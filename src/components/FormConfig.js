import {
  unsplashImageAsset,
  unsplashAssetSource,
} from "sanity-plugin-asset-source-unsplash";

export const formConfig = {
  image: {
    assetSources: (previousAssetSources, { schema }) => {
      if (schema.name === "movie-image") {
        // Remove Unsplash from movie-image types
        return previousAssetSources.filter(
          (assetSource) => assetSource !== unsplashAssetSource
        );
      }
      return previousAssetSources;
    },
  },
};
