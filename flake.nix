{
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixss.url = "git+https://codeberg.org/xlambein/nixss";
  inputs.nixss.inputs.nixpkgs.follows = "nixpkgs";
  inputs.nixss.inputs.flake-utils.follows = "flake-utils";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [inputs.nixss.overlays.default];
        };

        jampack = pkgs.callPackage ./jampack {};

        publish = pkgs.writeShellScriptBin "publish" ''
          set -euo pipefail

          [[ -n $(git status -s) ]] && echo 'Repository is dirty, aborting' && exit 1

          path=$(nix build --no-link --print-out-paths)
          message=$(git log -1 --format=format:%s)

          cd ../gh-pages

          GLOBIGNORE=.git:CNAME
          rm -r *

          cp -r --dereference --no-preserve=mode,ownership $path/* .
          ${jampack}/bin/jampack .
          rmdir _jampack
          rm -rf .jampack

          git add .
          git commit -vem "$message"
          git push
        '';
      in {
        packages.default = pkgs.callPackage ./site.nix {};

        apps.publish = flake-utils.lib.mkApp {drv = publish;};

        devShell = pkgs.mkShell {
          buildInputs = [pkgs.nixss.dev-server.develop publish];
        };
      }
    );
}
