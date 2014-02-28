define([
    'coins',
    'walletGenerator'
  ], function(
    coins,
    walletGenerator
  ) {
    return {
      containerID: 'coin-list',
      coinNames: [],

      init: function() {
        // sort names from coins.js
        for (var coinName in coins) {
          this.coinNames.push(coinName);
        }
        this.coinNames.sort();

        // render the list items
        this.renderCoinList();
      },

      updateWalletsWithSecretKey: function(secretKeyHex) {
        // TODO: error logging/catching
        this.coinNames.forEach(function(coinName) {
          var coin = coins[coinName];
          var wallet = walletGenerator.generateWalletFromKey(coin, secretKeyHex);
          $('#' + coinName + '-wallet .public span').text(wallet.public);
          $('#' + coinName + '-wallet .private span').text(wallet.private);
        });
      },

      renderCoinList: function() {
        var ul = $('#' + this.containerID + ' ul');
        this.coinNames.forEach(function(coinName) {
          var li = '' +
            '<li id="' + coinName + '">' +
              '<div class="coin-list-item-wrapper">' +
                '<span>' + coinName + '</span>' +
              '</div>' +
            '</li>';
          ul.append(li);
        });
      },
    };
  }
);
