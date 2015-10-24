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

	MathFactory.ModularMultiplicativeInverse = function(a, b)
	{
		var t = 0;
		var newT = 1;
		var r = b;
		var newR = a;

		if (a < 0 || b < 0)
		{
			throw "Inputs cannot be negative";
		}

		while (newR != 0)
		{
			var quotient = MathFactory.IntDivide(r, newR);

			var temp = newT;
			newT = t - quotient * temp;
			t = temp;

			temp = newR;
			newR = r - quotient * temp;
			r = temp;
		}

		if (r > 1)
		{
			throw "Inputs are not coprime";
		}

		if (t < 0)
		{
			t = t + b;
		}

		return t;
	}

	MathFactory.EulerTotientRSA = function(n, p, q)
	{
		// This is a simplified version, specific to RSA usage
		return (n - (p + q - 1));
	}

	MathFactory.GenerateCoprime = function(a)
	{
		var random = MathFactory.GenerateRandom(1, a - 1);
		
		while (!MathFactory.IsCoprime(a, random))
		{
			random = MathFactory.GenerateRandom(1, a - 1);
		}

		return random;
	}

	MathFactory.GeneratePrime = function(bitLength)
	{
		debugger;
		var prime = MathFactory.GenerateRandom((Math.pow(2, bitLength-1)), (Math.pow(2, bitLength)-1));

		while (!MathFactory.IsPrime(prime))
		{
			prime = MathFactory.GenerateRandom((Math.pow(2, bitLength-1)), (Math.pow(2, bitLength)-1));
		}

		return prime;
	}

	MathFactory.IsPrime = function(prime, accuracy)
	{
		debugger;
		var k = null;

		if (accuracy === undefined)
		{
			k = 40;
		}
		else
		{
			k = accuracy;
		}

		if (MathFactory.IsEven(prime))
		{
			return false;
		}

		// Validate primes with a Miller-Rabin primality test

		var r = null;
		var d = prime - 1;
		
		while (d % 2 === 0)
		{
			d /= 2;
			++r;
		}

		//var r = Math.floor(MathFactory.BaseLog(2, (prime - 1)));
		//var d = prime - Math.pow(2, r) - 1;

		for (var i = 0; i < k; i++)
		{
			var a = MathFactory.GenerateRandom(2, (prime - 2));
			var x = MathFactory.PowMod(a, d, prime);

			if (x == 1 || x == (prime - 1))
			{
				continue;
			}

			var broken = false;
			for (var j = 0; j < (r - 1); j++)
			{
				x = MathFactory.PowMod(x, 2, prime);

				if (x == 1)
				{
					return false;
				}
				else if (x == (prime - 1))
				{
					broken = true;
					break;
				}
			}

			if (broken)
			{
				break;
			}
			else
			{
				return false;
			}
		}

		return true;
	}

	MathFactory.GenerateRandom = function(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1) + min);
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
		return a.toString(2).length;
	}

	MathFactory.BaseLog = function(a, b)
	{
		return Math.log(b) / Math.log(a);
	}

	MathFactory.PowMod = function(a, b, c)
	{
		debugger;
		var result = a;

		for (var i = 0; i < (b - 1); i++)
		{
			var multiply = result * a;
			result = multiply % c;
		}

		return result;
	}

	return MathFactory;
});