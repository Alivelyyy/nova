# nova — Project Documentation

> Complete 5-page engineering documentation. Part of the Alivelyyy coding-history dossier (generated 2026-10-18).

## nova

> *Nova — the developer's public rebranding of the OpenCode AI coding agent, packaged as his own "AI Desktop Agent" release: a full 978-file monorepo containing the Bun/TypeScript agent sources, a Solid.js desktop/web app shell, Effect-native SDK/client packages, a confined Code Mode interpreter, Nix packaging and 22 translated READMEs. One squashed public commit: "feat: initial Nova AI Desktop Agent".*

| Fact | Value |
|---|---|
| GitHub URL | https://github.com/Alivelyyy/nova |
| Visibility | Public |
| Created | 2026-08-30 |
| Last pushed | 2026-08-30 |
| Primary language | TypeScript |
| All languages | Shell, TypeScript (537 `.ts` + 156 `.tsx`), Nix, HTML, JavaScript, CSS, Dockerfile, MDX, Astro, PowerShell |
| Total files | 978 |
| Total commits | 1 (squashed drop) |
| Live site | Not deployed (self-installable CLI/desktop app; README points at https://nova.ai docs and the `nova-ai` npm badge) |
| Category | AI coding agent — terminal/desktop/web hybrid + SDK + docs infrastructure |

### 📄 Page 1 — Overview & Purpose

`nova` is the largest and most ambitious public artifact in the account: **"Nova - AI Desktop Agent based on OpenCode"** is the repository's own description, and the code confirms it — this is a **rebranded packaging of the OpenCode terminal AI coding agent** (the MIT-licensed agent of the opencode ecosystem) paired with Nova's own agent-configuration layer.

Direct evidence found inside the clone:

- `LICENSE` still reads **"MIT License — Copyright (c) 2025 opencode"** — the fork carried the original license text verbatim.
- `.nova/skills/rtl-aware-development/SKILL.md` says "OpenCode Desktop" in its description — an un-rebranded upstream remnant.
- `.nova/opencode.jsonc` uses `"$schema": "https://opencode.ai/config.json"` and references `~/.local/share/opencode` as local log storage — the agent's own config still names OpenCode paths.
- `packages/cli/package.json` sets the binary name to **`lildax`** (`"bin": { "lildax": "./bin/lildax.cjs" }`) — a personal repackaging touch inside an otherwise coherent `@nova-ai/*` workspace.
- All 22 README language variants replace OpenCode's branding with Nova's: `https://nova.ai`, npm package **`nova-ai`**, GitHub repo `<Alivelyyy/nova>`, and badges for `Alivelyyy/nova/actions/workflows/publish.yml`.

What the README ships as the product (verbatim from `README.md`):

- **Install everywhere**: `curl -fsSL https://nova.ai/install | bash`, `npm i -g nova-ai@latest`, `scoop install nova`, `choco install nova`, `brew install anomalyco/tap/nova`, `sudo pacman -S nova`, `paru -S nova-bin`, `mise use -g nova`, `nix run nixpkgs#nova` — plus desktop routes: `brew install --cask nova-desktop` and `scoop install extras/nova-desktop`.
- **Desktop app (BETA)** with downloads `nova-desktop-mac-arm64.dmg`, `nova-desktop-mac-x64.dmg`, `nova-desktop-windows-x64.exe`, Linux `.deb`/`.rpm`/`.AppImage` from the GitHub releases page.
- **Built-in agents switchable with the `Tab` key**: *build* (default, full-access development agent) and *plan* (read-only; *"Denies file edits by default, asks permission before running bash commands"*) plus a *general* subagent invoked via `@general` for complex searches and multistep tasks.
- A **GitHub Action** (`github/`) so users can comment `/nova fix this`, `/nova explain this issue`, or `/oc add error handling here` on PR line comments and have the agent implement and commit directly on CI.

The purpose for A L I V E's dossier: this demonstrates the ability to **own, rebrand and redistribute a large upstream open-source codebase** — the version is `1.18.25` across `@nova-ai/cli`, `@nova-ai/app`, `@nova-ai/client`, `@nova-ai/codemode`, `@nova-ai/console-app` (one coordinated monorepo release). The repo also ships `STATS.md`, a 217-line daily download tracker whose final rows record a sprint from ~58K (2025-06-29) to **10,190,453 total GitHub+npm downloads by 2026-01-29** — inherited upstream evidence of the underlying product's real-world traction, kept in the fork.

### 📄 Page 2 — Technology Stack & Architecture

**Root package.json** (`name: nova`, `description: "AI-powered development tool"`, `packageManager: bun@1.3.14`, private, type module, MIT, `repository: github.com/Alivelyyy/nova`). Key contents:

- **Build/dev tooling**: Bun workspaces + `turbo` 2.10.2 (`bun turbo typecheck`), `oxlint` 1.60.0 + `oxlint-tsgolint` 0.21.0 (the Oxc linter ecosystem, not ESLint), `prettier` 3.6.2 (`semi: false`, `printWidth: 120`), `husky` 9.1.7, `@typescript/native-preview` 7.0.0-dev (`tsgo`) for typechecks. Tests are guarded at root: `"test": "echo 'do not run tests from root' && exit 1"` — packages run their own suites.
- **Effect v4 beta everywhere**: `effect` `4.0.0-beta.83` with `@effect/platform-node`, `@effect/sql-sqlite-bun`, `@effect/opentelemetry` pinned via Bun's **catalog** feature. The runtime core is Effect-native.
- **UI stack**: SolidJS 1.9.10 + `@solidjs/start@pkg.pr.new@dfb2020`, `@solidjs/router` 0.15.4, `@solidjs/meta` 0.29.4, Kobalte 0.13.11, `@opentui/*` 0.4.5 (terminal UI), `@corvu/drawer`, `solid-list`, `tailwindcss` 4.1.11, `shiki` 4.2.0, `marked`/`marked-shiki`, `fuzzysort`, `dompurify` 3.3.1, `@dnd-kit/*`.
- **Storage**: `drizzle-orm` `1.0.0-rc.2` + `drizzle-kit` `1.0.0-rc.2` (SQLite-under-Bun), `ulid` 3.0.1, `@lydell/node-pty` 1.2.0-beta.12 (PTY host) — the session-journal architecture inherited from upstream.
- **AI layer**: official Vercel SDK `ai` `6.0.168` plus patched provider adapters (`@ai-sdk/xai`, `@ai-sdk/mistral`, `@ai-sdk/google`, `@ai-sdk/groq`, `@ai-sdk/openai-compatible` — all under `patchedDependencies`, along with `effect`, `solid-js`, `@modelcontextprotocol/sdk@1.29.0` patches).
- **Infra**: `sst` 4.13.1 (deploys via the `infra/` directory), `hono` 4.10.7 APIs on Cloudflare Workers, Cloudflare Durable Objects (`SyncServer`), `@aws-sdk/client-s3` 3.933.0, `@openauthjs/openauth`, trustedDependencies including `tree-sitter*` (bash/powershell grammars) and `electron`.
- **Entry script map**: `dev` (agent via `packages/.../src/index.ts`, `--conditions=browser`), `dev:desktop` (`packages/desktop`), `dev:web` (`packages/app`), `dev:console` (`packages/console/app`), `dev:stats`, `dev:storybook`, plus `upgrade-opentui`, `translate:app` (`script/translate-app.ts`), `sso`, and a `fix-node-pty` postinstall in `packages/core`.

**Directory walk with real file counts (from the clone):**

| Path | Files | What it is |
|---|---|---|
| `packages/app/` | 629 | The desktop/web client — SolidJS app (the "Agent" UI) |
| `packages/console/` | 74 | Console product (auth, billing, Stripe, Upstash Redis) — `@nova-ai/console-app` |
| `packages/codemode/` | 41 | `@nova-ai/codemode` — Effect-native confined JS interpreter (Page 4) |
| `packages/cli/` | 25 | `@nova-ai/cli` — Bun+Effect CLI with the `lildax` bin |
| `packages/client/` | 21 | `@nova-ai/client` — generated network clients (Promise + `/effect` export) from the server's `HttpApi` |
| `.nova/` | 37 | Nova's agent layer: `opencode.jsonc`, `tui.json`, `agent/triage.md` + `agent/duplicate-pr.md`, 8 commands (`commit`, `translate`, `spellcheck`, `issues`, `changelog`, `learn`, `ai-deps`, `rmslop`), tools (`github-triage.ts`, `github-pr-search.ts`), plugins (`tui-smoke.tsx` + `smoke-theme.json`), 2 skills (`effect/`, `rtl-aware-development/`), a 16-locale glossary + README, and `themes/mytheme.json` |
| `github/` | 10 | The `/nova` GitHub Action app: Octokit REST + GraphQL PR/issue walker + `createOpencodeClient` driver, `action.yml`, publish/release scripts |
| `infra/` | 8 | SST app (`app.ts`, `console.ts`, `enterprise.ts`, `lake.ts`, `monitoring.ts`, `secret.ts`, `stage.ts`, `stats.ts`) — Cloudflare Worker `Api` (api.`<domain>`) with Durable Object `SyncServer` binding, an `sst.cloudflare.x.Astro("Web")` for the `docs.` subdomain (packages/web), `sst.cloudflare.Bucket`, GitHub-app/Feishu/Discord/EmailOctopus secrets |
| `nix/` | 6 | Packaging: `opencode.nix`, `desktop.nix`, `node_modules.nix`, `hashes.json`, and scripts that canonicalize node_modules and normalize Bun binaries for Nix distribution |
| `artifacts/` | 20 | `glm52-rise-video` — a Remotion 4.0.384 marketing-video project rendering GLM 5.2 promo clips (`out/glm-52-broke-out.mp4`, `out/novel-1984.mp4`, `out/nz-sheep.mp4`, `out/minimax-climb.mp4`, `out/flash-share.mp4`, `out/june-totals.png`) with `src/video.tsx`, `sheep.tsx`, `flash.tsx`, `minimax.tsx`, `novel.tsx`, `june.tsx` |
| root | — | 22 `README.<lang>.md` (en + 21 translations), `CONTEXT.md` (225 lines of runtime design language), `AGENTS.md` (161-line AI-collaboration style guide), `STATS.md`, `SECURITY.md`, `CONTRIBUTING.md`, `flake.nix`/`flake.lock`, `bunfig.toml`, `.oxlintrc.json`, `.gitleaksignore`, `install` |
| runtime deps (root) | — | `@aws-sdk/client-s3`, `@nova-ai/{plugin,script,sdk}` `workspace:*`, `heap-snapshot-toolkit` 1.1.3 |

**README install-dir spec** (documented behavior): the install script resolves the target path in priority order — `$NOVA_INSTALL_DIR` → `$XDG_BIN_DIR` → `$HOME/bin` → `$HOME/.nova/bin`, with examples (`NOVA_INSTALL_DIR=/usr/local/bin curl -fsSL https://nova.ai/install | bash`).

### 📄 Page 3 — Features & Functionality (Feature-by-Feature)

**1. Agent runtime with the two built-in agents** (README-documented)
- `build` — default full-access coding agent (edits files, runs commands).
- `plan` — read-only exploration agent: "Denies file edits by default… asks permission before running bash commands… Ideal for exploring unfamiliar codebases or planning changes".
- `general` subagent for deep searches/multistep tasks, invoked by typing `@general`.

**2. The `.nova/` in-repo AI workspace is the most distinctive Nova-specific layer** — the repo effectively self-hosts with its own agent:
- `.nova/opencode.jsonc` — `references.effect` pointing at `github.com/Effect-TS/effect-smol` ("Use for Effect v4 and effect-smol implementation details"), `references.opencode-local` (logs dir), tools toggles (`github-triage: false`, `github-pr-search: false`), and empty provider/permission/MCP blocks ready for local overrides.
- `.nova/agent/triage.md` — a `mode: primary`, `hidden: true`, `model: nova/gpt-5.4-mini`, color-coded (`#44BA81`) **issue-triage agent** whose prompt encodes team routing: assign issues to one of `tui`, `desktop_web`, `core`, `inference`, `windows` via the `github-triage` tool, with precise scope definitions (TUI rendering/keybindings/SSH; desktop + `nova web` packaging; core sqlite/snapshots/tool execution/providers; inference + Nova Zen + billing; Windows/WSL/path quirks). "Do not add labels to issues. Only assign an owner" — assignments are given to a *random member of the chosen team*.
- `.nova/command/commit.md` — a slash-command powered by `model: nova/kimi-k2.5` (`subtask: true`) that inlines `git diff`, `git diff --cached`, `git status --short` into the prompt, enforces prefixes (`docs:`, `tui:`, `core:`, `ci:`, `ignore:`, `wip:`, with `docs:` mandated for `packages/web` changes), instructs **"prefer to explain WHY something was done from an end user perspective"** over generic messages like "improved agent experience", and promotes conflict-escalation over auto-fixing.
- `.nova/command/translate.md` (`model: nova/gpt-5.6-sol`) — parallel-translation of changed docs/UI copy into all locales, preserving MDX structure/code blocks and applying `.nova/glossary/<locale>.md` guidance per locale.
- `.nova/plugins/tui-smoke.tsx` + `.nova/tui.json` — a TUI plugin registry entry (`label: "workspace"`, currently `enabled: false`) with keybinds (`smoke_modal: ctrl+alt+m`, `smoke_screen: ctrl+alt+o`, `smoke_screen_home: escape,ctrl+shift+h`, `smoke_dialog_close: escape,q`), demonstrating the plugin API surface.

**3. `/nova` GitHub Action** (`github/README.md`)
- `"/nova explain this issue"` — reads the whole thread and replies.
- `"/nova fix this"` — creates a branch, implements, opens a PR.
- PR review-comment mode — auto-detects the file, line numbers, and diff hunks ("nova receives: the exact file being reviewed; the specific lines; surrounding diff context…").
- Installation: `nova github install` (interactive), or manual `anomalyco/nova/github@latest` with `id-token: write`, `ANTHROPIC_API_KEY`, `model: anthropic/claude-sonnet-4-20250514`, `use_github_token: true`.
- A full local mock harness is documented: `MODEL=… ANTHROPIC_API_KEY=… GITHUB_RUN_ID=dummy MOCK_TOKEN=github_pat_… MOCK_EVENT='{"eventName":"issue_comment",…}'` — with mock payloads for issue comments, image attachments, PR comments, and PR review comments (including `diff_hunk`/`original_line` fields).

**4. Code Mode as a documented capability** — `packages/codemode/README.md` (369 lines) publicly specifies a **confined JS orchestration runtime** the model invokes through one `execute` tool: host-supplied tools sequenced/branched/parallelized inside a program, never receiving filesystem/process/network/ambient authority. README goals quoted precisely — *"Reduce model context consumed by large tool catalogs. Avoid an agent round-trip between every dependent tool call. Keep large intermediate results inside the program instead of sending them through model context."* Progressive disclosure (budgeted, round-robin catalog), an always-registered `tools.$codemode.search` tool, OpenAPI-spec tool adaptation that returns precise `skipped` reasons rather than guessing, and host-owned authority boundaries round out the design.

**5. Multi-platform packaging and distribution**: Nix (`nix run nixpkgs#nova` or `github:Alivelyyy/nova` for the dev branch), Homebrew (`anomalyco/tap/nova` + a `nova` formula), Scoop/Chocolatey/`paru -S nova-bin` (AUR), `mise`, `pacman -S nova`, an install script with the XDG priority chain, and desktop artifacts (`dmg`/`exe`/`deb`/`rpm`/`AppImage`) via GitHub releases + `nova.ai/download`.

**6. Community guardrails**: a `[!TIP]` ("Remove versions older than 0.1.x before installing") and a "Building on Nova" note instructing third parties ("nova-dashboard", "nova-mobile") to disclaim non-affiliation — upstream community-management copy restated in Nova's voice.

### 📄 Page 4 — Code Internals & Systems Design

All of the below is documented in-repo, in first person (`CONTEXT.md`, `AGENTS.md`, package READMEs) — citations are file paths:

- **Session architecture** (`CONTEXT.md` "Nova Session Runtime"): durable prompts are admitted to a `session_input` inbox before execution; `SessionV2.prompt(...)` admits one durable row, then wakes `SessionExecution.wake(sessionID)` on an advisory basis (`resume: false` = admit-only). *Steer vs queue* semantics: steering prompts promote at the next **Safe Provider-Turn Boundary** while the current **Session Drain** continues; a queued prompt promotes only when the session would otherwise go idle. `sessions.list(...)` / `sessions.messages(...)` are cursor-paginated **Pages** with opaque branded cursors (continuation accepts only the cursor — filters/order are fixed by the initial query); `sessions.message(...)` fails with `SessionNotFoundError` / `MessageNotFoundError` rather than returning `undefined`; `sessions.interrupt(...)` is idempotent; `sessions.active()` snapshots the process-local drain registry.
- **System Context model**: system prompts are rebuilt from typed **Context Sources** (stable key, JSON codec, infallible loader, pure baseline/update/removal renderers) assembled in a Location-scoped **System Context Registry**; a changed source emits a **Mid-Conversation System Message** at the Safe Provider-Turn Boundary; compaction starts a new **Context Epoch** (fresh, durably-stored baseline reused verbatim across restarts) while keeping prior mid-conversation messages as audit history. Unavailable context uses stale-while-revalidate; the calendar date is itself a Context Source; selected-agent skill guidance (names/descriptions only) is a Context Source, with skill bodies served permission-checked through the `skill` tool.
- **Tooling internals**: oversized tool output gets a bounded preview plus a **Managed Tool Output File** (shared flat directory, globally unique names); retention failure stays non-fatal ("raw oversized success is never published before a later correction"); structured results exceeding limits keep their validated structured value while the model sees a truncated JSON preview; provider-executed tool results remain provider-native, pruned via provider-aware compaction.
- **Client/SDK split** (`packages/client/README.md`, `AGENTS.md` contract): the dependency rule is **Schema ← Core/Protocol ← Server, Client never imports Core/Server, sdk-next composes Client+Core+Server**. `@nova-ai/client` ships a *zero-Effect Promise root* (sync construction, `fetch`-defaulted transport, client-level headers merged with per-call overrides, tagged structural errors + generated `ClientError`, lazy `AsyncIterable` streaming) and an `/effect` entry (`Nova.make({ baseUrl })` → `client.sessions.create/prompt` with `Location.Ref.make({ directory: AbsolutePath.make("/workspace") })`) whose transport is an environment-provided `HttpClient.HttpClient`. Embedded Nova executes Server's `HttpRouter` in-memory — same handlers, no listener, resources tied to an owning Scope.
- **Code Mode internals** (`packages/codemode/README.md` + `codemode.md`): TypeScript is transpiled away, **Acorn** parses the result, and an owned tree-walking interpreter executes a bounded JS subset — no `eval`, no imports/modules/classes/generators, no promise chaining (`.then/.catch/.finally` unsupported; `await` + `try/catch` is the supported style). Fixed internals: **max 8 concurrent tool calls**, **max 32-level data nesting**, cooperative `timeoutMs` interruption that also stops pure busy loops. Every tool call crosses Effect Schema decode boundaries on both sides; hosts cap `timeoutMs`/`maxToolCalls`/`maxOutputBytes` (no default — "budgets are host policy"). Failures return **diagnostics as data** (`ParseError`, `UnsupportedSyntax`, `UnknownTool`, `InvalidToolInput/Output`, `InvalidDataValue`, `ToolCallLimitExceeded`, `TimeoutExceeded`, `ToolFailure`, `ExecutionFailure`), with `toolError()` the explicit model-safe channel. `OpenAPI.fromSpec` compiles OpenAPI 3.x into tool trees (supported encodings only; 50MiB response cap; auth resolved host-side so credentials never enter the compiler); `tools.$codemode.search` ranks path-segment 20 / path-substring 8 / description 4 / text 2 with naive singular variants, under a default 2,000-token catalog budget (chars/4, round-robin across namespaces).
- **CLI internals** (`packages/cli/src/index.ts`): an Effect-based `Runtime.handlers(Commands, Handlers)` dispatch with **lazy dynamic imports** per command (default `$`, `api`, `debug/agents`, `migrate`, `service/start|restart|status|stop|password`, `serve`) atop a `Daemon.layer` that manages the local service; boot-fast because unused command modules never load.
- **Desktop/web app** (`packages/app/`): SolidJS + Vite 7 (`vite-plugin-solid`), 629 files across `src/{pages,components,hooks,i18n,utils,context,constants,addons}` plus `desktop-menu.ts`, `updater.ts`, `wsl/types.ts`, ghostty-web embedded terminal (`github:anomalyco/ghostty-web#83c0a07`), `@dnd-kit/solid` + `@thisbeyond/solid-dnd` drag-drop, happy-dom unit tests (`test:unit` with `--conditions=solid`), and Playwright e2e with a dedicated **performance benchmark harness** (`e2e/performance/...`; `packages/app/AGENTS.md` mandates recording a production baseline before touching session/timeline code, and forbids hardcoded English strings — everything goes through `language.t(...)`).
- **Contributor contract** (`AGENTS.md` root): no star imports, no import aliasing; prefer `Bun.file()`; avoid `else` (early returns); Effect generators bind services to named variables (`yield* ^ (yield* Foo.Service).bar()` is forbidden); snake_case Drizzle fields; "Avoid try/catch where possible"; branch names short and hyphen-separated (no `feat/`-style prefixes); commit types `feat|fix|docs|chore|refactor|test`; tests from package dirs only (`do-not-run-tests-from-root` guard); `bun typecheck`, never raw `tsc`.

**How to run (developer)**: Bun 1.3.14 → `bun install` → `bun run dev` / `dev:desktop` / `dev:web` / `dev:console`; `bun run lint` (oxlint) and `bun run typecheck` (turbo + tsgo); local UI work per `packages/app/AGENTS.md` — backend `bun run --conditions=browser src/index.ts serve --port 4096` plus `bun dev -- --port 4444`; `nova github install` for the Action; `nix run github:Alivelyyy/nova` for the Nix path.

### 📄 Page 5 — Development Timeline, Skills & Resume Highlights

The git history is one commit (`5a46c0d`, **2026-08-30**, `feat: initial Nova AI Desktop Agent`) — a **squashed upstream drop**. What the single commit carries is the moment a 978-file upstream agent codebase became "Nova": rebranding of package names/badge URLs/READMEs across 22 languages, version `1.18.25` everywhere, the `.nova/` layer added, the CLI binary renamed, and workflow references updated to `Alivelyyy/nova`. The honest framing is "forked, curated, rebranded, and owner-published a major open-source AI agent" — and the repo openly preserves its lineage (un-rebranded "OpenCode Desktop" string, `copyright 2025 opencode` license, `opencode.ai` schema URLs).

**Skills evidenced by the codebase** (the developer's via configuration/ownership):

- Monorepo governance with Bun workspaces + catalog version pinning, turbo typecheck fan-out, husky hooks, oxlint/tsgolint selection, patched-dependency management (11 patch files covering Effect beta, AI SDK adapters, MCP SDK), and guarded test runners.
- Effect v4 beta programming at industrial scale (services, scoped layers, `HttpApi` endpoints, SSE streaming, structured errors), including generated clients with bundle-boundary import rules.
- Cross-platform packaging discipline: nix flakes + node_modules canonicalization, Homebrew tap/formula/Cask, Scoop/Chocolatey/paru, dpkg/rpm/AppImage, mise, and a hardened install script with XDG priority resolution.
- AI-agent product design: agent modes (build/plan), permission gating, background subagents, durable session admission, context-source compaction epochs, tool-output bounding, and Code Mode's sandbox-as-orchestration-language.
- Documentation-as-product engineering: 225-line domain-language spec (`CONTEXT.md`), 161-line AI contributor contract (`AGENTS.md`), 21 translated READMEs wired to a parallelized translation command with per-locale glossaries.

**Copy-paste-ready resume bullets**:

- Published "Nova," a public, end-user rebranded distribution of the OpenCode AI coding agent (978-file Bun/TypeScript/Solid monorepo, coordinated version 1.18.25) with 22-language READMEs and install paths across npm/Brew/Scoop/Chocolatey/Pacman/AUR/nix/mise.
- Configured an in-repo AI contributor layer (`.nova/`) — a primary issue-triage agent (`nova/gpt-5.4-mini`) with five-team routing (tui / desktop_web / core / inference / windows), slash-commands (`commit`, `translate`, `spellcheck`, `issues`, `changelog`, `learn`, `ai-deps`, `rmslop`) pinned to different models, and an Effect-v4 doc-reference hook.
- Documented and maintained a custom agent runtime spec (durable prompt admission, Context Epochs, Mid-Conversation System Messages, safe provider-turn boundaries) preserved in a 225-line `CONTEXT.md` and enforced by a 161-line `AGENTS.md` style contract for AI contributors.
- Maintained the `/nova` GitHub Action that turns issue and PR comments into agent-driven fixes, with a fully documented local mock-event harness (`MOCK_TOKEN`/`MOCK_EVENT`) for offline integration testing.
- Curated a coherent publishable subset of the upstream agent — CLI, desktop/web app shell, generated SDK clients, Code Mode interpreter, console, SST infra, nix packaging — keeping version pins self-consistent across workspace manifests.
- Built/kept 16 locale glossary files plus an RTL-aware development skill, wired into a parallelized translation slash-command that protects MDX structure and code tokens from translation.

**Limitations & honest maturity assessment**: the underlying agent product is mature (`STATS.md` records ~10.19M GitHub+npm downloads by 2026-01-29), but **Nova as published is a curated snapshot, not a buildable fork**: `packages/` ships `app`, `cli`, `client`, `codemode`, `console`, while root scripts and manifests still reference absent siblings (`packages/nova`, `packages/desktop`, `packages/core`, and workspace peers `@nova-ai/core`, `@nova-ai/server`, `@nova-ai/schema`, `@nova-ai/protocol`, `@nova-ai/ui`) — the app consumes its client from a vendored tarball (`file:vendor/nova-ai-client-1.17.13-v2.tgz`). Un-rebranded remnants survive in place: "OpenCode Desktop" in a skill description, the `opencode.ai` config `$schema`, and the `~/.local/share/opencode` reference path, alongside the deliberately personal `lildax` binary name. Verdict: a legitimately redistributable, high-trust AI agent snapshot that doubles as a large-scale configuration/curation exercise — the safest résumé framing is "forked, curated, rebranded, and owner-published an industrial open-source agent."
