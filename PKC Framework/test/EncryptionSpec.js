describe("EncryptionFactory", function() {
	var EncryptionFactory;

	beforeEach(module('websiteApp.EncryptionFactory', 'websiteApp.MathService'));
	beforeEach(inject(function (_EncryptionFactory_, _MathService_) {
		EncryptionFactory = _EncryptionFactory_;
		MathService = _MathService_;
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
			expect(MathService.BitLength(RSAKeys.privateKey.modulus)).toEqual(64);
			expect(MathService.BitLength(RSAKeys.publicKey.modulus)).toEqual(64);

			var RSAKeys = EncryptionFactory.GenerateKeys(false,32);
			expect(MathService.BitLength(RSAKeys.privateKey.modulus)).toEqual(32);
			expect(MathService.BitLength(RSAKeys.publicKey.modulus)).toEqual(32);
		});

		it("generates a key of the default length", function()
		{
			var RSAKeys = EncryptionFactory.GenerateKeys(false);
			expect(MathService.BitLength(RSAKeys.privateKey.modulus)).toEqual(32);
			expect(MathService.BitLength(RSAKeys.publicKey.modulus)).toEqual(32);
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
		it("correctly encrypts short data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.EncryptData("hi", RSAKeys.publicKey);
			expect(Encrypted).toEqual("762869554");
		})

		it("correctly encrypts longer data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.EncryptData("hi there", RSAKeys.publicKey);
			expect(Encrypted).toEqual("1887936603;2068322044;1752984510");
		})

		it("correctly encrypts single character data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.EncryptData("1699005785;1879828454;1970802912", RSAKeys.publicKey);
			expect(Encrypted).toEqual("1640570292;304447387;2392550670;5643320;1995866852;1169894474;263465018;513143965;753734441;2621155562;2389088970");
		})

		it("correctly encrypts encrypted digest data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.EncryptData("h", RSAKeys.publicKey);
			expect(Encrypted).toEqual("2436449047");
		})
	});

	describe("DecryptData", function() {
		it("correctly decrypts short data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Decrypted = EncryptionFactory.DecryptData("762869554", RSAKeys.privateKey);
			expect(Decrypted).toEqual("hi");
		})

		it("correctly decrypts longer data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.DecryptData("1887936603;2068322044;1752984510", RSAKeys.privateKey);
			expect(Encrypted).toEqual("hi there");
		})

		it("correctly decrypts single character data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.DecryptData("2436449047", RSAKeys.privateKey);
			expect(Encrypted).toEqual("h");
		})

		it("correctly decrypts encrypted digest data", function() {
			var RSAKeys = {
				'privateKey': {
					'exponent': "356766209",
					'modulus': "2918405449"},
				'publicKey': {
					'exponent':"65537",
					'modulus': "2918405449"}
			};

			var Encrypted = EncryptionFactory.DecryptData("1640570292;304447387;2392550670;5643320;1995866852;1169894474;263465018;513143965;753734441;2621155562;2389088970", RSAKeys.privateKey);
			expect(Encrypted).toEqual("1699005785;1879828454;1970802912");
		})
	});
});