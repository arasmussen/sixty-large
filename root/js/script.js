define([
    'coinList',
    'coins',
    'secretKeyGenerator',
    'seedRNG',
    'util',
    'walletGenerator'
  ], function(
    coinList,
    coins,
    secretKeyGenerator,
    seedRNG,
    util,
    walletGenerator
  ) {
    return function() {
      // seed the random number generator
      // KEEP THIS AT THE TOP
      seedRNG();

      // create coin list
      coinList.init();
      generateNewRandomWallets();

      function generateNewRandomWallets() {
        // generate a random secret key
        var secretKeyHex = secretKeyGenerator.generateRandomHex();
        if (!util.isValidHex(secretKeyHex)) {
          console.error('script.js: generated an invalid secret key somehow...');
          return;
        }
        coinList.updateWalletsWithSecretKey(secretKeyHex);
        $('#secret-key span').val(secretKeyHex);
      }

      $('#generate-button').bind('click', generateNewRandomWallets);
    };
  }
);
