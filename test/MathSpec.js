describe("MathService", function() {
	var MathService;

	beforeEach(module('websiteApp.MathService'));
	beforeEach(inject(function (_MathService_) {
		MathService = _MathService_;
	}));

	// Custom matcher to make .toIntEqual() use Integer.Equals()
	var customEquality = {
		toBigIntEqual: function()
		{
			return {
				compare: function(actual, expected)
				{
					if (expected === undefined)
					{
						expected = '';
					}

					var result = {};

					result.pass = actual.equals(expected);

					if (result.pass)
					{
						result.message = "Expected " + actual + " to be " + expected;
					}
					else
					{
						result.message = "Expected " + actual + " to be " + expected;
					}

					return result;
				}				
			}
		}
	};

	beforeEach(function() {
		jasmine.addMatchers(customEquality);
	});

	describe("IntDivide", function() {
		it("correctly divides positive numbers", function() {
			expect(MathService.IntDivide(9, 3)).toEqual(3);
			expect(MathService.IntDivide(9, 2)).toEqual(4);
			expect(MathService.IntDivide(8, 2)).toEqual(4);
			expect(MathService.IntDivide(3, 2)).toEqual(1);
		});

		it("correctly divides negative numbers", function() {
			// Negative numerator
			expect(MathService.IntDivide(-9, 3)).toEqual(-3);
			expect(MathService.IntDivide(-9, 2)).toEqual(-5);
			expect(MathService.IntDivide(-8, 2)).toEqual(-4);
			expect(MathService.IntDivide(-3, 2)).toEqual(-2);

			// Negative denominator
			expect(MathService.IntDivide(9, -3)).toEqual(-3);
			expect(MathService.IntDivide(9, -2)).toEqual(-5);
			expect(MathService.IntDivide(8, -2)).toEqual(-4);
			expect(MathService.IntDivide(3, -2)).toEqual(-2);

			// Negative numerator and denominator
			expect(MathService.IntDivide(-9, -3)).toEqual(3);
			expect(MathService.IntDivide(-9, -2)).toEqual(4);
			expect(MathService.IntDivide(-8, -2)).toEqual(4);
			expect(MathService.IntDivide(-3, -2)).toEqual(1);			
		});

		it("throws exception on division by 0", function() {
			expect(function() { MathService.IntDivide(1, 0); }).toThrow("Division by zero");
		});
	});

	describe("IsEven", function() {
		it("correctly identifies even numbers", function() {
			expect(MathService.IsEven(2)).toBe(true);
			expect(MathService.IsEven(10368548)).toBe(true);
			expect(MathService.IsEven(23453212)).toBe(true);
		});

		it("correctly identifies odd numbers", function() {
			expect(MathService.IsEven(3)).toBe(false);
			expect(MathService.IsEven(46541)).toBe(false);
			expect(MathService.IsEven(13245)).toBe(false);
		});
	});

	describe("IsOdd", function() {
		it("correctly identifies even numbers", function() {
			expect(MathService.IsOdd(2)).toBe(false);
			expect(MathService.IsOdd(10368548)).toBe(false);
			expect(MathService.IsOdd(23453212)).toBe(false);
		});

		it("correctly identifies odd numbers", function() {
			expect(MathService.IsOdd(3)).toBe(true);
			expect(MathService.IsOdd(46541)).toBe(true);
			expect(MathService.IsOdd(13245)).toBe(true);
		});
	});

	describe("IsCoprime", function() {
		it("correctly identifies coprimes", function() {
			expect(MathService.IsCoprime(4789, 465)).toBe(true);
		});

		it("correctly identifies non-coprimes", function() {
			expect(MathService.IsCoprime(132, 45)).toBe(false)
		});
	});

	describe("BitLength", function() {
		it("correctly identifies the bit length", function() {
			expect(MathService.BitLength(2)).toEqual(2);
			expect(MathService.BitLength(1)).toEqual(1);
			expect(MathService.BitLength(0)).toEqual(1);
			expect(MathService.BitLength(50)).toEqual(6);
			expect(MathService.BitLength(2389)).toEqual(12);
			expect(MathService.BitLength("2389")).toEqual(12);
			expect(MathService.BitLength("9876986759764754584856347347")).toEqual(93);
		});
	});

	describe("GreatestCommonFactor", function() {
		it("correctly identifies greatest common factors", function() {
			expect(MathService.GreatestCommonFactor(10, 2)).toBigIntEqual(2);
			expect(MathService.GreatestCommonFactor(24, 108)).toBigIntEqual(12);
			expect(MathService.GreatestCommonFactor(9, 12)).toBigIntEqual(3);
			expect(MathService.GreatestCommonFactor(100, 17)).toBigIntEqual(1);
			expect(MathService.GreatestCommonFactor(0, 100)).toBigIntEqual(100);
			expect(MathService.GreatestCommonFactor(100, 0)).toBigIntEqual(100);
		});
	});

	describe("EulerTotientRSA", function() {
		it("correctly calculates the Euler Totient for RSA primes", function() {
			expect(MathService.EulerTotientRSA(91, 7, 13)).toBigIntEqual(72);
		});
	});

	describe("GenerateCoprime", function() {
		it("correctly calculates a coprime", function() {
			expect(MathService.IsCoprime(50, MathService.GenerateCoprime(50))).toBe(true);
			expect(MathService.IsCoprime(700, MathService.GenerateCoprime(700))).toBe(true);
		});
	});

	describe("GenerateRandom", function() {
		it("correctly generates a number within the limits", function() {
			var random = MathService.GenerateRandom(1, 900);
			expect(random).toBeGreaterThan(0);
			expect(random).toBeLessThan(901);

			var random = MathService.GenerateRandom(1, 10);
			expect(random).toBeGreaterThan(0);
			expect(random).toBeLessThan(11);

			var random = MathService.GenerateRandom(700, 900);
			expect(random).toBeGreaterThan(701);
			expect(random).toBeLessThan(901);

			var random = MathService.GenerateRandom(700, 900);
			expect(random).toBeGreaterThan(701);
			expect(random).toBeLessThan(901);
		});
	});

	describe("ModularMultiplicativeInverse", function() {
		it("correctly calculates the modular multiplicative inverse", function() {
			expect(MathService.ModularMultiplicativeInverse(7, 26)).toBigIntEqual(15);
			expect(MathService.ModularMultiplicativeInverse(37, 216)).toBigIntEqual(181);
			expect(MathService.ModularMultiplicativeInverse(17, 3120)).toBigIntEqual(2753);
			expect(MathService.ModularMultiplicativeInverse(1, 1)).toBigIntEqual(1);
		});

		it("correctly throws exception on non-coprimes", function() {
			expect(function() { MathService.ModularMultiplicativeInverse(654, 42); }).toThrow("Inputs are not coprime");
		});

		it("correctly throws on negative values", function() {
			expect(function() { MathService.ModularMultiplicativeInverse(-7, 26); }).toThrow("Inputs cannot be negative");
			expect(function() { MathService.ModularMultiplicativeInverse(7, -26); }).toThrow("Inputs cannot be negative");
			expect(function() { MathService.ModularMultiplicativeInverse(-7, -26); }).toThrow("Inputs cannot be negative");
		});
	});

	/*describe("GeneratePrime", function() {
		it("correctly outputs a value of the specified bit length", function() {
			expect(MathService.BitLength(MathService.GeneratePrime(30))).toEqual(30);
		});
	});*/

	/*describe("IsPrime", function() {
		it("correctly identifies prime numbers", function() {
			expect(MathService.IsPrime(101)).toBe(true);
			expect(MathService.IsPrime(827)).toBe(true);
			expect(MathService.IsPrime(1693)).toBe(true);
			expect(MathService.IsPrime(3461)).toBe(true);
			expect(MathService.IsPrime(5869)).toBe(true);
			expect(MathService.IsPrime(9587)).toBe(true);
			expect(MathService.IsPrime(605727251)).toBe(true);
		});

		it("correctly identifies non-prime numbers", function() {
			expect(MathService.IsPrime(1692)).toBe(false);
			expect(MathService.IsPrime(9225)).toBe(false);
			expect(MathService.IsPrime(7743)).toBe(false);
			expect(MathService.IsPrime(341)).toBe(false);
		});
	});*/

	describe("BaseLog", function() {
		it("correctly calculates the log", function() {
			expect(MathService.BaseLog(2, 128)).toEqual(7);
			expect(MathService.BaseLog(8, 64)).toEqual(2);
			expect(MathService.BaseLog(8, 512)).toEqual(3);
		});
	});

	describe("BitsToNumbers", function()
	{
		it("correctly calculates the maximum value of a bit", function() {
			expect(MathService.BitsToNumbers(32)['max']).toEqual("4294967295");
			expect(MathService.BitsToNumbers(16)['max']).toEqual("65535");

		});

		it("correctly calculates the minimum value of a bit", function() {
			expect(MathService.BitsToNumbers(32)['min']).toEqual("2147483648");
			expect(MathService.BitsToNumbers(16)['min']).toEqual("32768");
		});
	});
});
