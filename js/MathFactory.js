angular.module('websiteApp.MathFactory', []);

angular.module('websiteApp.MathFactory').factory('MathFactory', function()
{
	var MathFactory = {};

	MathFactory.IntDivide = function(numerator, denominator)
	{
		if (denominator == 0)
		{
			throw "Division by zero";
		}

		return Math.floor(numerator / denominator);
	}

	return MathFactory;
});