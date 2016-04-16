angular.module('websiteApp.EncryptionDirectives', ['websiteApp.EncryptionFactory']);

angular.module('websiteApp.EncryptionDirectives')

.directive('keyGenerator', function()
{
	// Find the script directory, fix to allow concrete5 blocks to work correctly
	function endsWith(str, suffix) {
		if (str == null)
		{
			return false;
		}

	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	var scripts = document.getElementsByTagName("script");
	var found = false;
	var scriptDirectory = "";

	for (var i = scripts.length - 1; i > 0 && !found; i--)
	{
		if (endsWith(scripts[i].src, "EncryptionDirectives.js"))
		{
			scriptDirectory = scripts[i].src.substring(0, scripts[i].src.lastIndexOf("/"));
			found = true;
		}
	}

	return {
		restrict: 'E',
		templateUrl: scriptDirectory + '/key-generation-directive.tpl.html',
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