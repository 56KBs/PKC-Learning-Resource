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

.directive('graphicsAreaData', function()
{
    return {
        restrict: 'E',
        scope: {
            graphicsData: "="
        },
        template: 'Graphics Data: {{ graphicsDataPrettified }}',
        link: function($scope, element, attr) {
            console.log($scope.graphicsData);
            $scope.$watch('graphicsData', function(newValue, oldValue) {
                $scope.graphicsDataPrettified = JSON.stringify($scope.graphicsData, null, 2);
            }, true);
        }
    }
})

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
				selected: false
			},
			pcNode2: {
				id: "pcNode2",
				name: "Example Node #2",
				point: {
					x: 450,
					y: 0
				},
				selected: false
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
				selected: false
			}
		},
        counters: {
            nextNodeId: 3
        }
	};
    
    $scope.canvas = {
		width: $scope.canvasWidth,
		height: $scope.canvasHeight
	};
    
    // Used for allowing links to follow the nodes
    $scope.getNodeX = function (nodeId, graphicsData)
	{
		return AnimationService.getSourcePointX(nodeId, graphicsData);
	}

	$scope.getNodeY = function(nodeId, graphicsData)
	{
		return AnimationService.getSourcePointY(nodeId, graphicsData);
	}
    
    // Control panel
    $scope.addNode = function()
    {
        var nextNodeId = $scope.graphicsData.counters.nextNodeId;
        
        $scope.graphicsData.nodes["pcNode" + nextNodeId] = {
            "id": nextNodeId,
            "name": "Example Node #" + nextNodeId,
            "point": {
                "x": 0,
                "y": 0
            },
            "selected": false
        }
        
        $scope.graphicsData.counters.nextNodeId++;
    }

	console.log("Graphics Controller");
}])