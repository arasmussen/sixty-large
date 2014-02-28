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
      generateRandomWallet();

      function generateRandomWallet() {
        var coin = coinList.getSelectedCoin();
        var secretKeyHex = secretKeyGenerator.generateRandomHex();
        var wallet = walletGenerator.generateWalletFromKey(coin, secretKeyHex);
        $('#public-address').text(wallet.public);
        $('#private-key').text(wallet.private);
      }
      $('#generate-button').bind('click', generateRandomWallet);

      function changeSelectedCoin(e) {
        var coinName = e.target.id;
        var coin = coins[coinName];
        coinList.changeSelectedCoin(coin);
        generateRandomWallet();
        // TODO update page label
      }
      $('#coin-list li').bind('click', changeSelectedCoin);
    };
  }
);
