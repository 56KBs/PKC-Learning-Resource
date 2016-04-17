angular.module('websiteApp.AnimationDirectives', ['websiteApp.AnimationDirectives', 'websiteApp.AnimationService', 'websiteApp.EncryptionFactory']);

angular.module('websiteApp.AnimationDirectives')

.directive('graphicsArea', function()
{
	return {
		restrict: 'E',
		templateUrl: 'templates/graphicsTemplate.html',
		scope: {
			graphicsData: "=",
            canvasWidth: "=",
            canvasHeight: "=",
            communication: "="
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

.controller('graphicsController', ['$scope', 'AnimationService', 'EncryptionFactory', function graphicsController($scope, AnimationService, EncryptionFactory)
{
    $('#digestPopoverSendAPub').popover();
    $('#digestPopoverSendAPriv').popover();
    $('#digestPopoverSendBPub').popover();
    $('#digestPopoverSendBPriv').popover();
    $('#digestPopoverSendNone').popover();

    $('#encryptionPopoverSendAPub').popover();
    $('#encryptionPopoverSendAPriv').popover();
    $('#encryptionPopoverSendBPub').popover();
    $('#encryptionPopoverSendBPriv').popover();
    $('#encryptionPopoverSendNone').popover();


    // Default data for testing with
	$scope.graphicsData = {
		nodes: {
			sourceNode: {
				id: "sourceNode",
				name: "Example Node",
				point: {
					x: 0,
					y: 0
				}
			},
			destinationNode: {
				id: "destinationNode",
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
				    nodeId: "sourceNode"
				},
				destination: {
				    nodeId: "destinationNode"
				},
				colour: "#3474BA"
			}
		}
	};

	$scope.communication;
	$scope.communicate = false;
    
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

    // Watch for MITM
    $scope.$watch('animateData.maninthemiddle', function(newValue, oldValue) {
    	if (newValue == true)
    	{
	    	$scope.graphicsData.nodes.mitmNode = {
	    		id: "mitmNode",
				name: "Example Node #2",
				point: {
					x: 225,
					y: 100
				}
	    	}

	    	$scope.graphicsData.links.connection1.destination.nodeId = "mitmNode";
	    	$scope.graphicsData.links.connection1.colour = "#EE2737";

	    	$scope.graphicsData.links.mitmConnection = {
	    		"id": "mitmConnection",
				"source": {
					"nodeId": "mitmNode"
				},
				"destination": {
					"nodeId": "destinationNode"
				},
				colour: "#EE2737"
	    	}
	    }
	    else
	    {
	    	if ($scope.graphicsData.nodes.mitmNode != null)
	    	{
	    		$scope.graphicsData.links.connection1.destination.nodeId = "destinationNode";
	    		$scope.graphicsData.links.connection1.colour = "#3474BA";
	    		delete $scope.graphicsData.nodes.mitmNode;
	    		delete $scope.graphicsData.links.mitmConnection;
	    	}
	    }
    });

    $scope.decryptMessage = function(key, message)
    {
    	var decrypted = $scope.decrypt(key, message);
    	$scope.communication.decrypted.plaintext = decrypted

    	// Check if message digests are on
    	if ($scope.animationData.authentication == true && decrypted.indexOf(')') > -1)
    	{
    		var closingBracket = decrypted.indexOf(')');
    		$scope.communication.decrypted.encryptedDigest = decrypted.substring(1, closingBracket);
    		$scope.communication.decrypted.plaintextMessage = decrypted.substring(closingBracket + 1, decrypted.length);
    	}
    }

    $scope.decryptDigestEve = function(key, message)
    {
    	$scope.communication.eavesdropping.decryptedDigest = $scope.decrypt(key, message);

    	console.log($scope.communication.eavesdropping.decryptedDigest == $scope.communication.message.digest.plaintext);
    }

    $scope.decryptMessageEve = function(key, message)
    {
    	var decrypted = $scope.decrypt(key, message);
    	$scope.communication.eavesdropping.plaintext = decrypted

    	// Check if message digests are on
    	if ($scope.animationData.authentication == true && decrypted.indexOf(')') > -1)
    	{
    		var closingBracket = decrypted.indexOf(')');
    		$scope.communication.eavesdropping.encryptedDigest = decrypted.substring(1, closingBracket);
    		$scope.communication.eavesdropping.plaintextMessage = decrypted.substring(closingBracket + 1, decrypted.length);
    	}
    }

    $scope.decryptDigest = function(key, message)
    {
    	$scope.communication.decrypted.decryptedDigest = $scope.decrypt(key, message);

    	console.log($scope.communication.decrypted.decryptedDigest == $scope.communication.message.digest.plaintext);
    }

    $scope.decrypt = function(key, message)
    {
    	console.log("Key: " + key + "   Message: " + message);
    	if (key == null)
    	{
    		return message;
    	}
    	else
    	{
    		return EncryptionFactory.DecryptData(message, key);
    	}
    }

    $scope.encryptMessage = function(key, message)
    {
    	$scope.communication.message.ciphertext = $scope.encrypt(key, message);
    }

    $scope.encryptDigest = function(key, message)
    {
    	$scope.communication.message.digest.ciphertext = $scope.encrypt(key, "" + message);
    	$scope.communication.message.toEncrypt = "(" + $scope.communication.message.digest.ciphertext + ")" + $scope.communication.plaintext;
    }

    $scope.encrypt = function(key, message)
    {
    	console.log("Key: " + key + "   Message: " + message);
    	if (key == null)
    	{
    		return message;
    	}
    	else
    	{
    		return EncryptionFactory.EncryptData(message, key);
    	}
    }

    hash = function(message)
    {
    	var hash = 0;
		if (message.length == 0) return hash;
		for (i = 0; i < message.length; i++) {
			char = message.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash);
    }

    $scope.sendToBob = function()
    {
    	$scope.communication.aliceSent = true;

    	if ($scope.animationData.maninthemiddle != true)
    	{
    		$scope.graphicsData.nodes.sourceNode.opacity = "0.3";
    		$scope.graphicsData.nodes.destinationNode.opacity = "1";

	    	if ($scope.graphicsData.nodes.mitmNode != null)
	    	{
	    		$scope.graphicsData.nodes.mitmNode.opacity = "0.3";
	    	}

	    	$scope.communication.bobDecryption = true;
	    }
	    else
	    {
	    	$scope.graphicsData.nodes.sourceNode.opacity = "0.3";
	    	$scope.graphicsData.nodes.destinationNode.opacity = "0.3";

	    	if ($scope.graphicsData.nodes.mitmNode != null)
	    	{
	    		$scope.graphicsData.nodes.mitmNode.opacity = "1";
	    	}

	    	$scope.communication.mitmDecryption = true;
	    }
    }

    $scope.continueToBob = function()
    {
    	$scope.graphicsData.nodes.sourceNode.opacity = "0.3";
    	$scope.graphicsData.nodes.destinationNode.opacity = "1";

    	if ($scope.graphicsData.nodes.mitmNode != null)
    	{
    		$scope.graphicsData.nodes.mitmNode.opacity = "0.3";
    	}

    	$scope.communication.mitmDecryption = false;
    	$scope.communication.bobDecryption = true;
    }

    $scope.animationData;

    $scope.animate = function(animationData)
    {
    	$scope.communicate = true;

    	$scope.graphicsData.nodes.sourceNode.opacity = "1";
    	$scope.graphicsData.nodes.destinationNode.opacity = "0.3";

    	if ($scope.graphicsData.nodes.mitmNode != null)
    	{
    		$scope.graphicsData.nodes.mitmNode.opacity = "0.3";
    	}

    	var aliceKeys = EncryptionFactory.GenerateKeys(true, 32);
    	aliceKeys.publicKey.pretty = aliceKeys.publicKey.modulus + ";" + aliceKeys.publicKey.exponent;
		aliceKeys.privateKey.pretty = aliceKeys.privateKey.modulus + ";" + aliceKeys.privateKey.exponent;

		var bobKeys = EncryptionFactory.GenerateKeys(true, 32);
    	bobKeys.publicKey.pretty = bobKeys.publicKey.modulus + ";" + bobKeys.publicKey.exponent;
		bobKeys.privateKey.pretty = bobKeys.privateKey.modulus + ";" + bobKeys.privateKey.exponent;

    	$scope.communication = {
    		alice: aliceKeys,
    		bob: bobKeys,
    		plaintext: animationData.plaintext,
    		aliceSent: false,
    		bobDecryption: false,
    		mitmDecryption: false,
    		message: {
    			digest: {
    				plaintext: "",
    				authenticated: ""
    			}
    		},
    		decrypted: {
    			plaintext: "",
    			plaintextMessage: "",
    			encryptedDigest: "",
    			decryptedDigest: ""
    		},
    		eavesdropping: {
    			plaintext: "",
    			plaintextMessage: "",
    			encryptedDigest: "",
    			decryptedDigest: ""
    		}
    	}

    	$scope.animationData = animationData;

    	if (animationData.authentication == true)
    	{
    		$scope.communication.message.digest.plaintext = hash(animationData.plaintext);
    	}
    	else
    	{
    		$scope.communication.message.toEncrypt = $scope.communication.plaintext;
    	}
    }

	console.log("Graphics Controller");
}])