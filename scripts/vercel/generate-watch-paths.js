/**
 * This script generates a mapping of workspace dependencies for each application
 * in the monorepo. It reads the package.json files of each app and its dependencies,
 * and outputs a JSON object that maps each app to its workspace dependencies.
 *
 * This script is used in vercel-deploy.yml file.
 *
 * This script is used to deploy vercel applications.
 *
 * usage:
 * node scripts/vercel/generate-watch-paths.js > watch-paths.json
 */
const fs = require("fs");
const path = require("path");

const rootDir = (segment) => path.join(__dirname, "..", "..", segment);

const appsDir = rootDir("apps");
const packagesDir = rootDir("packages");
/**
 * Get workspace dependencies per ./apps application
 *
 * @param {string} appPath - e.g. "apps/main"
 * @returns Array<string>, e.g. ['@mf/components', ...]
 */
function getWorkspaceDeps(appPath) {
  const packageJsonPath = path.join(appPath, "package.json");

  if (!fs.existsSync(packageJsonPath)) return [];

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const workspaceDeps = Object.entries(deps)
    .filter(([, packageVersion]) => packageVersion.startsWith("workspace:"))
    .map(([workspacePackageName]) => workspacePackageName);

  return workspaceDeps;
}
/**
 * Match packages' paths with workspace dependencies;
 * dependency name: '@mf/components';
 * package path: 'mf-components';
 *
 * @param {string} app - e.g. "main"
 * @param {Array<string>} workspaceDependencies - e.g.['@mf/components', ...]
 *
 * @returns Array<string>, e.g. [`packages/mf-components/**`]
 */
function resolvePaths(app, workspaceDependencies) {
  const dictionaty = workspaceDependencies.reduce(
    (acc, wd) => ({ ...acc, [wd]: true }),
    {},
  );

  const packages = fs.readdirSync(packagesDir);

  return packages.reduce((acc, packagePath) => {
    const packageJsonPath = path.join(packagesDir, packagePath, "package.json");

    if (!fs.existsSync(packageJsonPath)) return acc;

    const { name: packageName } = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf8"),
    );

    if (!dictionaty[packageName]) return acc;

    return [...acc, `packages/${packagePath}/**`];
  }, []);
}

function generateWatchMap() {
  const apps = fs
    .readdirSync(appsDir)
    .filter((dir) => fs.existsSync(path.join(appsDir, dir, "package.json")));

  /** apps, e.g. ["main", "docs"] */
  const map = apps.reduce((acc, app) => {
    const workspaceDependencies = getWorkspaceDeps(path.join(appsDir, app));

    acc[app] = resolvePaths(app, workspaceDependencies);
    acc[app].push(`apps/${app}/**`); // Include app's own files

    return acc;
  }, {});

  return map;
}

console.log(JSON.stringify(generateWatchMap(), null, 2));
