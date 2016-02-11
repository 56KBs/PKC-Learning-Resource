angular.module('websiteApp.MathService', []);

angular.module('websiteApp.MathService').service('MathService', function()
{
    this.IntDivide = function (numerator, denominator) {
        if (denominator == 0) {
            throw "Division by zero";
        }

        return Math.floor(numerator / denominator);
    };

	this.GreatestCommonFactor = function (a, b) {
	    return bigInt.gcd(a, b);
	};

	this.ModularMultiplicativeInverse = function (a, b) {
	    var t = bigInt(0);
	    var newT = bigInt(1);
	    var r = bigInt(b);
	    var newR = bigInt(a);

	    if (a < 0 || b < 0) {
	        throw "Inputs cannot be negative";
	    }

	    while (newR != 0) {
	        var quotient = r.divide(newR);

	        var temp = newT;
	        newT = t.subtract(quotient.multiply(temp));
	        t = temp;

	        temp = newR;
	        newR = r.subtract(quotient.multiply(temp));
	        r = temp;
	    }

	    if (r > 1) {
	        throw "Inputs are not coprime";
	    }

	    if (t < 0) {
	        t = t.add(b);
	    }

	    return t;
	};

	this.EulerTotientRSA = function (n, p, q) {
	    // This is a simplified version, specific to RSA usage
	    var n = bigInt(n);
	    var p = bigInt(p);
	    var q = bigInt(q);

	    return n.subtract(p.plus(q.subtract(1)));
	};

	this.GenerateCoprime = function (a) {
	    var random = bigInt.randBetween(1, bigInt(a).subtract(1));

	    while (!this.IsCoprime(a, random.toString())) {
	        random = bigInt.randBetween(1, bigInt(a).subtract(1));
	    }

	    return random;
	};

	this.GeneratePrimeFromBits = function (bitLength) {
	    var randomPrime = this.GenerateRandomFromBits(bitLength);

	    while (!randomPrime.isPrime()) {
	        randomPrime = this.GenerateRandomFromBits(bitLength);
	    }

	    return randomPrime.toString();
	};

	this.GenerateRandomFromBits = function (bitLength) {
	    var numbers = this.BitsToNumbers(bitLength);

	    return this.GenerateRandom(numbers.min, numbers.max);
	};

	this.GenerateRandom = function (min, max) {
	    return bigInt.randBetween(min, max);
	};

	this.IsEven = function (number) {
	    return number % 2 === 0;
	};

	this.IsOdd = function (number) {
	    return !this.IsEven(number);
	};

	this.IsCoprime = function (a, b) {
	    return this.GreatestCommonFactor(a, b) == 1 ? true : false;
	};

	this.BitLength = function (a) {
	    return bigInt(a).toString(2).length;
	};

	this.BaseLog = function (a, b) {
	    return Math.log(b) / Math.log(a);
	};

	this.BitsToNumbers = function (bitLength) {
	    var min = bigInt(2).pow(bitLength - 1);
	    var max = bigInt(2).pow(bitLength).subtract(1);

	    return { 'min': min.toString(), 'max': max.toString() };
	};
});