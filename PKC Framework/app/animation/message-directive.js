angular.module('websiteApp.SVGAnimation.Messages', [])
.directive('messageNode', ['$document', function($document) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            sourceNode: '=',
            destinationNode: '=',
            canvas: '='
        },
        // Supposedly fixes SVG custom elements
        templateNamespace: 'svg',
        replace: true,
        
        controller: 'messageNodeController',
        template: '<use xlink:href="#pcNode" ng-attr-id="message {{ data.id }}" ng-attr-x="{{ data.point.x }}" ng-attr-y="{{ data.point.y }}" width="50" height="42"/>',
        link: function($scope, element, attr) {

        }
    };
}])
.controller('messageNodeController', ['$scope', function messageNodeController($scope) {
    console.log("messageNodeController");
}]);