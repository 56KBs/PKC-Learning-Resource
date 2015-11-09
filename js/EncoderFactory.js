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

		for (var i = 0; i < ascii.length; i++)
		{
			var hexCode = ascii.charCodeAt(i).toString(16).toUpperCase();

			if (hexCode.length == 1)
			{
				hexCode = '0' + hexCode;
			}

			hex += hexCode;
		}

		return hex;
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