angular.module('websiteApp.EncryptionFactory', ['websiteApp.MathService']);

angular.module('websiteApp.EncryptionFactory').factory('EncryptionFactory', function(MathService)
{
	var EncryptionFactory = {};

	EncryptionFactory.GenerateKeys = function(returnAllValues, bitLength)
	{
		if (bitLength === undefined)
		{
			bitLength = 32;
		}

		// Generates the public and private keys
		var values = { 'primeP': null,
					   'primeQ': null,
					   'valueN': null,
					   'bitLength': null,
					   'eulerValue': null,
					   'valueE': null,
					   'valueD': null,
					   'publicKey': null,
					   'privateKey': null };

	   values['primeP'] = MathService.GeneratePrimeFromBits(bitLength / 2).toString();
	   values['primeQ'] = MathService.GeneratePrimeFromBits(bitLength / 2).toString();

	   values['valueN'] = bigInt(values['primeP']).multiply(values['primeQ']).toString();
	   values['bitLength'] = MathService.BitLength(values['valueN']);

	   while (values['bitLength'] != bitLength)
	   {
	   	values['primeQ'] = MathService.GeneratePrimeFromBits(bitLength / 2).toString();

		   values['valueN'] = bigInt(values['primeP']).multiply(values['primeQ']).toString();
		   values['bitLength'] = MathService.BitLength(values['valueN']);
	   }

	   values['eulerValue'] = MathService.EulerTotientRSA(values['valueN'], values['primeP'], values['primeQ']).toString();

	   // Use the default RSA exponent
	   values['valueE'] = "65537";

	   values['valueD'] = MathService.ModularMultiplicativeInverse(values['valueE'], values['eulerValue']).toString();

	   values['publicKey'] = {'modulus': values['valueN'], 'exponent': values['valueE']};

	   values['privateKey'] = {'modulus': values['valueN'], 'exponent': values['valueD']};

		if (returnAllValues)
		{
			return values;
		}
		else
		{
			return { 'publicKey': values['publicKey'], 'privateKey': values['privateKey'] };
		}
	}

	EncryptionFactory.EncryptData = function(dataToEncrypt, encryptionKey)
	{
	    var paddedData = EncryptionFactory.StringAsPaddedAscii(dataToEncrypt);

	    // Encrypts Data
		return bigInt(parseInt(paddedData)).modPow(encryptionKey['exponent'], encryptionKey['modulus']).toString();
	}

	EncryptionFactory.StringAsPaddedAscii = function(dataToPad) {
	    var asciiString = "";

	    for (i = 0; i < dataToPad.length; i++) {
	        asciiString += EncryptionFactory.PadNumericValue(dataToPad.charCodeAt(i), 3);
	    }

	    return asciiString;
	}

	EncryptionFactory.PadNumericValue = function(dataToPad, paddingSize) {
	    var dataAsString = dataToPad + "";

	    while (dataAsString.length < paddingSize) {
	        dataAsString = "0" + dataAsString;
	    }

	    return dataAsString;
	}

	EncryptionFactory.DecryptData = function(dataToDecrypt, encryptionKey)
	{
		// Decrypts Data
	    var decryptedData = bigInt(dataToDecrypt).modPow(encryptionKey['exponent'], encryptionKey['modulus']).toString();

	    console.log(decryptedData);

	    return EncryptionFactory.PaddedAsciiAsString(decryptedData);
	}

	EncryptionFactory.PaddedAsciiAsString = function(dataToConvert)
	{
	    var dataString = "";

	    if (dataToConvert.length % 3 != 0)
	    {
	        dataString += String.fromCharCode(parseInt(dataToConvert.substring(0, 2)));
	        dataToConvert = dataToConvert.substring(2);
	    }

	    while (dataToConvert.length > 0)
	    {
	        dataString += String.fromCharCode(parseInt(dataToConvert.substring(0, 3)));
	        dataToConvert = dataToConvert.substring(3);
	    }

	    return dataString;
	}

	return EncryptionFactory;
});