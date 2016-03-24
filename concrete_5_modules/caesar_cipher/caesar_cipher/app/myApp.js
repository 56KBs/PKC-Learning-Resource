var caesarApp = angular.module('caesarApp', ['caesarApp.CaesarCipher.Directives', 'caesarApp.CaesarCipher.EncryptionService']);

caesarApp.controller('TestController', function($scope, EncryptionService) {
	console.log("Caesar Controller Triggered");
});

caesarApp.filter('chars', function() {
	return function(input) {
		if (!angular.isString(input)) {
			return;
		}

		return input.split('');
	}
});