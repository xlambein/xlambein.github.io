#! /usr/bin/env nix-shell
#! nix-shell -i bash -p coreutils nodejs jq prefetch-npm-deps

set -eu

package="@divriots/jampack"

info=$(npm view "$package" --json)

version=$(echo "$info" | jq -r .version)
url=$(echo "$info" | jq -r .dist.tarball)
hash=$(nix-prefetch-url "$url" | xargs nix-hash --to-sri --type sha256)

# Fetch package.json and compute package-lock.json
temp=$(mktemp -d)
pushd "$temp"
curl "$url" | tar -zxf - package/package.json
cd package
npm install --package-lock-only
npmDepsHash=$(prefetch-npm-deps package-lock.json)
popd

cp "$temp/package/package-lock.json" .

cat default.nix \
  | sed -E "s#version = \".+\";#version = \"${version}\";#" \
  | sed -E "s#url = \".+\";#url = \"${url}\";#" \
  | sed -E "s#hash = \".+\";#hash = \"${hash}\";#" \
  | sed -E "s#npmDepsHash = \".+\";#npmDepsHash = \"${npmDepsHash}\";#" \
  | tee default.nix
