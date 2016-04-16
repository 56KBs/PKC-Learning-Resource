angular.module('websiteApp.SVGAnimation.Links', [])
.directive('linkNode', ['$document', function($document) {
    // Find the script directory, fix to allow concrete5 blocks to work correctly
    function endsWith(str, suffix) {
        if (str == null)
        {
            return false;
        }

        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    var scripts = document.getElementsByTagName("script");
    var found = false;
    var scriptDirectory = "";

    for (var i = scripts.length - 1; i > 0 && !found; i--)
    {
        if (endsWith(scripts[i].src, "link-directive.js"))
        {
            scriptDirectory = scripts[i].src.substring(0, scripts[i].src.lastIndexOf("/"));
            found = true;
        }
    }

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
        templateUrl: scriptDirectory + '/link-directive.tpl.html',
        link: function($scope, element, attr) {

        }
    };
}])
.controller('linkNodeController', ['$scope', function pcNodeController($scope) {
    console.log("linkNodeController");
}]);