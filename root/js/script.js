define([
    'coinList',
    'coins',
    'seedRNG',
    'util',
    'walletGenerator'
  ], function(
    coinList,
    coins,
    seedRNG,
    util,
    walletGenerator
  ) {
    return function() {
      // seed the random number generator
      // KEEP THIS AT THE TOP
      seedRNG();

      coinList.init();

      /*
      $('#coin-selector').on('click', function() {
        $('#currency-list').toggleClass('active');
      });

      $('#coin-selector li').on('click', function(target) {
        // remove selected from current one
        $('#coin-selector li.selected').removeClass('selected');

        // add it to the new one
        var li = $(event.target);
        li.addClass('selected');

        var coinName = li.html();

        // update the label
        $('#coin-selector #selected-coin-label').html(coinName);

        // update key gen stuff
        updatePrefix(coinName);
        generateWallet();
      });
      */

      function getCoin() {
        var coinName = $('#coin-selector li.selected').html();
        if (!coins[coinName]) {
          throw new Error('Script: tried to fetch invalid coinName');
        }
        return coins[coinName];
      }

      function generateWallet() {
        var coin = getCoin();
        var secretKeyHex = $('#secret').val();
        var wallet;
        if (secretKeyHex.length === 0) {
          if (!util.isValidHex(secretKeyHex)) {
            console.error('Script: secret key not valid hex');
            // handle this
          }
          wallet = walletGenerator.generateRandomWallet(coin);
          $('#secret').val(wallet.secret);
        } else {
          wallet = walletGenerator.generateWalletFromKey(coin, secretKeyHex);
          $('#secret').val(secretKeyHex);
        }
        $('#private').val(wallet.private);
        $('#public').val(wallet.public);
      }

      /*
      var generateButton = $('#generate-button');
      generateButton.bind('click', function() {
        $('#secret').val('');
        generateWallet();
      });

      var secretKey = $('#secret');
      secretKey.bind('input', generateWallet);
      */

      function updatePrefix(coinName) {
        var coin = coins[coinName];
        if (!coin) {
          console.error("Coin name \"" + coinName + "\" doesn't exist");
          return;
        }

        prefix.private = coin.prefixes.private,
        prefix.public = coin.prefixes.public
      }

      /*
      var prefix = {};
      updatePrefix('Bitcoin'); // start with btc by default
      generateWallet(true);
      */
    };
  }
);
