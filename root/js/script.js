$(function() {
  var secretInput = $('#secret');
  secretInput.bind('input', secretKeyChanged);

  function isValidHex(str) {
    return !/[^0123456789abcdef]+/i.test(str);
  }

  function pad(str, ch, len) {
    while (str.length < len) {
      str = ch + str;
    }
    return str;
  }

  function secretKeyChanged() {
    var secretKeyHex = $('#secret').val();
    if (!isValidHex(secretKeyHex)) {
      console.error('Invalid Secret Key');
      return;
    }

    secretKeyHex = pad(secretKeyHex, '0', 64);
    var secretKeyBytes = Crypto.util.hexToBytes(secretKeyHex);

    var privateKey = privateKeyFromSecretKey(secretKeyBytes);
    var publicKey = publicKeyFromSecretKey(secretKeyBytes);

    $('#private').val(privateKey);
    $('#public').val(publicKey);
  }

  function privateKeyFromSecretKey(secretKey) {
    var extended = [128].concat(secretKey);
    var hashed = Crypto.SHA256(Crypto.SHA256(extended, {asBytes: true}), {asBytes: true});
    var checksum = hashed.slice(0, 4);
    var fullExtended = extended.concat(checksum);
    var privateKey = Bitcoin.Base58.encode(fullExtended);
    return privateKey;
  }

  function publicKeyFromSecretKey(secretKey) {
    var eckey = new Bitcoin.ECKey(secretKey);
    var curve = getSECCurveByName('secp256k1');
    var curvePoint = curve.getG().multiply(eckey.priv);
    var x = curvePoint.getX().toBigInteger();
    var y = curvePoint.getY().toBigInteger();
    var publicKeyBytes = integerToBytes(x, 32);
    publicKeyBytes = publicKeyBytes.concat(integerToBytes(y, 32));
    publicKeyBytes.unshift(0x04);
    var hashedOnce = [0].concat(Bitcoin.Util.sha256ripe160(publicKeyBytes));
    var hashedThrice = Crypto.SHA256(Crypto.SHA256(hashedOnce, {asBytes: true}), {asBytes: true});
    var checksum = hashedThrice.slice(0, 4);
    var fullExtended = hashedOnce.concat(checksum);
    var publicKey = Bitcoin.Base58.encode(fullExtended);
    return publicKey;
  }
});
