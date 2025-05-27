const fs = require("node:fs");
const path = require("path");
const { TEMPLATE_NAME } = require("../config");

const defaultPort = 3000;
const portRegExp = new RegExp(String(defaultPort), "g");
const templateRegExp = new RegExp(TEMPLATE_NAME, "g");

function copyFileToDistFromTemp(
  fileName,
  projectName,
  dirPath,
  frontEndAppsCount,
) {
  const fileConfigTemp = path.resolve(__dirname, "template", fileName);
  const fileConfigData = fs.readFileSync(fileConfigTemp, "utf-8");
  const fileConfigPath = `${dirPath}/${fileName}`;

  fs.writeFileSync(
    fileConfigPath,
    fileConfigData
      /**
       * Replace template name with a new next.js project name, e.g. PROJECT_NAME -> blog
       */
      .replace(templateRegExp, projectName)
      /**
       * Replace the default 3000 port to the next available one
       */
      .replace(portRegExp, String(defaultPort + frontEndAppsCount)),
  );
}
/**
 * Copy configs, envs, jsons files
 * @param {string} projectName - new project name
 * @param {string} dirPath - new project directory
 * @param {string} frontEndAppsCount - number of all next.js projects
 * the following arg is used to dynamically allocate port for a new project
 */
function copyFilesIntoNextDir(projectName, dirPath, frontEndAppsCount) {
  const templateDist = path.resolve(__dirname, "template");

  fs.readdirSync(templateDist).forEach((fileName) => {
    copyFileToDistFromTemp(fileName, projectName, dirPath, frontEndAppsCount);
  });
}
/**
 * Create 2 new roots files for a new project
 * -layout.tsx
 * -page.tsx
 * @param {string} projectName - new project name
 * @param {string} dirPath - new project directory
 */
function copyNextRootFilesFromTemp(projectName, dirPath) {
  const appDist = path.resolve(__dirname, "app");

  const appDirPath = `${dirPath}/app`;
  const nextAppRootRoutePath = `${dirPath}/app/${projectName}`;

  fs.mkdirSync(appDirPath);
  fs.mkdirSync(nextAppRootRoutePath);

  const indexLayout = fs.readFileSync(`${appDist}/layout.tsx`);
  const indexPage = fs.readFileSync(`${appDist}/page.tsx`);

  fs.writeFileSync(`${appDirPath}/layout.tsx`, indexLayout);
  fs.writeFileSync(`${nextAppRootRoutePath}/page.tsx`, indexPage);
}
/**
 * Initialize a new next mf project
 * @param {string} projectName - new project name
 * @param {string} frontEndAppsRootDir - root dir of all Next apps
 */
function initNext(projectName, frontEndAppsRootDir) {
  /**
   * All front-end projects are stored into apps dir
   * {project root dir}/apps
   * dirPath, e.g. /apps/blog
   */
  const dirPath = path.resolve(frontEndAppsRootDir, projectName);

  try {
    fs.rmdirSync(dirPath, { recursive: true, force: true });
  } catch (e) {
    // do nothing
  }
  /** Create new next project folder, e.g. /apps/blog */
  fs.mkdirSync(dirPath);

  fs.readdir(frontEndAppsRootDir, (error, files) => {
    if (error) {
      throw new Error("Failed to calculate next apps count" + error);
    }
    copyFilesIntoNextDir(projectName, dirPath, files.length);
  });

  copyNextRootFilesFromTemp(projectName, dirPath);
}

module.exports = { initNext };
