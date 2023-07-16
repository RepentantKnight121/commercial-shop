{ config, pkgs, ... }:

{
  boot = {
    # Boot loader
    loader.grub = {
      enable = true;
      device = "/dev/vda";
    };

    kernel.sysctl = {
      "net.ipv4.conf.all.forwarding" = true;
    };
  };
}
