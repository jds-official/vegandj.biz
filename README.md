# vegandj.biz

Portfolio site for **Grand Format**, a vegan vinyl wedding DJ serving the Hudson Valley, NY.
A visitor lands on a short reel, learns what's offered, and books through an embedded contact form.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Statically generated and hosted on Vercel's free tier.

## Quick start

Requires Node 20.9 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
```

| Command          | What it does                         |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Dev server with Turbopack            |
| `npm run check`  | ESLint + TypeScript + Prettier check |
| `npm run build`  | Production build                     |
| `npm run format` | Auto-format with Prettier            |

## Editing content

All copy, links and the homepage reel live in [`src/content/site.ts`](src/content/site.ts).
To publish the reel, upload it to YouTube and paste its video ID into `reelVideoId`.
Guidance on what the reel should be: [docs/video-reel-brief.md](docs/video-reel-brief.md).

## Documentation

| Doc                                                  | Purpose                                        |
| ---------------------------------------------------- | ---------------------------------------------- |
| [CLAUDE.md](CLAUDE.md)                               | Project context and rules for AI-assisted work |
| [docs/ROADMAP.md](docs/ROADMAP.md)                   | What's done, next, and later                   |
| [docs/deployment.md](docs/deployment.md)             | Vercel setup and free-tier notes               |
| [docs/video-reel-brief.md](docs/video-reel-brief.md) | Brief for the homepage sizzler reel            |
| [docs/adr/](docs/adr/)                               | Architecture decision records                  |

## How this repo is developed

Development is done in pairs with Claude Code. The workflow is deliberately documented so it's repeatable:
`CLAUDE.md` carries standing context and conventions, ADRs capture the _why_ behind choices (so they
aren't re-debated), the roadmap tracks intent, shared permissions live in `.claude/settings.json`,
and CI gates every PR on lint, types, formatting and a production build.
