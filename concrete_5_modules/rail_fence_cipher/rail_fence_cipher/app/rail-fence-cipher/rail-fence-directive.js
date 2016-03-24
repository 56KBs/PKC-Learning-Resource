angular.module('railFenceApp.RailFenceCipher.Directives', ['railFenceApp.RailFenceCipher.EncryptionService']);

angular.module('railFenceApp.RailFenceCipher.Directives').directive('railFenceCipher', function() {
	
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
		if (endsWith(scripts[i].src, "rail-fence-directive.js"))
		{
			scriptDirectory = scripts[i].src.substring(0, scripts[i].src.lastIndexOf("/"));
			found = true;
		}
	}

	return {
		restrict: 'E',
		templateUrl: scriptDirectory + '/rail-fence-cipher.tpl.html',
		scope: {
			plaintext: '@',
			rails: '@'
		},
		controller: 'railFenceCipherController'
	}
});

angular.module('railFenceApp.RailFenceCipher.Directives').controller('railFenceCipherController', ['$scope', 'EncryptionService', function railFenceCipherController($scope, EncryptionService) {
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