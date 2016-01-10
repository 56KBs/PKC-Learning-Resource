angular.module('websiteApp.AnimationDirectives', ['websiteApp.AnimationDirectives', 'websiteApp.AnimationService']);

angular.module('websiteApp.AnimationDirectives')

.directive('graphicsArea', function()
{
	return {
		restrict: 'E',
		templateUrl: 'templates/graphicsTemplate.html',
		scope: {
			graphicsData: "=",
            canvasWidth: "=",
            canvasHeight: "="
		},
		controller: 'graphicsController'
	}
})

/*.directive('graphicsAreaData', function()
{
    return {
        restrict: 'E',
        template: 'Graphics Data: {{ graphicsData }}',
        controller: 'graphicsController'
    }
})*/

.controller('graphicsController', ['$scope', 'AnimationService', function graphicsController($scope, AnimationService)
{
    // Default data for testing with
	$scope.graphicsData = {
		nodes: {
			pcNode1: {
				id: "pcNode1",
				name: "Example Node",
				point: {
					x: 0,
					y: 0
				},
				selected: false,
			    options: {
			        draggable: true
	            }
			},
			pcNode2: {
				id: "pcNode2",
				name: "Example Node #2",
				point: {
					x: 450,
					y: 0
				},
				selected: false,
				options: {
				    draggable: true
				}
			}
		},
		links: {
			connection1: {
				id: "connection1",
				source: {
					nodeId: "pcNode1"
				},
				destination: {
					nodeId: "pcNode2"
				},
				selected: false,
				options: {
				    draggable: true
				}
			}
		}
	};
    
    $scope.canvas = {
		width: $scope.canvasWidth,
		height: $scope.canvasHeight
	};

	console.log("Graphics Controller");
}])