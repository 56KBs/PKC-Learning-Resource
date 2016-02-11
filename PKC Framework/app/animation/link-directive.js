angular.module('websiteApp.SVGAnimation.Links', [])
.directive('linkNode', ['$document', function($document) {
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
        
        controller: 'linkNodeController',
        templateUrl: '/app/animation/link-directive.tpl.html',
        link: function($scope, element, attr) {

        }
    };
}])
.controller('linkNodeController', ['$scope', function pcNodeController($scope) {
    console.log("linkNodeController");
}]);