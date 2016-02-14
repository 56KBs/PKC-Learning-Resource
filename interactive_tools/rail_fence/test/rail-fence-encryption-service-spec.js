describe("Rail Fence Encryption Service", function() {
	var EncryptionService;

	beforeEach(module('websiteApp.RailFenceCipher.EncryptionService'));
	beforeEach(inject(function (_EncryptionService_) {
		EncryptionService = _EncryptionService_;
	}));

	describe("Encryption", function() {
		it("encrypts messages correctly", function() {
			var encrypted = EncryptionService.Encrypt("WE ARE DISCOVERED FLEE AT ONCE", 3);
			expect(encrypted).toEqual("WECRLTEERDSOEEFEAOCAIVDEN");
		});

		it("throws an error if missing message", function() {
			expect(function() { EncryptionService.Encrypt("hi", undefined); }).toThrow(new Error("Missing arguments"));
		});

		it("throws an error if missing rail count", function() {
			expect(function() { EncryptionService.Encrypt(undefined, 1); }).toThrow(new Error("Missing arguments"));
		});
	});

	describe("Decryption", function() {
		it("decrypts messages correctly", function() {
			var decrypted = EncryptionService.Decrypt("WECRLTEERDSOEEFEAOCAIVDEN", 3);
			expect(decrypted).toEqual("WE ARE DISCOVERED FLEE AT ONCE");
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
	});
});