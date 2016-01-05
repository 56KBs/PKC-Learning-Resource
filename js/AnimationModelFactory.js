angular.module('websiteApp.AnimationModelFactory', []);

angular.module('websiteApp.AnimationModelFactory').factory('AnimationModelFactory', function (JSON) {
    var AnimationModel = {};

    animationModel.model = {};

    // Default data for testing with
    animationModel.model = {
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

    return animationModel;
});