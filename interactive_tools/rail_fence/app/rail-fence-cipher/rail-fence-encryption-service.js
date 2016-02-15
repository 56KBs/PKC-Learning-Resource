angular.module('websiteApp.RailFenceCipher.EncryptionService', []);

angular.module('websiteApp.RailFenceCipher.EncryptionService').service('EncryptionService', function()
{
	this.Encrypt = function(message, railCount)
	{
		if (message === undefined || railCount === undefined)
		{
			throw new Error("Missing arguments");
		}

		var railFence = this.GenerateEncryptionRailFence(message, railCount);

		return { railfence: railFence, ciphertext: this.ReadRailFenceCipherText(railFence) };

	};

	this.Decrypt = function(message, railCount)
	{
		if (message === undefined || railCount === undefined)
		{
			throw new Error("Missing arguments");
		}

		message = this.NormaliseMessage(message);
		var railFence = this.GenerateEmptyRailFence(railCount);

		var railStart = true;
		var railIndex = 0;
		var downwardZag = true;
		var padding = this.CalculatePadding(railIndex, railCount);

		for (var i = 0; i < message.length; i++)
		{
			for (var j = 0; j < railIndex && railStart; j++)
			{
				railFence[railIndex].push(".");
			}

			railStart = false;

			railFence[railIndex].push(message[i]);

			var amountToPad = downwardZag ? padding.downward : padding.upward;

			for (var j = 0; j < amountToPad && railFence[railIndex].length < message.length; j++)
			{
				railFence[railIndex].push(".");
			}

			downwardZag = !downwardZag;
			
			if (railFence[railIndex].length == message.length && i != message.length - 1)
			{
				railIndex++;
				railStart = true;
				padding = this.CalculatePadding(railIndex, railCount);
				downwardZag = true;
			}
		}

		return { railfence: railFence, plaintext: this.ReadRailFencePlainText(railFence) };
	}

	this.CalculatePadding = function(railIndex, railCount)
	{
		var padding = {
			downward: 0,
			upward: 0
		};

		if (railIndex == railCount - 1 || railIndex == 0)
		{
			padding.upward = ((railCount - 1) * 2) - 1;
			padding.downward = padding.upward;
		}
		else
		{
			padding.upward = (railIndex * 2) - 1;
			padding.downward = (((railCount - 2) - railIndex) * 2) + 1;
		}

		return padding;
	}

	this.GenerateEncryptionRailFence = function(message, railCount)
	{
		message = this.NormaliseMessage(message);
		var railFence = this.GenerateEmptyRailFence(railCount);

		var railIndex = 0;
		var downwardZag = true;

		for (var i = 0; i < message.length; i++)
		{
			railFence[railIndex].push(message[i]);

			if (railIndex == 0 && !downwardZag)
			{
				downwardZag = true;
			}
			else if (railIndex == railCount - 1 && downwardZag)
			{
				downwardZag = false;
			}

			var nextRailIndex = downwardZag ? railIndex + 1 : railIndex - 1;

			// Prime the next rail
			while (railFence[railIndex].length != railFence[nextRailIndex].length)
			{

				railFence[nextRailIndex].push(".");
			}

			railIndex = nextRailIndex;
		}

		// Pad all the rails to the full correct length
		for (var i = 0; i < railFence.length; i++)
		{
			while (railFence[i].length < message.length)
			{
				railFence[i].push(".");
			}
		}

		return railFence;
	}

	this.GenerateEmptyRailFence = function(railCount)
	{
		if (railCount < 1)
		{
			throw new Error("Rail count must be positive");
		}
		var railFence = [];

		for (var i = 0; i < railCount; i++)
		{
			railFence.push(new Array());
		}

		return railFence;
	}

	this.NormaliseMessage = function(message)
	{
		var normalisedMessage = "";

		for (var i = 0; i < message.length; i++)
		{
			if (message[i] != ' ')
			{
				normalisedMessage += message[i];
			}
		}

		return normalisedMessage;
	}

	this.ReadRailFenceCipherText = function(railFence)
	{
		// Read along the rails
		var ciphertext = "";

		for (var i = 0; i < railFence.length; i++)
		{
			for (var j = 0; j < railFence[i].length; j++)
			{
				if (railFence[i][j] != ".")
				{
					ciphertext += railFence[i][j];
				}
			}
		}

		return ciphertext;
	}

	this.ReadRailFencePlainText = function(railFence)
	{
		// Read along the zigzags
		var plaintext = "";

		var downwardZag = true;
		var railIndex = 0;

		for (var i = 0; i < railFence[0].length; i++)
		{
			plaintext += railFence[railIndex][i];

			if (railIndex == 0 && !downwardZag)
			{
				downwardZag = true;
			}
			else if (railIndex == railFence.length - 1 && downwardZag)
			{
				downwardZag = false;
			}

			// Shift the rail index
			railIndex = downwardZag ? railIndex + 1 : railIndex - 1;
		}

		return plaintext;
	}
});