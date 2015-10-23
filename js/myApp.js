var websiteApp = angular.module('websiteApp', ['websiteApp.EncryptionFactory', 'websiteApp.MathFactory']);

websiteApp.controller('TestController', function($scope, EncryptionFactory) {
	//$scope.RSAPair = EncryptionFactory.GenerateKeys();
});