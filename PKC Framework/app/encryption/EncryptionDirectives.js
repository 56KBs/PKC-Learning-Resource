angular.module('websiteApp.EncryptionDirectives', ['websiteApp.EncryptionDirectives', 'websiteApp.EncryptionFactory']);

angular.module('websiteApp.EncryptionDirectives')

.directive('keyGenerator', function()
{
	return {
		restrict: 'E',
		templateUrl: '/app/encryption/key-generation-directive.tpl.html',
		controller: 'encryptionController'
	}
})

.controller('encryptionController', ['$scope', 'EncryptionFactory', function encryptionController($scope, EncryptionFactory)
{
	$scope.keyLength = 32;
	$scope.keys = null;
	$scope.prettyKeys = {
		'publicKey': null,
		'privateKey': null
	};

	$scope.generateKeys = function(bitLength)
	{
		if (bitLength === undefined)
		{
			bitLength = 32;
		}

		$scope.keys = EncryptionFactory.GenerateKeys(true, bitLength);
		$scope.prettyKeys.publicKey = $scope.keys.publicKey.modulus + ";" + $scope.keys.publicKey.exponent;
		$scope.prettyKeys.privateKey = $scope.keys.privateKey.modulus + ";" + $scope.keys.privateKey.exponent;
	}

	$scope.encrypt = function(key, message)
	{
		console.log("Encrypting");

		var correctKey = {
			'modulus': key.substring(0, key.indexOf(";")),
			'exponent': key.substring(key.indexOf(";") + 1, key.keyLength)
		};

		$scope.encryptedMessage = EncryptionFactory.EncryptData(message, correctKey);
	}


	$scope.decrypt = function(key, message)
	{
		console.log("Decrypting");
		
		var correctKey = {
			'modulus': key.substring(0, key.indexOf(";")),
			'exponent': key.substring(key.indexOf(";") + 1, key.keyLength)
		};

		$scope.decryptedMessage = EncryptionFactory.DecryptData(message, correctKey);
	}
}])