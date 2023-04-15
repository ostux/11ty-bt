const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const eleventySass = require("@grimlink/eleventy-plugin-sass");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");
const eleventyGoogleFonts = require("eleventy-google-fonts");
const purgeCssPlugin = require("eleventy-plugin-purgecss");
const PostCSSPlugin = require("eleventy-plugin-postcss");
const sass = require("sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyGoogleFonts);

  eleventyConfig.addPlugin(eleventySass, {
    sass,
    outputPath: "css",
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  // Image plugin
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // Set global default options
    formats: ["avif", "webp", "jpeg"],
    urlPath: "/img/",

    // Notably `outputDir` is resolved automatically
    // to the project output directory

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });
  // <eleventy-image src="cat.jpg" alt="photo of my tabby cat"></eleventy-image>

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addPlugin(purgeCssPlugin, {
      // Optional: Specify the location of your PurgeCSS config
      config: {
        // Content files referencing CSS classes
        content: ["./dist/**/*.html"],

        // CSS files to be purged in-place
        css: ["./dist/**/*.css"],

        safelist: [/show/, /data-bs-*/, /popover-*/],
        dynamicAttributes: [/data-*/, /aria-*/],
      },

      // Optional: Set quiet: true to suppress terminal output
      quiet: false,
    });

    eleventyConfig.addPlugin(PostCSSPlugin);

    eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
  }

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
