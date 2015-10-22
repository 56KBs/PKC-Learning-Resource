angular.module('websiteApp.EncryptionFactory', []);

angular.module('websiteApp.EncryptionFactory').factory('EncryptionFactory', function()
{
	var EncryptionFactory = {};

	EncryptionFactory.GenerateKeys = function(returnAllValues)
	{
		// Generates the public and private keys

		return {'publicKey': 12};
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