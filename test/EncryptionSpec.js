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
			expect(RSAKeys.publicKey).not.toBeNull();
		});
		
		it("generates a Private Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(false);
			expect(RSAKeys.privateKey).toBeDefined();
			expect(RSAKeys.privateKey).not.toBeNull();
		});
	});	

	describe("GenerateKeys(true)", function() {
		it("generates a Public Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.publicKey).toBeDefined();
			expect(RSAKeys.publicKey).not.toBeNull();
		});
		
		it("generates a Private Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.privateKey).toBeDefined();
			expect(RSAKeys.privateKey).not.toBeNull();
		});

		it("returns a P prime", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.primeP).toBeDefined();
			expect(RSAKeys.primeP).not.toBeNull();
		});

		it("returns a Q prime", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.primeQ).toBeDefined();
			expect(RSAKeys.primeQ).not.toBeNull();
		});

		it("returns a N value", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.valueN).toBeDefined();
			expect(RSAKeys.valueN).not.toBeNull();
		});

		it("returns a Bit Length", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.bitLength).toBeDefined();
			expect(RSAKeys.bitLength).not.toBeNull();
		});

		it("returns an Euler Value", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.eulerValue).toBeDefined();
			expect(RSAKeys.eulerValue).not.toBeNull();
		});

		it("returns an E value (Co-prime to Euler Value)", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.valueE).toBeDefined();
			expect(RSAKeys.valueE).not.toBeNull();
		});

		it("returns a D value (Modular Multiplicative Inverse)", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true);
			expect(RSAKeys.valueD).toBeDefined();
			expect(RSAKeys.valueD).not.toBeNull();
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