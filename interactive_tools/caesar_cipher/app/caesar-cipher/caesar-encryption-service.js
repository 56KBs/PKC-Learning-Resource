angular.module('websiteApp.CaesarCipher.EncryptionService', []);

angular.module('websiteApp.CaesarCipher.EncryptionService').service('EncryptionService', function()
{
	this.Encrypt = function(message, shiftCount)
	{
		if (message === undefined || shiftCount === undefined)
		{
			throw new Error("Missing arguments");
		}

		shiftCount = shiftCount % 26;

		var returnString = "";

		for (var i = 0; i < message.length; i++)
		{
			returnString += this.ShiftSingleCharacter(message[i], shiftCount);
		}

		return returnString;
	};

	this.Decrypt = function(message, shiftCount)
	{
		if (shiftCount > 0)
		{
			shiftCount = -shiftCount;
		}

		return this.Encrypt(message, shiftCount);
	}

	this.ShiftSingleCharacter = function(inputCharacter, shiftCount)
	{
		var charCode = inputCharacter.charCodeAt(0);

		return String.fromCharCode(ShiftCharCode(charCode, shiftCount));
	}

	function ShiftCharCode(charCode, shiftCount)
	{
		if (charCode == 32)
		{
			return charCode;
		}
		
		var offset = GetCharOffset(charCode);

		charCode -= offset;

		if (charCode + shiftCount > 26)
		{
			charCode += shiftCount - 26;
		}
		else if (charCode + shiftCount < 1)
		{
			charCode += shiftCount + 26;
		}
		else
		{
			charCode += shiftCount;
		}

		return charCode + offset;
	}

	function GetCharOffset(charCode)
	{
		if (charCode >= 65 && charCode <= 90)
		{
			return 64;
		}
		else if (charCode >= 97 && charCode <= 122)
		{
			return 96;
		}
		else
		{
			throw new Error("Input out of range");
		}

	}
});