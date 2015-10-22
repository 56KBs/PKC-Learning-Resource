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

	describe("GreatestCommonFactor", function() {
		it ("correctly identifies greatest common factors", function() {
			expect(MathFactory.GreatestCommonFactor(10, 2)).toEqual(1);
		});
	})
});