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
	$scope.generateKeys = function(bitLength)
	{
		if (bitLength === undefined)
		{
			bitLength = 32;
		}

		var start = performance.now();
		$scope.keys = EncryptionFactory.GenerateKeys(true, bitLength);
		var end = performance.now();
		console.log("Generating " + bitLength + "-bit key took: " + (end - start) + "ms");
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
		$scope.decryption.message.plaintext = EncryptionFactory.DecryptData($scope.decryption.message.encrypted, $scope.decryption.key);
	}
}])