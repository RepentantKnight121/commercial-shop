{ config, pkgs, ...}:

{
  services.openssh = {
    enable = true;
    settings.PermitRootLogin = "no";
    settings.UseDns = false;
    ports = [ 53 ];
  };
}
