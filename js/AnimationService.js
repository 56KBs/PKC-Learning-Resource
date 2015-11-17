angular.module('websiteApp.AnimationService', []);

angular.module('websiteApp.AnimationService').service('AnimationService', function()
{
    this.getSymbolName = function (element) {
        return element.target.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    };

    this.getId = function (element) {
        return element.target.getAttribute("id");
    };

    this.getWidth = function (element) {
        return parseInt(element.target.getAttribute("width"));
    };

    this.getHeight = function (element) {
        return parseInt(element.target.getAttribute("height"));
    };

    this.getX = function (element) {
        return parseInt(element.target.getAttribute("x"));
    };

    this.getY = function (element) {
        return parseInt(element.target.getAttribute("y"));
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