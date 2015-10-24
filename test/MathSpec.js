describe("MathFactory", function() {
	var MathFactory;

	beforeEach(module('websiteApp.MathFactory'));
	beforeEach(inject(function (_MathFactory_) {
		MathFactory = _MathFactory_;
	}));

	describe("IntDivide", function() {
		it("correctly divides positive numbers", function() {
			expect(MathFactory.IntDivide(9, 3)).toEqual(3);
			expect(MathFactory.IntDivide(9, 2)).toEqual(4);
			expect(MathFactory.IntDivide(8, 2)).toEqual(4);
			expect(MathFactory.IntDivide(3, 2)).toEqual(1);
		});

		it("correctly divides negative numbers", function() {
			// Negative numerator
			expect(MathFactory.IntDivide(-9, 3)).toEqual(-3);
			expect(MathFactory.IntDivide(-9, 2)).toEqual(-5);
			expect(MathFactory.IntDivide(-8, 2)).toEqual(-4);
			expect(MathFactory.IntDivide(-3, 2)).toEqual(-2);

			// Negative denominator
			expect(MathFactory.IntDivide(9, -3)).toEqual(-3);
			expect(MathFactory.IntDivide(9, -2)).toEqual(-5);
			expect(MathFactory.IntDivide(8, -2)).toEqual(-4);
			expect(MathFactory.IntDivide(3, -2)).toEqual(-2);

			// Negative numerator and denominator
			expect(MathFactory.IntDivide(-9, -3)).toEqual(3);
			expect(MathFactory.IntDivide(-9, -2)).toEqual(4);
			expect(MathFactory.IntDivide(-8, -2)).toEqual(4);
			expect(MathFactory.IntDivide(-3, -2)).toEqual(1);			
		});

		it("throws exception on division by 0", function() {
			expect(function() { MathFactory.IntDivide(1, 0); }).toThrow("Division by zero");
		});
	});

	describe("IsEven", function() {
		it("correctly identifies even numbers", function() {
			expect(MathFactory.IsEven(2)).toBe(true);
			expect(MathFactory.IsEven(10368548)).toBe(true);
			expect(MathFactory.IsEven(23453212)).toBe(true);
		});

		it("correctly identifies odd numbers", function() {
			expect(MathFactory.IsEven(3)).toBe(false);
			expect(MathFactory.IsEven(46541)).toBe(false);
			expect(MathFactory.IsEven(13245)).toBe(false);
		});
	});

	describe("IsOdd", function() {
		it("correctly identifies even numbers", function() {
			expect(MathFactory.IsOdd(2)).toBe(false);
			expect(MathFactory.IsOdd(10368548)).toBe(false);
			expect(MathFactory.IsOdd(23453212)).toBe(false);
		});

		it("correctly identifies odd numbers", function() {
			expect(MathFactory.IsOdd(3)).toBe(true);
			expect(MathFactory.IsOdd(46541)).toBe(true);
			expect(MathFactory.IsOdd(13245)).toBe(true);
		});
	});

	describe("IsCoprime", function() {
		it("correctly identifies coprimes", function() {
			expect(MathFactory.IsCoprime(4789, 465)).toBe(true);
		});

		it("correctly identifies non-coprimes", function() {
			expect(MathFactory.IsCoprime(132, 45)).toBe(false)
		});
	});

	describe("BitLength", function() {
		it("correctly identifies the bit length", function() {
			expect(MathFactory.BitLength(2)).toEqual(2);
			expect(MathFactory.BitLength(1)).toEqual(1);
			expect(MathFactory.BitLength(0)).toEqual(1);
			expect(MathFactory.BitLength(50)).toEqual(6);
			expect(MathFactory.BitLength(2389)).toEqual(12);
			expect(MathFactory.BitLength(9876986759764754584856347347)).toEqual(93);
		});
	});

	describe("GreatestCommonFactor", function() {
		it("correctly identifies greatest common factors", function() {
			expect(MathFactory.GreatestCommonFactor(10, 2)).toEqual(2);
			expect(MathFactory.GreatestCommonFactor(24, 108)).toEqual(12);
			expect(MathFactory.GreatestCommonFactor(9, 12)).toEqual(3);
			expect(MathFactory.GreatestCommonFactor(100, 17)).toEqual(1);
			expect(MathFactory.GreatestCommonFactor(0, 100)).toEqual(100);
			expect(MathFactory.GreatestCommonFactor(100, 0)).toEqual(100);
		});
	});

	describe("EulerTotientRSA", function() {
		it("correctly calculates the Euler Totient for RSA primes", function() {
			expect(MathFactory.EulerTotientRSA(91, 7, 13)).toEqual(72);
		});
	});

	describe("GenerateCoprime", function() {
		it("correctly calculates a coprime", function() {
			expect(MathFactory.IsCoprime(50, MathFactory.GenerateCoprime(50))).toBe(true);
			expect(MathFactory.IsCoprime(700, MathFactory.GenerateCoprime(700))).toBe(true);
		});
	});

	describe("GenerateRandom", function() {
		it("correctly generates a number within the limits", function() {
			var random = MathFactory.GenerateRandom(1, 900);
			expect(random).toBeGreaterThan(0);
			expect(random).toBeLessThan(901);

			var random = MathFactory.GenerateRandom(1, 10);
			expect(random).toBeGreaterThan(0);
			expect(random).toBeLessThan(11);

			var random = MathFactory.GenerateRandom(700, 900);
			expect(random).toBeGreaterThan(701);
			expect(random).toBeLessThan(901);
		});
	});

	describe("ModularMultiplicativeInverse", function() {
		it("correctly calculates the modular multiplicative inverse", function() {
			expect(MathFactory.ModularMultiplicativeInverse(7, 26)).toBe(15);
			expect(MathFactory.ModularMultiplicativeInverse(37, 216)).toBe(181);
			expect(MathFactory.ModularMultiplicativeInverse(17, 3120)).toBe(2753);
			expect(MathFactory.ModularMultiplicativeInverse(1, 1)).toBe(1);
		});

		it("correctly throws exception on non-coprimes", function() {
			expect(function() { MathFactory.ModularMultiplicativeInverse(654, 42); }).toThrow("Inputs are not coprime");
		});

		it("correctly throws on negative values", function() {
			expect(function() { MathFactory.ModularMultiplicativeInverse(-7, 26); }).toThrow("Inputs cannot be negative");
			expect(function() { MathFactory.ModularMultiplicativeInverse(7, -26); }).toThrow("Inputs cannot be negative");
			expect(function() { MathFactory.ModularMultiplicativeInverse(-7, -26); }).toThrow("Inputs cannot be negative");
		});
	});

	/*describe("GeneratePrime", function() {
		it("correctly outputs a value of the specified bit length", function() {
			expect(MathFactory.BitLength(MathFactory.GeneratePrime(30))).toEqual(30);
		});
	});*/

	/*describe("IsPrime", function() {
		it("correctly identifies prime numbers", function() {
			expect(MathFactory.IsPrime(101)).toBe(true);
			expect(MathFactory.IsPrime(827)).toBe(true);
			expect(MathFactory.IsPrime(1693)).toBe(true);
			expect(MathFactory.IsPrime(3461)).toBe(true);
			expect(MathFactory.IsPrime(5869)).toBe(true);
			expect(MathFactory.IsPrime(9587)).toBe(true);
			expect(MathFactory.IsPrime(605727251)).toBe(true);
		});

		it("correctly identifies non-prime numbers", function() {
			expect(MathFactory.IsPrime(1692)).toBe(false);
			expect(MathFactory.IsPrime(9225)).toBe(false);
			expect(MathFactory.IsPrime(7743)).toBe(false);
			expect(MathFactory.IsPrime(341)).toBe(false);
		});
	});*/

	describe("BaseLog", function() {
		it("correctly calculates the log", function() {
			expect(MathFactory.BaseLog(2, 128)).toEqual(7);
			expect(MathFactory.BaseLog(8, 64)).toEqual(2);
			expect(MathFactory.BaseLog(8, 512)).toEqual(3);
		});
	});

	describe("PowMod", function() {
		it("correctly calculates the result", function() {
			expect(MathFactory.PowMod(2, 2, 4)).toEqual(0);
			expect(MathFactory.PowMod(9, 25, 101)).toEqual(100);
			expect(MathFactory.PowMod(91513143, 302863625, 605727251)).toEqual(605727250);
		});
	});
});
