angular.module('caesarApp.CaesarCipher.Directives', ['caesarApp.CaesarCipher.EncryptionService']);

angular.module('caesarApp.CaesarCipher.Directives').directive('caesarCipher', function() {
	
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
		if (endsWith(scripts[i].src, "caesar-directive.js"))
		{
			scriptDirectory = scripts[i].src.substring(0, scripts[i].src.lastIndexOf("/"));
			found = true;
		}
	}

	return {
		restrict: 'E',
		templateUrl: scriptDirectory + '/caesar-cipher.tpl.html',
		scope: {
			plaintext: '@',
			shift: '@'
		},
		controller: 'caesarCipherController'
	}
});

angular.module('caesarApp.CaesarCipher.Directives').controller('caesarCipherController', ['$scope', 'EncryptionService', function caesarCipherController($scope, EncryptionService) {
	$scope.message = {
		plaintext: "",
		ciphertext: "",
		shift: 3
	}

	if ($scope.plaintext !== undefined)
	{
		$scope.message.plaintext = $scope.plaintext;
	}

	if ($scope.shift !== undefined)
	{
		$scope.message.shift = $scope.shift;
	}

	$scope.inputRegex = /^[a-zA-Z]*$/;

	$scope.$watch('message.plaintext', function(newValue, oldValue) {
		if (!$scope.validInput(newValue))
		{
			$scope.message.plaintext = oldValue;
		}
		else
		{
			$scope.message.ciphertext = $scope.encryptMessage($scope.message.plaintext, $scope.message.shift);
		}
	}, true);

	$scope.$watch('message.ciphertext', function(newValue, oldValue) {
		if (!$scope.validInput(newValue))
		{
			$scope.message.ciphertext = oldValue;
		}
		else
		{
			$scope.message.plaintext = $scope.decryptMessage($scope.message.ciphertext, $scope.message.shift);
		}
	}, true);

	$scope.validInput = function(newValue)
	{
		if (newValue === undefined)
		{
			return false;
		}

		var newCharacter = newValue[newValue.length - 1];
		var characterRegex = /[a-zA-Z]|\s/;

		return characterRegex.test(newCharacter)
	}

	$scope.encryptMessage = function()
	{
		return EncryptionService.Encrypt($scope.message.plaintext, $scope.message.shift);
	}

	$scope.decryptMessage = function()
	{
		return EncryptionService.Decrypt($scope.message.ciphertext, $scope.message.shift);
	}

	$scope.exampleEncrypt = function()
	{
		return EncryptionService.Encrypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", $scope.message.shift);
	}

	$scope.shiftLeft = function()
	{
		$scope.message.shift--;

		if ($scope.message.plaintext !== undefined)
		{
			$scope.message.ciphertext = $scope.encryptMessage($scope.message.plaintext, $scope.message.shift);
		}
	}

	$scope.shiftRight = function()
	{
		$scope.message.shift++;

		if ($scope.message.plaintext !== undefined)
		{
			$scope.message.ciphertext = $scope.encryptMessage($scope.message.plaintext, $scope.message.shift);
		}
	}

	$scope.setShiftByChar = function(char)
	{
		var charCodeNormalised = char.charCodeAt(0) - 65;
		$scope.message.shift = charCodeNormalised;
		$scope.message.ciphertext = $scope.encryptMessage($scope.message.plaintext, $scope.message.shift);
	}
}]);