const path = require("path");

const reset = "\x1b[0m";
const bright = "\x1b[1m";
const fgGreen = "\x1b[32m";
const bgRed = "\x1b[41m";

const { SCOPES_LIST, SCOPE_NEXT, FRONT_DIR_NAME } = require("./config");
const { initNext } = require("./next/init");
/**
 * Only front or server are allowed as a scope param
 * @param {string} scope - scope, e.g. "front"
 * @returns boolean
 */
const scopeValid = (scope) => SCOPES_LIST.includes(scope);
/**
 * Allow strings only for project names
 * @param {string} name - new project name
 * @returns boolean
 */
const nameValid = (name) => !/[^a-zA-Z]/.test(name);
/**
 * Initialize a new project by it's scope and name
 * @param {*} scope - scope, e.g. "front"
 * @param {*} name - new project name
 * @returns
 */
function strategies(scope, name) {
  /**
   * All front-end projects are stored into apps dir
   * {project root dir}/apps
   */
  const frontEndAppsRootDir = path.resolve(
    __dirname,
    "..",
    "..",
    FRONT_DIR_NAME,
  );

  const config = {
    [SCOPE_NEXT]: {
      init: () => initNext(name, frontEndAppsRootDir),
    },
  };

  return config[scope].init(name);
}
/**
 * Init a new project - Next.js microfrontend, new packages microfrontend, or server
 */
function init() {
  try {
    const [scope, name] = process.argv.slice(2);

    if (!scopeValid(scope)) {
      throw new Error(
        `Invalid scope provided: "${scope}". Allowed scopes: ${scopes.map((s) => `"${s}"`).join(",")}. Try ${example}`,
      );
    }
    if (!name) {
      throw new Error(`Argument "name" missed. Try ${example}`);
    }
    if (!nameValid(name)) {
      throw new Error(
        `Invalid name provided: "${name}". Only strings are allowed. Try ${example}`,
      );
    }

    strategies(scope, name);
    console.log(
      `${bright}${fgGreen}✔ Success! A new '${name}' project has been created. ${reset}`,
    );
  } catch (e) {
    console.log(`${bgRed}${bright} ERROR ${reset} Something went wrong.`);
  }
}

init();
