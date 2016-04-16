var websiteApp = angular.module('websiteApp', ['websiteApp.EncryptionFactory', 'websiteApp.EncryptionDirectives']);

websiteApp.controller('TestController', function($scope, EncryptionFactory) {
	//$scope.RSAPair = EncryptionFactory.GenerateKeys();
});