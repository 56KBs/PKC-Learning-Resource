describe("Rail Fence Encryption Service", function() {
	var EncryptionService;

	beforeEach(module('websiteApp.RailFenceCipher.EncryptionService'));
	beforeEach(inject(function (_EncryptionService_) {
		EncryptionService = _EncryptionService_;
	}));

	describe("Encryption", function() {
		it("encrypts messages correctly with three rails", function() {
			var encrypted = EncryptionService.Encrypt("WE ARE DISCOVERED FLEE AT ONCE", 3);
			expect(encrypted.ciphertext).toEqual("WECRLTEERDSOEEFEAOCAIVDEN");
		});

		it("encrypts messages correctly with four rails", function() {
			var encrypted = EncryptionService.Encrypt("WE ARE DISCOVERED FLEE AT ONCE", 4);
			expect(encrypted.ciphertext).toEqual("WIREEEDSEEEACAECVDLTNROFO");
		});

		it("encrypts messages correctly with five rails", function() {
			var encrypted = EncryptionService.Encrypt("WE ARE DISCOVERED FLEE AT ONCE", 5);
			expect(encrypted.ciphertext).toEqual("WCLEESOFECAIVDENRDEEAOERT");
		});

		it("throws an error if missing message", function() {
			expect(function() { EncryptionService.Encrypt("hi", undefined); }).toThrow(new Error("Missing arguments"));
		});

		it("throws an error if missing rail count", function() {
			expect(function() { EncryptionService.Encrypt(undefined, 1); }).toThrow(new Error("Missing arguments"));
		});
	});

	describe("Decryption", function() {
		it("decrypts messages correctly with three rails", function() {
			var decrypted = EncryptionService.Decrypt("WECRLTEERDSOEEFEAOCAIVDEN", 3);
			expect(decrypted.plaintext).toEqual("WEAREDISCOVEREDFLEEATONCE");
		});

		it("decrypts messages correctly with four rails", function() {
			var decrypted = EncryptionService.Decrypt("WIREEEDSEEEACAECVDLTNROFO", 4);
			expect(decrypted.plaintext).toEqual("WEAREDISCOVEREDFLEEATONCE");
		});

		it("decrypts messages correctly with five rails", function() {
			var decrypted = EncryptionService.Decrypt("Hreeeelhsiltohop", 5);
			expect(decrypted.plaintext).toEqual("Hellotheresophie");
		});

		it("throws an error if missing message", function() {
			expect(function() { EncryptionService.Decrypt("hi", undefined); }).toThrow(new Error("Missing arguments"));
		});

		it("throws an error if missing rail count", function() {
			expect(function() { EncryptionService.Decrypt(undefined, 1); }).toThrow(new Error("Missing arguments"));
		});
	});

	describe("Internal Functionality", function() {
		it("generates an empty rail fence correctly", function() {
			var railFence = EncryptionService.GenerateEmptyRailFence(3);

			var expectedRailFence = [new Array(), new Array(), new Array()];

			expect(railFence).toEqual(expectedRailFence);
		});

		it("throws an error when generating a rail fence with a negative size", function() {
			expect(function() { EncryptionService.GenerateEmptyRailFence(-1); }).toThrow(new Error("Rail count must be positive"));
		});

		it("removes spaces from a message when normalising", function() {
			var message = "WE ARE DISCOVERED FLEE AT ONCE";
			var normalised = EncryptionService.NormaliseMessage(message);

			expect(normalised).toEqual("WEAREDISCOVEREDFLEEATONCE");
		});

		describe("Padding calculation", function() {

			var railCount = 0;

			describe("2 rails", function () {
				beforeEach(function() {
					railCount = 2;
				});

				it("rail 1", function() {
					var padding = EncryptionService.CalculatePadding(0, railCount);
					expect(padding.downward).toEqual(1);
					expect(padding.upward).toEqual(1);
				});

				it("rail 2", function() {
					var padding = EncryptionService.CalculatePadding(1, railCount);
					expect(padding.downward).toEqual(1);
					expect(padding.upward).toEqual(1);
				});
			});

			describe("3 rails", function () {
				beforeEach(function() {
					railCount = 3;
				});

				it("rail 1", function() {
					var padding = EncryptionService.CalculatePadding(0, railCount);
					expect(padding.downward).toEqual(3);
					expect(padding.upward).toEqual(3);
				});

				it("rail 2", function() {
					var padding = EncryptionService.CalculatePadding(1, railCount);
					expect(padding.downward).toEqual(1);
					expect(padding.upward).toEqual(1);
				});

				it("rail 3", function() {
					var padding = EncryptionService.CalculatePadding(2, railCount);
					expect(padding.downward).toEqual(3);
					expect(padding.upward).toEqual(3);
				});
			});

			describe("4 rails", function () {
				beforeEach(function() {
					railCount = 4;
				});

				it("rail 1", function() {
					var padding = EncryptionService.CalculatePadding(0, railCount);
					expect(padding.downward).toEqual(5);
					expect(padding.upward).toEqual(5);
				});

				it("rail 2", function() {
					var padding = EncryptionService.CalculatePadding(1, railCount);
					expect(padding.downward).toEqual(3);
					expect(padding.upward).toEqual(1);
				});

				it("rail 3", function() {
					var padding = EncryptionService.CalculatePadding(2, railCount);
					expect(padding.downward).toEqual(1);
					expect(padding.upward).toEqual(3);
				});

				it("rail 4", function() {
					var padding = EncryptionService.CalculatePadding(3, railCount);
					expect(padding.downward).toEqual(5);
					expect(padding.upward).toEqual(5);
				});
			});

			describe("5 rails", function () {
				beforeEach(function() {
					railCount = 5;
				});

				it("rail 1", function() {
					var padding = EncryptionService.CalculatePadding(0, railCount);
					expect(padding.downward).toEqual(7);
					expect(padding.upward).toEqual(7);
				});

				it("rail 2", function() {
					var padding = EncryptionService.CalculatePadding(1, railCount);
					expect(padding.downward).toEqual(5);
					expect(padding.upward).toEqual(1);
				});

				it("rail 3", function() {
					var padding = EncryptionService.CalculatePadding(2, railCount);
					expect(padding.downward).toEqual(3);
					expect(padding.upward).toEqual(3);
				});

				it("rail 4", function() {
					var padding = EncryptionService.CalculatePadding(3, railCount);
					expect(padding.downward).toEqual(1);
					expect(padding.upward).toEqual(5);
				});

				it("rail 5", function() {
					var padding = EncryptionService.CalculatePadding(4, railCount);
					expect(padding.downward).toEqual(7);
					expect(padding.upward).toEqual(7);
				});
			});
		});
	});
});