# Deploy, Explained (beginner-friendly)

A plain-English walk-through of getting MySGBaby live, with every tool and command defined. Companion to `DEPLOY.md` (the quick version).

## What is `npm`?
`npm` = **Node Package Manager**. It comes bundled inside Node.js (install Node → you get npm automatically). It does two things:
1. **Downloads the code libraries your site needs** (Next.js, React, Tailwind…), which are listed in `package.json`.
2. **Runs the project's tasks** — `dev`, `build`, `start` — via `npm run <task>`.

Think of npm as your project's **app-store + task-runner**.

## Terms in plain English
| Term | What it is |
|---|---|
| Terminal / command line | The text window for typing commands. Mac: **Terminal**. Windows: **PowerShell** / **Windows Terminal**. |
| Node.js | Runs JavaScript on your computer (not just the browser). Required to build the site. Get the **LTS** build from nodejs.org. |
| npm | Comes with Node. Installs dependencies + runs tasks. |
| `package.json` | The project's "recipe card": dependencies + runnable scripts. |
| `node_modules` | Folder npm fills with downloaded libraries. Large; never uploaded (Git ignores it). |
| Git | Tracks code changes on your machine. |
| GitHub | Website that stores your code online; hosts pull from here. |
| repo | Your project folder, tracked by Git. |
| `localhost:3000` | Your computer as a private test server — only you see it. |
| Environment variables | Settings/secrets kept outside the code (e.g., an analytics ID). |
| DNS | The internet "phone book" pointing your domain at the host. |

## What each command does
- `cd path/to/mysgbaby` — move the terminal **into** the project folder.
- `npm install` — download all dependencies into `node_modules`. Run **once** (again only if dependencies change).
- `npm run dev` — start a **dev server**; preview at `http://localhost:3000`. **Ctrl + C** stops it. Testing only.
- `npm run build` — compile/optimise into the final production build. **Errors surface here** — must pass before deploying.
- `npm run start` — run the built version locally (optional check).
- `git init` / `git add .` / `git commit -m "..."` — track the folder / stage files / save a snapshot.
- `git remote add origin <url>` / `git push` — link to GitHub and upload.

## Steps, in order
1. **Install Node.js** (LTS, from nodejs.org). Gives you Node **and** npm.
2. **Open the terminal**, `cd` into the unzipped `mysgbaby` folder.
3. `npm install` — wait for dependencies to download.
4. `npm run dev` — open `localhost:3000`, check it works, Ctrl+C to stop.
5. `npm run build` — confirm a clean build; fix anything flagged.
6. **Push to GitHub** — create an account + empty repo, run the git commands.
7. **Connect Vercel or Cloudflare** — sign in with GitHub, import the repo, deploy → live URL.
8. **Add your domain** — buy it, point DNS as the host instructs.

## Two common beginner trip-ups
- Run `npm install` **once**, not before every command.
- `npm run dev` keeps running until you press **Ctrl + C** — that's normal, not frozen.
