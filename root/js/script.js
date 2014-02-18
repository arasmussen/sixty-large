$(function() {
  var secretInput = $('#secret');
  secretInput.bind('input', function() {
    var secretHex = $('#secret').val();
    var valid = !/[^0123456789abcdef]+/i.test(secretHex);
    if (!valid) {
      console.log('invalid key');
      return;
    }

    while (secretHex.length < 64) {
      secretHex = '0' + secretHex;
    }

    var secretBytes = Crypto.util.hexToBytes(secretHex);
    var extended = [128].concat(secretBytes);
    var hashed = Crypto.SHA256(Crypto.SHA256(extended, {asBytes: true}), {asBytes: true});
    var checksum = hashed.slice(0, 4);
    var full_extended = extended.concat(checksum);
    var private_key = Bitcoin.Base58.encode(full_extended);
    $('#private').val(private_key);

    var eckey = new Bitcoin.ECKey(secretBytes);
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
    $('#public').val(publicKey);
  });
});
