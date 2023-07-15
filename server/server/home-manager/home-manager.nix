{ pkgs, ... }:

{
  home.stateVersion = "23.05";
  home.username = "nixuser";
  home.homeDirectory = "/home/nixuser";

  imports = [
    ./neovim.nix
  ];
}
