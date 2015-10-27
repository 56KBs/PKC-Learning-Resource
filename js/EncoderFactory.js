angular.module('websiteApp.EncoderFactory', []);

angular.module('websiteApp.EncoderFactory').factory('EncoderFactory', function()
{
	var EncoderFactory = {};

	EncoderFactory.Base64ToAscii = function(base64String)
	{
		return atob(base64String);
	}

	EncoderFactory.AsciiToBase64 = function(asciiString)
	{
		return btoa(asciiString);
	}

	EncoderFactory.Base64ToHex = function(base64String)
	{
		var ascii = EncoderFactory.Base64ToAscii(base64String);
		var hex = '';

		while (ascii.length > 0)
		{
			var temp = ascii.substr(0, 1);
			ascii = ascii.substr(1);


			hex += ("00" + temp.charCodeAt(0).toString(16)).substr(-2).toUpperCase();
		}

		return hex;
	}

	EncoderFactory.HexToBase64 = function(hexString)
	{
		var ascii = '';

		while (hexString.length > 0)
		{
			var temp = parseInt(hexString.substr(0, 2), 16);
			hexString = hexString.substr(2);
			ascii += String.fromCharCode(temp);
		}

		return EncoderFactory.AsciiToBase64(ascii);
	}

	EncoderFactory.ASN1ToString = function(asn1String)
	{
		var hexString = EncoderFactory.Base64ToHex(asn1String);
		var ascii = '';

		while (hexString.length > 0)
		{
			var temp = hexString.substr(0, 2);
			hexString = hexString.substr(2);

			switch(temp)
			{
				case 30:
					ascii += "SEQUENCE";

			}
		}
	}

	EncoderFactory.ASN1DecodeTag = function(hexString)
	{
		var ascii = '';
		var temp = hexString.substr(0, 2);
		hexString = hexString.substr(2);

		switch(temp)
		{
			case 02:
				ascii += "INTEGER";
				break;
			case 06:
				ascii += "OBJECT";
				break;
			case 30:
				ascii += "SEQUENCE";
				break;
		}

		return {'ascii': ascii, 'hexString': hexString};
	}

	EncoderFactory.ASN1DecodeLength = function(hexString)
	{
		var ascii = '';

	}

	return EncoderFactory;
});