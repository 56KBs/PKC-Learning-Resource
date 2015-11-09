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
		return bigInt.gcd(a, b);
	}

	MathFactory.ModularMultiplicativeInverse = function(a, b)
	{
		var t = bigInt(0);
		var newT = bigInt(1);
		var r = bigInt(b);
		var newR = bigInt(a);

		if (a < 0 || b < 0)
		{
			throw "Inputs cannot be negative";
		}

		while (newR != 0)
		{
			var quotient = r.divide(newR);

			var temp = newT;
			newT = t.subtract(quotient.multiply(temp));
			t = temp;

			temp = newR;
			newR = r.subtract(quotient.multiply(temp));
			r = temp;
		}

		if (r > 1)
		{
			throw "Inputs are not coprime";
		}

		if (t < 0)
		{
			t = t.add(b);
		}

		return t;
	}

	MathFactory.EulerTotientRSA = function(n, p, q)
	{
		// This is a simplified version, specific to RSA usage
		var n = bigInt(n);
		var p = bigInt(p);
		var q = bigInt(q);

		return n.subtract(p.plus(q.subtract(1)));
	}

	MathFactory.GenerateCoprime = function(a)
	{
		var random = bigInt.randBetween(1, bigInt(a).subtract(1));
		
		while (!MathFactory.IsCoprime(a, random.toString()))
		{
			random = bigInt.randBetween(1, bigInt(a).subtract(1));
		}

		return random;
	}

	MathFactory.GeneratePrimeFromBits = function(bitLength)
	{
		var randomPrime = MathFactory.GenerateRandomFromBits(bitLength);

		while (!randomPrime.isPrime())
		{
			randomPrime = MathFactory.GenerateRandomFromBits(bitLength);
		}

		return randomPrime.toString();
	}

	MathFactory.GenerateRandomFromBits = function(bitLength)
	{
		var numbers = MathFactory.BitsToNumbers(bitLength);

		return MathFactory.GenerateRandom(numbers.min, numbers.max);
	}

	MathFactory.GenerateRandom = function(min, max)
	{
		return bigInt.randBetween(min, max);
	}

	MathFactory.IsEven = function(number)
	{
		return number % 2 === 0;
	}

	MathFactory.IsOdd = function(number)
	{
		return !MathFactory.IsEven(number);
	}

	MathFactory.IsCoprime = function(a, b)
	{
		return MathFactory.GreatestCommonFactor(a, b) == 1 ? true : false;
	}

	MathFactory.BitLength = function(a)
	{
		return bigInt(a).toString(2).length;
	}

	MathFactory.BaseLog = function(a, b)
	{
		return Math.log(b) / Math.log(a);
	}

	MathFactory.BitsToNumbers = function(bitLength)
	{
		var min = bigInt(2).pow(bitLength - 1);
		var max = bigInt(2).pow(bitLength).subtract(1);

		return {'min': min.toString(), 'max': max.toString()};
	}

	return MathFactory;
});