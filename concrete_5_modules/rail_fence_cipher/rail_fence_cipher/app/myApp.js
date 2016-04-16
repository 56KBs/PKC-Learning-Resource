var railFenceApp = angular.module('railFenceApp', ['railFenceApp.RailFenceCipher.Directives', 'railFenceApp.RailFenceCipher.EncryptionService']);

railFenceApp.controller('TestController', function($scope, EncryptionService) {
	console.log("Rail Fence Controller Triggered");
});

railFenceApp.filter('chars', function() {
	return function(input) {
		if (!angular.isString(input)) {
			return;
		}

		return input.split('');
	}
});

var element = document.getElementById("railFenceApp");
console.log(element);
angular.element(element).ready(function() {
	angular.bootstrap(element, ['railFenceApp']);
});
console.log("Bootstrapping");