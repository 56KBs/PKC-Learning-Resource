angular.module('websiteApp.EncryptionDirectives', ['websiteApp.EncryptionDirectives', 'websiteApp.EncryptionFactory']);

angular.module('websiteApp.EncryptionDirectives')

.directive('keyGeneration', function()
{
	return {
		restrict: 'E',
		templateUrl: 'templates/keyGenerationTemplate.html',
		controller: 'encryptionController'
	}
})

.controller('encryptionController', ['$scope', 'EncryptionFactory', function encryptionController($scope, EncryptionFactory)
{
	$scope.keyLength = 32;
	$scope.keys = null;
	$scope.generateKeys = function(bitLength)
	{
		if (bitLength === undefined)
		{
			bitLength = 32;
		}

		$scope.keys = EncryptionFactory.GenerateKeys(true, bitLength);
		console.log($scope.keys);
	}

	$scope.encrypt = function()
	{
		console.log("Encrypting");
		$scope.encryption.message.encrypted = EncryptionFactory.EncryptData($scope.encryption.message.plaintext, $scope.encryption.key);
	}


	$scope.decrypt = function()
	{
		console.log("Decrypting");
		$scope.decryption.message.plaintext = EncryptionFactory.DecryptData($scope.decryption.message.plaintext, $scope.decryption.key);
	}

	console.log("ELLO");
}])