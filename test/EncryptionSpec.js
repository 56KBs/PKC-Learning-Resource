describe("EncryptionFactory", function() {
	var EncryptionFactory;

	beforeEach(module('websiteApp.EncryptionFactory'));
	beforeEach(inject(function (_EncryptionFactory_) {
		EncryptionFactory = _EncryptionFactory_;
	}));

	describe("GenerateKeys(false)", function() {
		it("generates a Public Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(false);
			expect(RSAKeys.publicKey).toBeDefined();
		});
		
		it("generates a Private Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(false);
			expect(RSAKeys.privateKey).toBeDefined();
		});
	});	

	describe("GenerateKeys(true)", function() {
		it("generates a Public Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.publicKey).toBeDefined();
		});
		
		it("generates a Private Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.privateKey).toBeDefined();
		});

		it("returns a P prime", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.primeP).toBeDefined();
		});

		it("returns a Q prime", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.primeQ).toBeDefined();
		});

		it("returns a N value", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.valueN).toBeDefined();
		});

		it("returns a Bit Length", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.bitLength).toBeDefined();
		});

		it("returns an E value (Euler Value)", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.valueE).toBeDefined();
		});

		it("returns a D value (Modular Multiplicative Inverse)", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.valueD).toBeDefined();
		});
	});

	describe("EncryptData", function() {
		it("returns encrypted data", function() {
			var RSAKeys = { 'publicKey': "predefinedKey", 'privateKey': "predefinedKey" };
			var Encrypted = EncryptionFactory.EncryptData("This is a test", RSAKeys.privateKey);
			expect(Encrypted).toEqual("EncryptedData");
		})
	});

	describe("DecryptData", function() {
		it("returns decrypted data", function() {
			var RSAKeys = { 'publicKey': "predefinedKey", 'privateKey': "predefinedKey" };
			var Decrypted = EncryptionFactory.DecryptData("ENCRYPTEDDATA", RSAKeys.publicKey);
			expect(Encrypted).toEqual("This is a test");
		})
	})
});