define([
    'coins',
    'walletGenerator'
  ], function(
    coins,
    walletGenerator
  ) {
    var _containerID = 'coin-list';
    var _selected = coins['Bitcoin'];
    return {
      init: function() {
        var coinNames = [];
        for (var coinName in coins) {
          coinNames.push(coinName);
        }
        coinNames.sort();
        this.renderCoinList(coinNames);
      },

      changeSelectedCoin: function(coin) {
        if (coin == null) {
          console.error('tried to set selected coin to null');
        }
        _selected = coin;
      },

      getSelectedCoin: function() {
        return _selected;
      },

      updateWalletsWithSecretKey: function(secretKeyHex) {
        // TODO: error logging/catching
        this.coinNames.forEach(function(coinName) {
          var coin = coins[coinName];
        });
      },

      renderCoinList: function(coinNames) {
        var ul = $('#' + _containerID + ' ul');
        coinNames.forEach(function(coinName) {
          var li = '' +
            '<li id="' + coinName + '">' +
              '<span>' + coinName + '</span>' +
            '</li>';
          ul.append(li);
        });
      },
    };
  }
);
