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
});
