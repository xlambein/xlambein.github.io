{
  lib,
  buildNpmPackage,
  fetchurl,
}:
buildNpmPackage {
  pname = "jampack";
  version = "0.23.4";

  src = fetchurl {
    url = "https://registry.npmjs.org/@divriots/jampack/-/jampack-0.23.4.tgz";
    hash = "sha256-SnjJHlCtaUSyqh3+kna9IHIIRguf/+TzEDebHl/3QIA=";
  };

  postPatch = ''
    cp ${./package-lock.json} ./package-lock.json
  '';

  npmDepsHash = "sha256-DjvWuGI6I9T0AKC883RXJub1oQDsR2pr5EFUtoKCdQA=";

  dontNpmBuild = true;

  passthru.updateScript = ./update.sh;

  meta = with lib; {
    description = "A language server implementation for the WGSL shading language";
    homepage = "https://github.com/divriots/jampack";
    license = with licenses; [mit];
    maintainers = with maintainers; [xlambein];
    mainProgram = "jampack";
  };
}
