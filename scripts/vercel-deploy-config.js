module.exports = {
  docs: {
    token: process.env.VERCEL_TOKEN_DOCS_APP,
    projectId: process.env.VERCEL_PROJECT_ID_DOCS_APP,
  },
  main: {
    token: process.env.VERCEL_TOKEN_MAIN_APP,
    projectId: process.env.VERCEL_PROJECT_ID_MAIN_APP,
  },
};
