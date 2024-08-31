# Start Here



## Install Bun
https://bun.sh/docs/installation
```shell
curl -fsSL https://bun.sh/install | bash
```
Run and/or add the bun bits to your `$PATH` variable
```shell
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```
Upgrade as needed
```shell
bun upgrade
```




## Creating a new project with `hono`
```shell
bunx create-hono
```
```shell
Target directory javascript_htmx_hello_world
? Which template do you want to use? bun
? Do you want to install project dependencies? yes
? Which package manager do you want to use? bun
```
```shell
cd app
bun install
```




## Add a linter
https://eslint.org

```shell
npm init @eslint/config
```
```text
✔ How would you like to use ESLint? problems
✔ What type of modules does your project use? esm
✔ Which framework does your project use? none
✔ Does your project use TypeScript? typescript
✔ Where does your code run? browser
✔ Would you like to install them now? Yes
✔ Which package manager do you want to use? npm
```
Add the "lint" JSON in the `package.json` file: 
```json
{
   "scripts": {
    "dev": "bun run --watch src/server.tsx",
+   "lint": "eslint 'src/**/*.{css,html,ts,tsx}'"
   }
}
```
```shell
bun run lint
```




## Add a formatter
https://prettier.io
```shell
npm install -D prettier
```
Add the following JSON to a file named: `.prettierrc`
```json
{
  "arrowParens": "avoid",
  "bracketSpacing": false,
  "singleQuote": true,
  "trailingComma": "none"
}
```
Add the "format" JSON in the `package.json` file: 
```json
{
   "scripts": {
    "dev": "bun run --watch src/server.tsx",
+   "format": "prettier --write 'src/**/*.{css,html,ts,tsx}'",
    "lint": "eslint 'src/**/*.{css,html,ts,tsx}'"
   }
}
```
```shell
bun run format
```




## Add a test framework
https://playwright.dev/docs/intro
```shell
npm init playwright@latest
```
```text
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (y/N) · true
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
```

* `npx playwright test` Runs the end-to-end tests.
* `npx playwright test --ui` Starts the interactive UI mode.
* `npx playwright test --project=chromium` Runs the tests only on Desktop Chrome.
* `npx playwright test example` Runs the tests in a specific file.
* `npx playwright test --debug` Runs the tests in debug mode.
* `npx playwright codegen` Auto generate tests with Codegen.

* `./tests/example.spec.ts` Example end-to-end test
* `./tests-examples/demo-todo-app.spec.ts` Demo Todo App end-to-end tests
* `./playwright.config.ts` Playwright Test configuration

```shell
npm init playwright@latest
```




## Download the latest htmx
https://htmx.org/docs/#installing
```shell
mkdir -p app/public/js && cd app/public/js
curl -L https://unpkg.com/htmx.org@2.0.2 -o htmx.min-v2.0.2.js
ln -svf htmx.min-v2.0.2.js htmx.min.js
```




# Update The Source Code
```shell
rm app/src/index.ts
vi app/src/server.tsx
```
```javascript
import {type Context, Hono} from 'hono';
import {serveStatic} from 'hono/bun';

const app = new Hono();

// Serve static files from the public directory.
app.use('/*', serveStatic({root: './public'}));

app.get('/version', (c: Context) => {
  // Return a Response whose body contains
  // the version of Bun running on the server.
  return c.text(`Hello world! Bun ${Bun.version}`);
});

export default app;
```
Update the "dev" JSON in the `package.json` file: 
```json
{
   "scripts": {
+   "dev": "bun run --watch src/server.tsx",
    "format": "prettier --write 'src/**/*.{css,html,ts,tsx}'",
    "lint": "eslint 'src/**/*.{css,html,ts,tsx}'"
   }
}
```




## Add git version control
```shell
echo "node_modules/" > .gitignore
git init

bun run format
bun run lint

git add .
git commit -m 'initial commit'

git branch -M main
git remote add origin git@github.com:kyoobit/javascript_htmx_hello_world.git
git push -u origin main
```




# Project Structure
```text
javascript_htmx_hello_world
tree -a -I "node_modules|.git"
.
├── .gitignore
├── .prettierrc
├── README.md
├── bun.lockb
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   └── js
│       ├── htmx.min-v2.0.2.js
│       └── htmx.min.js -> htmx.min-v2.0.2.js
├── src
│   └── server.tsx
└── tsconfig.json

4 directories, 12 files
```

* `README.md` contains instructions on running the project
* `package.json` describes project dependencies and defines a script for running the project
* `tsconfig.json` configures the use of TypeScript
* `.gitignore` prevents the node_modules directory from being committed
* `src/server.tsx` implements a Hono HTTP server and defines the “GET /” endpoint




# Run the server
```shell
bun run dev
```