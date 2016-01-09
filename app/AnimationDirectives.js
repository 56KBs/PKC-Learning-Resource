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

	/*var selectedNodeId = null;
	var isDragging = false;
	var mousePoint = {
	    x: 0,
	    y: 0
	};

	$scope.getNodeX = function (nodeId, graphicsData)
	{
		return AnimationService.getSourcePointX(nodeId, graphicsData);
	}

	$scope.getNodeY = function(nodeId, graphicsData)
	{
		return AnimationService.getSourcePointY(nodeId, graphicsData);
	}

	function updateMousePoint(element)
	{
	    mousePoint.x = element.pageX;
	    mousePoint.y = element.pageY;
	}

	$scope.mouseDown = function(element, $event)
	{
	    console.log(element);
	    try
	    {
	        var selectedNode = AnimationService.getId(element);
	        
	        updateMousePoint(element);
	        isDragging = true;
	    }
	    catch (AttributeNotFoundException)
	    {
	        // Clean up if no nodes selected
	        deselectNode();
	    }
	};

	function deselectNode()
	{
	    if (selectedNodeId != null)
	    {
	        $scope.graphicsData.nodes[selectedNodeId].selected = false;
	    }
	}

	$scope.mouseUp = function(element, $event)
	{
	    if (hasMouseMoved(element))
	    {
	        isDragging = false;
	    }
	    else
	    {
	        setSelectedElement(element);
	        isDragging = false;
	    }
	};

	function hasMouseMoved(element)
	{
	    if (mousePoint.x == element.pageX && mousePoint.y == element.pageY)
	    {
	        return false;
	    }

	    return true;
	}

	function setSelectedElement(element)
	{
	    try
	    {
	        selectedNodeId = AnimationService.getId(element);
	        $scope.graphicsData.nodes[selectedNodeId].selected = true;
	    }
	    catch (ElementNotFoundException)
	    {
            // No catching needed yet
	    }

	    console.log(selectedNodeId);
	}

	$scope.mouseMove = function(element, $event)
	{
		if (isDragging)
		{
			var deltaX = element.pageX - mousePoint.x;
			var deltaY = element.pageY - mousePoint.y;

			if (AnimationService.withinXBounds(deltaX, element, $scope.canvas.width))
			{
				$scope.graphicsData.nodes[AnimationService.getId(element)].point.x += deltaX;
				mousePoint.x = element.pageX;
			}

			if (AnimationService.withinYBounds(deltaY, element, $scope.canvas.height))
			{
				$scope.graphicsData.nodes[AnimationService.getId(element)].point.y += deltaY;
				mousePoint.y = element.pageY;
			}
		}
	};

	$scope.isNodeSelected = function(nodeId)
	{
	    return nodeId == selectedNodeId;
	}*/

	console.log("Graphics Controller");
}])