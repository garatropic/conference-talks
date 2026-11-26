#!/usr/bin/env bash
set -euo pipefail

checkout="${1:?Pass the path to the pinned skein-js checkout}"
image_root="${2:?Pass the Artifact Registry repository URL}"
output_mode="${3:---push}"
revision=1b1a4d4018d1dad718054cd4f71d65f582e653a2
tag="${revision:0:7}-vertex"
demo_dir="$(cd "$(dirname "$0")" && pwd)"

if ! git -C "$checkout" cat-file -e "$revision^{commit}"; then
  echo "Use a skein-js checkout that contains $revision." >&2
  exit 1
fi

if [[ "$output_mode" != --push && "$output_mode" != --load ]]; then
  echo 'Choose --push or --load.' >&2
  exit 1
fi

work_dir="$(mktemp -d)"
trap 'rm -rf -- "$work_dir"' EXIT
source_dir="$work_dir/source"
git clone --quiet --shared --no-checkout -- "$checkout" "$source_dir"
git -C "$source_dir" checkout --quiet --detach "$revision"
git -C "$source_dir" apply "$demo_dir/vertex-ai.patch"

(
  cd "$source_dir"
  corepack pnpm install --frozen-lockfile
  CI=true NX_DAEMON=false corepack pnpm exec nx run example-a2ui:build
  cd examples/a2ui
  node ../../packages/cli/dist/index.js build --artifact-only
)

web_context="$work_dir/web"
mkdir "$web_context"
cp "$demo_dir/nginx.conf" "$demo_dir/Dockerfile.web" "$web_context/"
cp -R "$source_dir/dist/examples/a2ui/browser" "$web_context/browser"

skein_artifact="$source_dir/examples/a2ui/.skein/build"
# The generated Dockerfile imports the graph to verify its exports. Supply the model name to that
# build instruction. Cloud Run supplies the project and service identity when executing the graph.
awk '
  /^RUN node --input-type=module / {
    sub(/^RUN /, "RUN A2UI_MODEL=gemini-3.5-flash-lite ")
    checks++
  }
  { print }
  END { if (checks != 1) exit 1 }
' "$skein_artifact/Dockerfile" > "$work_dir/Dockerfile.skein"

docker buildx build --platform linux/amd64 --tag "$image_root/skein:$tag" "$output_mode" \
  --file "$work_dir/Dockerfile.skein" "$skein_artifact"
docker buildx build --platform linux/amd64 --tag "$image_root/web:$tag" "$output_mode" \
  --file "$web_context/Dockerfile.web" "$web_context"
