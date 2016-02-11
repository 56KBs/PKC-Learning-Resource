angular.module('websiteApp.AnimationService', []);

angular.module('websiteApp.AnimationService').service('AnimationService', function()
{
    this.getSymbolName = function (element) {
        return element.target.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    };

    this.getId = function (element) {
        var id = element.target.getAttribute("id");

        if (id == null)
        {
            throw "AttributeNotFoundException";
        }

        return id;
    };

    this.getWidth = function (element) {
        var width = parseInt(element.target.getAttribute("width"));

        if (width == null)
        {
            throw "AttributeNotFoundException";
        }

        return width;
    };

    this.getHeight = function (element) {
        var height = parseInt(element.target.getAttribute("height"));

        if (height == null)
        {
            throw "AttributeNotFoundException";
        }

        return height;
    };

    this.getX = function (element) {
        var x = parseInt(element.target.getAttribute("x"));

        if (x == null) {
            throw "AttributeNotFoundException";
        }

        return x;
    };

    this.getY = function (element) {
        var y = parseInt(element.target.getAttribute("y"));

        if (y == null) {
            throw "AttributeNotFoundException";
        }

        return y;
    };

    this.withinXBounds = function (deltaX, element, width) {
        var newElementX = this.getX(element) + deltaX;

        return newElementX >= 0 && newElementX + this.getWidth(element) <= width;
    };

    this.withinYBounds = function (deltaY, element, height) {
        var newElementY = this.getY(element) + deltaY;

        return newElementY >= 0 && newElementY + this.getHeight(element) <= height;
    };

    this.getSourcePointX = function (nodeId, graphicsData) {
        return graphicsData.nodes[nodeId].point.x;
    };

    this.getSourcePointY = function (nodeId, graphicsData) {
        return graphicsData.nodes[nodeId].point.y;
    };
});