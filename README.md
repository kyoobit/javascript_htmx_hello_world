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
```shell
✔ How would you like to use ESLint? problems
✔ What type of modules does your project use? esm
✔ Which framework does your project use? none
✔ Does your project use TypeScript? typescript
✔ Where does your code run? browser
✔ Would you like to install them now? Yes
✔ Which package manager do you want to use? npm
```
```shell
vi package.json
+ "lint": "eslint 'src/**/*.{css,html,ts,tsx}'",
```
```shell
bun run lint
```




## Add a formatter
https://prettier.io
```shell
npm install -D prettier
```
```shell
vi .prettierrc
{
  "arrowParens": "avoid",
  "bracketSpacing": false,
  "singleQuote": true,
  "trailingComma": "none"
}
```
```shell
vi package.json
+ "format": "prettier --write 'src/**/*.{css,html,ts,tsx}'",
```
```shell
bun run format
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
```shell
vi package.json
+ "dev": "bun run --watch src/server.tsx",
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