angular.module('websiteApp.SVGAnimation.Nodes', [])
.directive('draggable', ['$document', function($document) {
    return {
        restrict: 'A',
        scope: false,
        controller: 'draggableController',
        link: function($scope, element, attr) {          
            var startPoint = {
                x: $scope.data.point.x,
                y: $scope.data.point.y
            };
            
            var offsetPoint = {
                x: 0,
                y: 0
            };
            
            element.on('mousedown', function(event) {
                event.preventDefault();
                
                offsetPoint.x = event.pageX;
                offsetPoint.y = event.pageY;
                
                $document.on('mousemove', mouseMove);
            });
            
            function mouseMove(event) {
                var deltaPoint = {
                    x: event.pageX - offsetPoint.x,
                    y: event.pageY - offsetPoint.y
                };
                
                offsetPoint.x = event.pageX;
                offsetPoint.y = event.pageY;
                
                if (withinXBounds(deltaPoint.x))
                {
                    $scope.data.point.x += deltaPoint.x;
                }

                if (withinYBounds(deltaPoint.y))
                {
                    $scope.data.point.y += deltaPoint.y;
                }
            };
            
            function withinXBounds(deltaX) {
                var newElementX = $scope.data.point.x + deltaX;
                return newElementX >= 0 && newElementX + 150 <= $scope.canvas.width;
            };

            function withinYBounds(deltaY) {
                var newElementY = $scope.data.point.y + deltaY;
                
                return newElementY >= 0 && newElementY + 127 <= $scope.canvas.height;
            };
            
            element.on('mouseup', function(event) {                
                // Reset start point for next potential click
                startPoint = $scope.data.point;
                    
                console.log("mouseup");
                
                $document.off('mousemove', mouseMove);
            });
        }
    };
}])
.controller('draggableController', ['$scope', function draggableController($scope) {
    console.log("Draggable controller initialized");
}])
.directive('pcNode', ['$document', function($document) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            canvas: '='
        },
        // Supposedly fixes SVG custom elements
        templateNamespace: 'svg',
        replace: true,
        
        controller: 'pcNodeController',
        template: '<use xlink:href="#pcNode" ng-attr-id="{{ data.id }}" ng-attr-x="{{ data.point.x }}" ng-attr-y="{{ data.point.y }}" width="150" height="127" draggable/>',
        link: function($scope, element, attr) {
            
        }
    };
}])
.controller('pcNodeController', ['$scope', function pcNodeController($scope) {
    console.log("pcNodeController");
    
}]);