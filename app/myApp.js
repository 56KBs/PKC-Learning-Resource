var websiteApp = angular.module('websiteApp', ['websiteApp.EncryptionFactory', 'websiteApp.AnimationDirectives', 'websiteApp.EncryptionDirectives', 'websiteApp.Animation']);

websiteApp.controller('TestController', function($scope, EncryptionFactory) {
	//$scope.RSAPair = EncryptionFactory.GenerateKeys();
});