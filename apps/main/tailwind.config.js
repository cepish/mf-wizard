module.exports = {
  presets: [
    require("@vercel/examples-ui/tailwind"),
    require("@mf/design-system/tailwind"),
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    // Add the external packages that are using Tailwind CSS
    "../../packages/mf-components/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mf/design-system/dist/**/*.js",
    "./node_modules/@vercel/examples-ui/**/*.js",
  ],
};
