angular.module('websiteApp.RailFenceCipher.Directives', ['websiteApp.RailFenceCipher.EncryptionService']);

angular.module('websiteApp.RailFenceCipher.Directives').directive('railFenceCipher', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/rail-fence-cipher/rail-fence-cipher.tpl.html',
		scope: {
			plaintext: '@',
			rails: '@'
		},
		controller: 'railFenceCipherController'
	}
});

angular.module('websiteApp.RailFenceCipher.Directives').controller('railFenceCipherController', ['$scope', 'EncryptionService', function railFenceCipherController($scope, EncryptionService) {
	$scope.message = {
		plaintext: "",
		ciphertext: "",
		railfence: null,
		rails: 3
	}

	if ($scope.plaintext !== undefined)
	{
		$scope.message.plaintext = $scope.plaintext;
	}

	if ($scope.rails !== undefined)
	{
		$scope.message.rails = $scope.rails;
	}

	$scope.$watch('message.plaintext', function(newValue, oldValue) {
		if (!$scope.validInput(newValue))
		{
			$scope.message.plaintext = oldValue;
		}
		else
		{
			var encrypted = $scope.encryptMessage($scope.message.plaintext, $scope.message.rails);
			$scope.message.ciphertext = encrypted.ciphertext;
			$scope.message.railfence = encrypted.railfence;
		}
	}, true);

	$scope.$watch('message.ciphertext', function(newValue, oldValue) {
		if (!$scope.validInput(newValue))
		{
			$scope.message.ciphertext = oldValue;
		}
		else
		{
			var decrypted = $scope.decryptMessage($scope.message.ciphertext, $scope.message.rails);
			$scope.message.plaintext = decrypted.plaintext;
			$scope.message.railfence = decrypted.railfence;
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
		return EncryptionService.Encrypt($scope.message.plaintext, $scope.message.rails);
	}

	$scope.decryptMessage = function()
	{
		return EncryptionService.Decrypt($scope.message.ciphertext, $scope.message.rails);
	}

	$scope.increaseRailCount = function()
	{
		if ($scope.canRailCountIncrease())
		{
			$scope.message.rails++;

			var encrypted = $scope.encryptMessage($scope.message.plaintext, $scope.message.rails);
			$scope.message.ciphertext = encrypted.ciphertext;
			$scope.message.railfence = encrypted.railfence;
		}
	}

	$scope.canRailCountIncrease = function()
	{
		return $scope.message.rails < $scope.message.plaintext.length;
	}

	$scope.decreaseRailCount = function()
	{
		if ($scope.canRailCountDecrease())
		{
			$scope.message.rails--;

			var encrypted = $scope.encryptMessage($scope.message.plaintext, $scope.message.rails);
			$scope.message.ciphertext = encrypted.ciphertext;
			$scope.message.railfence = encrypted.railfence;
		}
	}

	$scope.canRailCountDecrease = function()
	{
		return $scope.message.rails > 2 && $scope.message.rails <= $scope.message.plaintext.length;
	}
}]);