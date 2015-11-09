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

	EncoderFactory.HexToASN1 = function(hexString)
	{
		debugger;
		var stringifiedASN1 = '';

		var hexValue = null;

		for (var i = 0; i < hexString.length; i+=2)
		{
			hexValue = hexString.substring(i, 2);
		}
	}

	return EncoderFactory;
});