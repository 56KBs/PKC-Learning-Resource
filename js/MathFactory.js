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

	MathFactory.GreatestCommonFactor = function(a, b)
	{
		if (a == b)
		{
			return a;
		}
		else if (a == 0)
		{
			return b;
		}
		else if (b == 0)
		{
			return a;
		}

		if (MathFactory.IsEven(a))
		{
			if (MathFactory.IsEven(b))
			{
				return MathFactory.GreatestCommonFactor(MathFactory.IntDivide(a, 2), MathFactory.IntDivide(b, 2)) * 2;
			}
			else
			{
				return MathFactory.GreatestCommonFactor(MathFactory.IntDivide(a, 2), b);
			}
		}
		else
		{
			if (MathFactory.IsEven(b))
			{
				return MathFactory.GreatestCommonFactor(a, MathFactory.IntDivide(b, 2));
			}
			else
			{
				if (a >= b)
				{
					return MathFactory.GreatestCommonFactor(MathFactory.IntDivide((a-b), 2), b);
				}
				else
				{
					return MathFactory.GreatestCommonFactor(a, MathFactory.IntDivide((b-a), 2));
				}
			}
		}
	}

	MathFactory.EulerTotientRSA = function(n, p, q)
	{
		// This is a simplified version, specific to RSA usage
		return (n - (p + q - 1));
	}

	MathFactory.IsEven = function(number)
	{
		return number % 2 === 0;
	}

	MathFactory.IsOdd = function(number)
	{
		return !MathFactory.IsEven(number);
	}

	return MathFactory;
});