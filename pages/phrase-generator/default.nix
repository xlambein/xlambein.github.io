{ callPackage
, fetchFromGitHub
}:

let phrase-generator = fetchFromGitHub {
  owner = "xlambein";
  repo = "phrase-generator";
  rev = "0c68228bd07725c0d55f57a6a9b0c047bad6bc2f";
  sha256 = "sha256-ps1Uvi98JlZ5XXM8Bd31s8wXbWtPm8HGD7eqO/YwNX0=";
}; in
(callPackage phrase-generator {}).overrideAttrs (attrs: {
  passthru.metadata = {
    title = "Phrase Generator";
    pubdate = "2022-01-12";
    tags = [ "elm" ];
  };
})
