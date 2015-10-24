describe("EncoderFactory", function() {
	var EncoderFactory;

	beforeEach(module('websiteApp.EncoderFactory'));
	beforeEach(inject(function (_EncoderFactory_) {
		EncoderFactory = _EncoderFactory_;
	}));

	describe("Base64ToAscii", function() {
		it("correctly encodes base64 to ascii", function() {
			expect(EncoderFactory.Base64ToAscii("VGVzdGluZyBTdHJpbmc=")).toEqual("Testing String");
		});
	});

	describe("AsciiToBase64", function() {
		it("correctly encodes ascii as base64", function() {
			expect(EncoderFactory.AsciiToBase64("Testing String")).toEqual("VGVzdGluZyBTdHJpbmc=");
		});
	});

	describe("Base64ToHex", function() {
		it("correctly encodes base64 as hex", function() {
			expect(EncoderFactory.Base64ToHex("VGVzdGluZyBTdHJpbmc=")).toEqual("54657374696E6720537472696E67");
			expect(EncoderFactory.Base64ToHex("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMYfnvWtC8Id5bPKae5yXSxQTt+Zpul6AnnZWfI2TtIarvjHBFUtXRo96y7hoL4VWOPKGCsRqMFDkrbeUjRrx8iL914/srnyf6sh9c8Zk04xEOpK1ypvBz+Ks4uZObtjnnitf0NBGdjMKxveTq+VE7BWUIyQjtQ8mbDOsiLLvh7wIDAQAB")).toEqual("30819F300D06092A864886F70D010101050003818D0030818902818100CC61F9EF5AD0BC21DE5B3CA69EE725D2C504EDF99A6E97A0279D959F2364ED21AAEF8C704552D5D1A3DEB2EE1A0BE1558E3CA182B11A8C14392B6DE52346BC7C88BF75E3FB2B9F27FAB21F5CF19934E3110EA4AD72A6F073F8AB38B9939BB639E78AD7F434119D8CC2B1BDE4EAF9513B056508C908ED43C99B0CEB222CBBE1EF0203010001");
		});
	});

	describe("HexToBase64", function() {
		it("correctly encodes hex as base64", function() {
			expect(EncoderFactory.Base64ToHex("54657374696E6720537472696E67")).toEqual("VGVzdGluZyBTdHJpbmc=");
		});
	});


	describe("HexToASN1", function() {
		it("correctly encodes hex as asn1", function() {
			expect(EncoderFactory.HexToASN1("30819F300D06092A864886F70D010101050003818D0030818902818100CC61F9EF5AD0BC21DE5B3CA69EE725D2C504EDF99A6E97A0279D959F2364ED21AAEF8C704552D5D1A3DEB2EE1A0BE1558E3CA182B11A8C14392B6DE52346BC7C88BF75E3FB2B9F27FAB21F5CF19934E3110EA4AD72A6F073F8AB38B9939BB639E78AD7F434119D8CC2B1BDE4EAF9513B056508C908ED43C99B0CEB222CBBE1EF0203010001")).toEqual("VGVzdGluZyBTdHJpbmc=");
		});
	});
});