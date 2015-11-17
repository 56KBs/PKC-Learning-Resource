angular.module('websiteApp.AnimationDirectives', ['websiteApp.AnimationDirectives', 'websiteApp.AnimationService']);

angular.module('websiteApp.AnimationDirectives')

.directive('graphicsArea', function()
{
	return {
		restrict: 'E',
		templateUrl: 'templates/graphicsTemplate.html',
		scope: {
			graphicsData: "="
		},
		controller: 'graphicsController'
	}
})

.controller('graphicsController', ['$scope', 'AnimationService', function graphicsController($scope, AnimationService)
{
	$scope.graphicsData = {
		nodes: {
			pcNode1: {
				id: "pcNode1",
				name: "Example Node",
				point: {
					x: 0,
					y: 0
				}
			},
			pcNode2: {
				id: "pcNode2",
				name: "Example Node #2",
				point: {
					x: 450,
					y: 0
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
				}
			}
		}
	};

	$scope.svgDimensions = {
		width: 800,
		height: 600
	};
	var isDragging = false;
	var mousePoint = {
		x: 0,
		y: 0
	};

	$scope.getNodeX = function(nodeId, graphicsData)
	{
		return AnimationService.getSourcePointX(nodeId, graphicsData);
	}

	$scope.getNodeY = function(nodeId, graphicsData)
	{
		return AnimationService.getSourcePointY(nodeId, graphicsData);
	}


	$scope.mouseDown = function(element, $event)
	{
		console.log(element);
		if (AnimationService.getId(element) != null)
		{
			mousePoint.x = element.pageX;
			mousePoint.y = element.pageY;
			isDragging = true;
		}
	};

	$scope.mouseUp = function(element, $event)
	{
		isDragging = false;
	};

	$scope.mouseMove = function(element, $event)
	{
		if (isDragging)
		{
			var deltaX = element.pageX - mousePoint.x;
			var deltaY = element.pageY - mousePoint.y;

			if (AnimationService.withinXBounds(deltaX, element, $scope.svgDimensions.width))
			{
				$scope.graphicsData.nodes[AnimationService.getId(element)].point.x += deltaX;
				mousePoint.x = element.pageX;
			}

			if (AnimationService.withinYBounds(deltaY, element, $scope.svgDimensions.height))
			{
				$scope.graphicsData.nodes[AnimationService.getId(element)].point.y += deltaY;
				mousePoint.y = element.pageY;
			}
		}
	};

	console.log("Graphics Controller");
}])