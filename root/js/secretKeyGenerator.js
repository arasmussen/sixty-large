define(function() {
  return {
    generateRandomBytes: function() {
      var rng = new SecureRandom();
      var secretKeyBytes = new Array(32);
      rng.nextBytes(secretKeyBytes);
      return secretKeyBytes;
    },

    generateRandomHex: function() {
      var randomBytes = this.generateRandomBytes();
      return Crypto.util.bytesToHex(randomBytes);
    }
  };
});
