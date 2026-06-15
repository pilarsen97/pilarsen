#!/usr/bin/env bash

# =============================================================================
# Production Deployment Script for pilarsen (Vue 3 + Vite SPA)
# =============================================================================
# Executed on the Beget production server via GitLab CI/CD.
# Triggered automatically on push to main.
#
# Run from the project root:  cd $DEPLOY_PATH && . deploy/gitlab-deploy.sh
# The domain docroot must point to $DEPLOY_PATH/dist (see deploy/README.md).
#
# Exit codes:
#   0 - Success
#   1 - Git operations failed
#   3 - Frontend build failed
# =============================================================================

set -e
set -u
set -o pipefail

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

PROJECT_DIR="$(pwd)"
LOG_FILE="$PROJECT_DIR/deploy.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[${TIMESTAMP}]${NC} $1" | tee -a "$LOG_FILE"; }
log_error() { echo -e "${RED}[${TIMESTAMP}] ERROR:${NC} $1" | tee -a "$LOG_FILE"; }
log_warning() { echo -e "${YELLOW}[${TIMESTAMP}] WARNING:${NC} $1" | tee -a "$LOG_FILE"; }
log_section() {
    echo "" | tee -a "$LOG_FILE"
    echo "============================================" | tee -a "$LOG_FILE"
    echo "$1" | tee -a "$LOG_FILE"
    echo "============================================" | tee -a "$LOG_FILE"
}
error_exit() {
    log_error "$1"
    log_error "Deployment failed! Check $LOG_FILE for details."
    exit "${2:-1}"
}

# -----------------------------------------------------------------------------
# Pre-deployment checks
# -----------------------------------------------------------------------------

log_section "🚀 Starting Deployment (pilarsen)"
log "Deployment initiated by GitLab CI/CD"

cd "$PROJECT_DIR" || error_exit "Cannot change to project directory" 1
[ -d ".git" ] || error_exit "Not a git repository: $PROJECT_DIR" 1

# -----------------------------------------------------------------------------
# Step 1: Fetch latest code
# -----------------------------------------------------------------------------

log_section "📦 Step 1: Fetching Latest Code"

log "Fetching from origin/main..."
git fetch origin main || error_exit "Git fetch failed" 1

CURRENT_COMMIT=$(git rev-parse HEAD 2>/dev/null || echo "unknown")
TARGET_COMMIT=$(git rev-parse origin/main 2>/dev/null || echo "unknown")
log "Current commit: $CURRENT_COMMIT"
log "Target commit:  $TARGET_COMMIT"

log "Resetting to origin/main..."
git reset --hard origin/main || error_exit "Git reset failed" 1
log "✅ Code updated successfully"

# -----------------------------------------------------------------------------
# Step 2: Build frontend
# -----------------------------------------------------------------------------

log_section "🏗️  Step 2: Building Frontend Assets"

command -v bun >/dev/null 2>&1 || error_exit "bun not found in PATH" 3
command -v node >/dev/null 2>&1 || error_exit "node not found in PATH" 3

log "Installing dependencies..."
bun install --frozen-lockfile || error_exit "bun install failed" 3

# NOTE: `bun run` is broken on this Beget host (CouldntReadCurrentDirectory).
# bun install works for deps, but the build itself runs vite directly via node.
# This skips vue-tsc — type-checking already ran in the CI validate stage.
log "Building production assets (vite via node)..."
node node_modules/vite/bin/vite.js build || error_exit "Frontend build failed" 3

[ -d "dist" ] || error_exit "Build output directory (dist/) not found" 3

# Safety net: ensure the SPA .htaccess is present in dist/ even if the
# publicDir copy skipped the dotfile.
if [ ! -f "dist/.htaccess" ] && [ -f "public/.htaccess" ]; then
    cp public/.htaccess dist/.htaccess
    log_warning "Copied public/.htaccess into dist/ (publicDir copy missed it)"
fi

log "✅ Frontend assets built successfully"

# -----------------------------------------------------------------------------
# Summary
# -----------------------------------------------------------------------------

log_section "✅ Deployment Completed Successfully!"
log "Deployed commit: $(git rev-parse HEAD)"
log "Deployment time: $(date '+%Y-%m-%d %H:%M:%S')"
log "Last commit: $(git log -1 --pretty=%B | head -n 1)"
log_section "🎉 All Done!"

exit 0
