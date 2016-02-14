describe("Caesar Encryption Service", function() {
	var EncryptionService;

	beforeEach(module('websiteApp.CaesarCipher.EncryptionService'));
	beforeEach(inject(function (_EncryptionService_) {
		EncryptionService = _EncryptionService_;
	}));

	describe("Caesar Encryption", function() {
		it("encrypts simple plaintext correctly", function() {
			var encrypted = EncryptionService.Encrypt("ABC", 1);
			expect(encrypted).toEqual("BCD");
		});

		it("encrypts data that wraps the alphabet", function() {
			var encrypted = EncryptionService.Encrypt("XYZ", 1);
			expect(encrypted).toEqual("YZA");
		});

		it("encrypts data that is in lower case form", function() {
			var encrypted = EncryptionService.Encrypt("hi", 1);
			expect(encrypted).toEqual("ij");
		});

		it("throws exception if arguments are missing", function() {
			expect(function() {EncryptionService.Encrypt("hi"); }).toThrow(new Error("Missing arguments"));
		});

		it("throws exception if the message contains characters out of range", function() {
			expect(function() {EncryptionService.Encrypt(";", 1); }).toThrow(new Error("Input out of range"));
		});

		it("encrypts data correctly with high shift values", function() {
			var encrypted = EncryptionService.Encrypt("ABC", 53);
			expect(encrypted).toEqual("BCD");
		});

		it("encrypts data correctly with spaces in it", function() {
			var encrypted = EncryptionService.Encrypt("ABC DEF", 1);
			expect(encrypted).toEqual("BCD EFG");
		});
	});

	describe("Caesar Decryption", function() {
		it("decrypts simple plaintext correctly", function() {
			var decrypted = EncryptionService.Decrypt("BCD", 1);
			expect(decrypted).toEqual("ABC");
		});

		it("decrypts data that wraps the alphabet", function() {
			var encrypted = EncryptionService.Decrypt("YZA", 1);
			expect(encrypted).toEqual("XYZ");
		});

		it("decrypts data that is in lower case form", function() {
			var encrypted = EncryptionService.Decrypt("ij", 1);
			expect(encrypted).toEqual("hi");
		});

		it("decrypts data correctly when shift is negative", function() {
			var encrypted = EncryptionService.Decrypt("ij", -1);
			expect(encrypted).toEqual("hi");
		});

		it("throws exception if the message contains characters out of range", function() {
			expect(function() {EncryptionService.Decrypt(";", 1); }).toThrow(new Error("Input out of range"));
		});

		it("decrypts data correctly with high shift values", function() {
			var encrypted = EncryptionService.Decrypt("BCD", 53);
			expect(encrypted).toEqual("ABC");
		});

		it("decrypts data correctly with spaces in it", function() {
			var encrypted = EncryptionService.Decrypt("BCD EFG", 1);
			expect(encrypted).toEqual("ABC DEF");
		});
	});
});