{
  description = "Nix flake for president-challenge";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
      ];
      perSystem = { config, self', inputs', pkgs, system, ... }: {
        devShells.ci = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_20
            pnpm
          ];
        };
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_20
            pnpm
            ansible
          ];
        };
      };
    };
}
