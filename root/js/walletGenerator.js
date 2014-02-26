define([
    'util'
  ], function(
    util
  ) {
    return {
      generateWalletFromKey: function(coin, secretKeyHex) {
        if (secretKeyHex.length === 0) {
          throw new Error('WalletGenerator: Empty secret key');
        }

        if (!util.isValidHex(secretKeyHex)) {
          throw new Error('WalletGenerator: not valid hex');
        }

        secretKeyHex = util.pad(secretKeyHex, 0, 64);
        var secretKeyBytes = Crypto.util.hexToBytes(secretKeyHex);
        return this._generateWallet(coin, secretKeyBytes);
      },

      _generateWallet: function(coin, secretKeyBytes) {
        var private = this._privateKeyFromSecretKey(coin, secretKeyBytes);
        var public = this._publicKeyFromSecretKey(coin, secretKeyBytes);
        var secret = Crypto.util.bytesToHex(secretKeyBytes);
        return {
          public: public,
          private: private,
          secret: secret
        };
      },

      _privateKeyFromSecretKey: function(coin, secretKey) {
        var extended = [coin.prefixes.private].concat(secretKey);
        var hashed = Crypto.SHA256(Crypto.SHA256(extended, {asBytes: true}), {asBytes: true});
        var checksum = hashed.slice(0, 4);
        var fullExtended = extended.concat(checksum);
        var privateKey = Bitcoin.Base58.encode(fullExtended);
        return privateKey;
      },

      _publicKeyFromSecretKey: function(coin, secretKey) {
        var eckey = new Bitcoin.ECKey(secretKey);
        var curve = getSECCurveByName('secp256k1');
        var curvePoint = curve.getG().multiply(eckey.priv);
        var x = curvePoint.getX().toBigInteger();
        var y = curvePoint.getY().toBigInteger();
        var publicKeyBytes = integerToBytes(x, 32);
        publicKeyBytes = publicKeyBytes.concat(integerToBytes(y, 32));
        publicKeyBytes.unshift(0x04);
        var hashedOnce = [coin.prefixes.public].concat(Bitcoin.Util.sha256ripe160(publicKeyBytes));
        var hashedThrice = Crypto.SHA256(Crypto.SHA256(hashedOnce, {asBytes: true}), {asBytes: true});
        var checksum = hashedThrice.slice(0, 4);
        var fullExtended = hashedOnce.concat(checksum);
        var publicKey = Bitcoin.Base58.encode(fullExtended);
        return publicKey;
      }
    };
  }
);
