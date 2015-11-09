describe("EncryptionFactory", function() {
	var EncryptionFactory;

	beforeEach(module('websiteApp.EncryptionFactory', 'websiteApp.MathFactory'));
	beforeEach(inject(function (_EncryptionFactory_, _MathFactory_) {
		EncryptionFactory = _EncryptionFactory_;
		MathFactory = _MathFactory_;
	}));

	describe("GenerateKeys(false)", function() {
		beforeEach(function() {
			originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		});

		it("generates a Public Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(false, 32);
			expect(RSAKeys.publicKey).toBeDefined();
			expect(RSAKeys.publicKey).not.toBeNull();
		});
		
		it("generates a Private Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(false, 32);
			expect(RSAKeys.privateKey).toBeDefined();
			expect(RSAKeys.privateKey).not.toBeNull();
		});

		it("generates a key of the specified length", function()
		{
			var RSAKeys = EncryptionFactory.GenerateKeys(false, 64);
			expect(MathFactory.BitLength(RSAKeys.privateKey.modulus)).toEqual(64);
			expect(MathFactory.BitLength(RSAKeys.publicKey.modulus)).toEqual(64);

			var RSAKeys = EncryptionFactory.GenerateKeys(false,32);
			expect(MathFactory.BitLength(RSAKeys.privateKey.modulus)).toEqual(32);
			expect(MathFactory.BitLength(RSAKeys.publicKey.modulus)).toEqual(32);
		});

		it("generates a key of the default length", function()
		{
			var RSAKeys = EncryptionFactory.GenerateKeys(false);
			expect(MathFactory.BitLength(RSAKeys.privateKey.modulus)).toEqual(32);
			expect(MathFactory.BitLength(RSAKeys.publicKey.modulus)).toEqual(32);
		});

		afterEach(function() {
      		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		});
	});	

	describe("GenerateKeys(true)", function() {
		beforeEach(function() {
			originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		});

		it("generates a Public Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.publicKey).toBeDefined();
			expect(RSAKeys.publicKey).not.toBeNull();
		});
		
		it("generates a Private Key", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.privateKey).toBeDefined();
			expect(RSAKeys.privateKey).not.toBeNull();
		});

		it("returns a P prime", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.primeP).toBeDefined();
			expect(RSAKeys.primeP).not.toBeNull();
		});

		it("returns a Q prime", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.primeQ).toBeDefined();
			expect(RSAKeys.primeQ).not.toBeNull();
		});

		it("returns a N value", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.valueN).toBeDefined();
			expect(RSAKeys.valueN).not.toBeNull();
		});

		it("returns a Bit Length", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.bitLength).toBeDefined();
			expect(RSAKeys.bitLength).not.toBeNull();
		});

		it("returns an Euler Value", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.eulerValue).toBeDefined();
			expect(RSAKeys.eulerValue).not.toBeNull();
		});

		it("returns an E value (Co-prime to Euler Value)", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.valueE).toBeDefined();
			expect(RSAKeys.valueE).not.toBeNull();
		});

		it("returns a D value (Modular Multiplicative Inverse)", function() {
			var RSAKeys = EncryptionFactory.GenerateKeys(true, 32);
			expect(RSAKeys.valueD).toBeDefined();
			expect(RSAKeys.valueD).not.toBeNull();
		});

		afterEach(function() {
      		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		});
	});

	describe("EncryptData", function() {
		it("returns encrypted data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "20599243",
					'modulus': "119117501"},
				'publicKey': {
					'exponent':"64876771",
					'modulus': "119117501"}
			};

			var Encrypted = EncryptionFactory.EncryptData("123456", RSAKeys.publicKey);
			expect(Encrypted).toEqual("36495657");
		})
	});

	describe("DecryptData", function() {
		it("returns decrypted data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "20599243",
					'modulus': "119117501"},
				'publicKey': {
					'exponent':"64876771",
					'modulus': "119117501"}
			};

			var Decrypted = EncryptionFactory.DecryptData("36495657", RSAKeys.privateKey);
			expect(Decrypted).toEqual("123456");
		})
	});
});