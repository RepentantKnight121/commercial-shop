{
  description = "My flake";

  inputs = {
    # Link to nix stable packages
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";

    # Link to nix unstable packages
    nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = 
  { self, nixpkgs, nixpkgs-unstable, ... }@inputs:
    let
      # Config settings
      username = "nixuser";
      myPlatform = "server";
      system = "x86_64-linux";

      pkgs = import nixpkgs { 
        inherit system;
        config.allowUnfree = true;
      };

      lib = nixpkgs.lib;

      overlay-unstable = final: prev: {
        unstable = import nixpkgs-unstable {
          inherit system;
          config.allowUnfree = true;
        };
      };
    in {
      nixosConfigurations = {
        nixos = lib.nixosSystem {
          inherit system;

          modules = [
            # Overlays-module makes "pkgs.unstable" available in configuration.nix
            ({ config, pkgs, ... }: {
              nixpkgs.overlays = [ 
                overlay-unstable
              ];
            })
            ./${myPlatform}/system/configuration.nix
          ];
        };
      };
    };
}
