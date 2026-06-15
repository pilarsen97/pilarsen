# Deployment

CI/CD mirrors the `atomizeropt` setup: a self-hosted **GitLab shell runner**
validates and builds on every push, then deploys to **Beget** on `main` by
SSHing in and running `deploy/gitlab-deploy.sh` on the server.

```
push → GitLab CI (runner, tag: shell)
        ├── validate:build   bun install · eslint · vue-tsc + vite build · check dist/
        └── deploy:production (main only)
              └── ssh Beget → cd $DEPLOY_PATH && . deploy/gitlab-deploy.sh
                    git reset --hard origin/main · bun install · vite build → dist/
```

The runner only builds for validation and **triggers** the deploy; the actual
build that gets served is produced on Beget (same model as atomizeropt).

## Why GitLab and not GitHub Actions

The project is mirrored to the GitLab instance that owns the existing shell
runner (tag `shell`). The Beget server's git `origin` can stay on GitHub — the
deploy script just does `git reset --hard origin/main` against whatever remote
the server clone uses.

## One-time setup

### 1. GitLab CI/CD variables (Settings → CI/CD → Variables)

| Variable | Example | Notes |
|----------|---------|-------|
| `SSH_USER` | `pilarsen` | SSH user on Beget |
| `SSH_ADDRESS` | `pilarsen.beget.tech` | SSH host |
| `DEPLOY_PATH` | `~/pilarsen.ru` | path to the repo clone on the server |
| `DEPLOY_URL` | `https://pilarsen.ru` | for the GitLab environment link only |

The runner already authenticates to Beget with its own SSH key (its public key
is in `~/.ssh/authorized_keys` on Beget), exactly as for atomizeropt.

### 2. Server prep (once, on Beget)

```bash
cd ~                      # or wherever the site lives
git clone <repo-url> pilarsen.ru     # if not already cloned ("туда же, где лежит")
cd pilarsen.ru
bun install --frozen-lockfile
node node_modules/vite/bin/vite.js build   # bun run is broken on this host
```

Then in the Beget panel set the **domain docroot to `…/pilarsen.ru/dist`**.
That folder is what Apache serves; `dist/.htaccess` (from `public/.htaccess`)
provides the SPA history-mode fallback and asset caching.

### 3. Enable the runner

Make sure the `shell`-tagged runner is enabled for this project.

## Notes

- `base` is `/` and the build output is `dist/` (Vite defaults) — serving at a
  domain root works without extra config.
- `vue-tsc` runs in the CI validate stage; the on-server build skips it for speed.
- `deploy.log` on the server keeps a running deployment log.
