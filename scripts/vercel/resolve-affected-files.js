/**
 * This script determines which apps need to be re-deployed
 * based on the changed files since the last push to master.
 */
const path = require("path");
const { minimatch } = require("minimatch");
const { execSync } = require("child_process");

/** list of changed files since the last push to main */
const changedFiles = execSync(`git diff --name-only origin/master...HEAD`, {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

/**
 * Generate a mapping of app names to their file patterns.
 * output: { [appName]: ['path/to/file/**', ...], ... }
 * e.g. { docs: ['apps/docs/**', etc], main: ['apps/main/**', etc] }
 */
const watchPathsRaw = execSync(
  `node ${path.join(__dirname, "generate-watch-paths.js")}`,
  {
    encoding: "utf8",
  },
);
const watchPaths = JSON.parse(watchPathsRaw);
/**
 * Gives an array of apps that have to be re-deployed
 * structure: { "include": ["docs", "main" ] }
 */
const changedApps = Object.entries(watchPaths).reduce(
  (acc, [app, dependencies]) => {
    /** Check if the file path matches any of the watch paths */
    const matchFound = changedFiles.reduce((result, changedFilePath) => {
      const pathIsEnlisted = dependencies.some((d) =>
        minimatch(changedFilePath, d),
      );
      if (pathIsEnlisted) {
        return true;
      }

      return result;
    }, false);

    if (matchFound) {
      acc.include.push(app);
    }

    return acc;
  },
  { include: [] },
);

console.log(JSON.stringify(changedApps, null, 2));
