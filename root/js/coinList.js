define([
    'coins'
  ], function(
    coins
  ) {
    return {
      containerID: 'coin-list',
      selected: 'Bitcoin',
      coinNames: [],

      init: function() {
        // sort names from coins.js
        for (var coinName in coins) {
          this.coinNames.push(coinName);
        }
        this.coinNames.sort();

        // render
        this.renderCoinList();
      },

      renderCoinList: function() {
        var ul = $('#' + this.containerID + ' ul');
        this.coinNames.forEach(function(coinName) {
          var li = '' +
            '<li>' +
              '<div class="left">' +
                '<h2>' + coinName + '</h2>' +
              '</div>' +
              '<div class="right">' +
                '<div class="public">' +
                  '<span />' +
                  '<h3>PUBLIC ADDRESS</h3>' +
                '</div>' +
                '<div class="private">' +
                  '<span />' +
                  '<h3>PRIVATE ADDRESS</h3>' +
                '</div>' +
              '</div>' +
            '</li>';
          ul.append(li);
        });
      },
    };
  }
);
