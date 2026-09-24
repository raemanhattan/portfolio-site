# Portfolio Site

The landing page at `portfolio.manhattanlabs.io`. Lists each project and
reverse-proxies its path to that project's own, independently deployed
frontend — e.g. `/contract-value` proxies to the contract-value-agent
frontend running elsewhere.

Each project keeps its own repo, its own frontend, and its own backend.
This shell owns only the domain and the landing page; it never imports a
project's code directly.

## Adding a project

1. Add an entry to `lib/projects.ts` (name, tagline, stack, `status`).
2. Add a rewrite pair in `next.config.ts` pointing `/<slug>` and
   `/<slug>/:path*` at that project's deployed origin, driven by an env var
   (see `CONTRACT_VALUE_ORIGIN` for the pattern).
3. Set that env var locally (`.env.local`, copy `.env.local.example`) and in
   the shell's production deployment once the project has a real URL.

Projects with `status: "in-progress"` show on the landing page but aren't
linked or rewritten yet.

## Local development

Run this app and the project frontends on different ports so they can
coexist. This shell defaults to port 3000; contract-value-agent's frontend
is configured to run on 3001 (see its `package.json`).

```bash
npm install
npm run dev
```
