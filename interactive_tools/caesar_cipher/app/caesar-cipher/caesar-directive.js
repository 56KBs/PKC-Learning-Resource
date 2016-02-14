angular.module('websiteApp.CaesarCipher.Directives', ['websiteApp.CaesarCipher.EncryptionService']);

angular.module('websiteApp.CaesarCipher.Directives').directive('caesarCipher', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/caesar-cipher/caesar-cipher.tpl.html',
		scope: {
			plaintext: '@',
			shift: '@'
		},
		controller: 'caesarCipherController'
	}
});

angular.module('websiteApp.CaesarCipher.Directives').controller('caesarCipherController', ['$scope', 'EncryptionService', function caesarCipherController($scope, EncryptionService) {
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