var websiteApp = angular.module('websiteApp', ['websiteApp.EncryptionFactory', 'websiteApp.AnimationDirectives', 'websiteApp.EncryptionDirectives', 'websiteApp.SVGAnimation']);

websiteApp.controller('TestController', function($scope, EncryptionFactory) {
	//$scope.RSAPair = EncryptionFactory.GenerateKeys();
});