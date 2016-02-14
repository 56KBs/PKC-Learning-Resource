var websiteApp = angular.module('websiteApp', ['websiteApp.CaesarCipher.Directives', 'websiteApp.CaesarCipher.EncryptionService']);

websiteApp.controller('TestController', function($scope, EncryptionService) {
})

websiteApp.filter('chars', function() {
	return function(input) {
		if (!angular.isString(input)) {
			return;
		}

		return input.split('');
	}
});