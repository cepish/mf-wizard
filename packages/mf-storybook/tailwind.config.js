module.exports = {
  presets: [
    require("@vercel/examples-ui/tailwind"),
    require("@mf/design-system/tailwind"),
  ],
  content: [
    // All the packages that might include stories
    "./node_modules/@vercel/examples-ui/**/*.js",
    "./node_modules/@mf/design-system/**/*.js",
    "./node_modules/@mf/pages/**/*.js",
  ],
};
