angular.module('websiteApp.Animation', [])

.directive('pcNode', ['$document', function($document) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            canvasHeight: '=',
            canvasWidth: "="
        },
        // Supposedly fixes SVG custom elements
        templateNamespace: 'svg',
        replace: true,
        
        controller: 'pcNodeController',
        template: '<use xlink:href="#pcNode" ng-attr-id="{{ data.id }}" ng-attr-x="{{ data.point.x }}" ng-attr-y="{{ data.point.y }}" width="150" height="127" ng-class="{selected: data.selected}"/>',
        link: function($scope, element, attr) {
            var startPoint = {
                x: $scope.data.point.x,
                y: $scope.data.point.y
            };
            
            var offsetPoint = {
                x: 0,
                y: 0
            };
            
            var canvas = {
                height: $scope.canvasHeight,
                width: $scope.canvasWidth
            };
            
            console.log($scope.canvasHeight);
            console.log(canvas);
            
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
                return newElementX >= 0 && newElementX + 150 <= canvas.width;
            };

            function withinYBounds(deltaY) {
                var newElementY = $scope.data.point.y + deltaY;
                
                return newElementY >= 0 && newElementY + 127 <= canvas.height;
            };
            
            element.on('mouseup', function(event) {                
                if (JSON.stringify(startPoint) == JSON.stringify($scope.data.point))
                {
                    // Select this item
                    $scope.data.selected = true;
                    console.log("selected");
                }
                console.log("mouseup");
                
                $document.off('mousemove', mouseMove);
            });
        }
    };
}])
.controller('pcNodeController', ['$scope', function pcNodeController($scope) {
    console.log("pcNodeController");
    console.log($scope.data);
}]);