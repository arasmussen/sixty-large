define(function() {
  return {
    isValidHex: function(str) {
      return !/[^0123456789abcdef]+/i.test(str);
    },

    pad: function(str, ch, len) {
      while (str.length < len) {
        str = ch + str;
      }
      return str;
    }
  };
});
