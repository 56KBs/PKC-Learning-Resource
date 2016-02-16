var websiteApp = angular.module('railFenceApp', ['railFenceApp.RailFenceCipher.Directives', 'railFenceApp.RailFenceCipher.EncryptionService']);

websiteApp.controller('TestController', function($scope, EncryptionService) {
});

websiteApp.filter('chars', function() {
	return function(input) {
		if (!angular.isString(input)) {
			return;
		}

		return input.split('');
	}
});