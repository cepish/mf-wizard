module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-mf`
  extends: ["mf"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
