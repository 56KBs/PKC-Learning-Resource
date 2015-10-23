angular.module('websiteApp.EncryptionFactory', ['websiteApp.MathFactory']);

angular.module('websiteApp.EncryptionFactory').factory('EncryptionFactory', function(MathFactory)
{
	var EncryptionFactory = {};

	EncryptionFactory.GenerateKeys = function(returnAllValues)
	{
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


	   var listOfPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271];
	   values['primeP'] = listOfPrimes[Math.floor(Math.random()*listOfPrimes.length)];
	   values['primeQ'] = listOfPrimes[Math.floor(Math.random()*listOfPrimes.length)];

	   values['valueN'] = values['primeP'] * values['primeQ'];
	   values['bitLength'] = MathFactory.BitLength(values['valueN']);

	   values['eulerValue'] = MathFactory.EulerTotientRSA(values['valueN'], values['primeP'], values['primeQ']);

	   values['valueE'] = MathFactory.GenerateCoprime(values['eulerValue']);

	   values['valueD'] = MathFactory.ModularMultiplicativeInverse(values['valueE'], values['eulerValue']);

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
		// Encrypts Data
	}

	EncryptionFactory.DecryptData = function(dataToDecrypt, encryptionKey)
	{
		// Decrypts Data
	}

	return EncryptionFactory;
});