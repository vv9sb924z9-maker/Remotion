#!/bin/bash
# Install the Remotion agent skills (github.com/remotion-dev/skills) into ~/.claude/skills.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

SKILLS_DIR="$HOME/.claude/skills"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

git clone --depth 1 --quiet https://github.com/remotion-dev/skills "$TMP_DIR/remotion-skills"

mkdir -p "$SKILLS_DIR"
for skill in "$TMP_DIR"/remotion-skills/skills/*/; do
  name="$(basename "$skill")"
  rm -rf "${SKILLS_DIR:?}/$name"
  cp -r "$skill" "$SKILLS_DIR/$name"
done

echo "Installed Remotion skills into $SKILLS_DIR" >&2

# Install the video project's dependencies.
cd "$CLAUDE_PROJECT_DIR"
npm install
