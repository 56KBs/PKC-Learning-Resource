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

		return this.ReadRailFence(railFence);

	};

	this.Decrypt = function(message, railCount)
	{
		if (message === undefined || railCount === undefined)
		{
			throw new Error("Missing arguments");
		}

		message = this.NormaliseMessage(message);
		var railFence = this.GenerateEmptyRailFence(railCount);

		var railIndex = 0;

		for (var i = 0; i < message.length; i++)
		{
			railFence[railIndex].push(message[i]);

			var padding = this.CalculatePadding(railIndex, railCount);
		}

		return this.Encrypt(message, railCount);
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
			padding.downward = ((railCount - railIndex) * 2) - 1;
		}
	}

	this.GenerateEncryptionRailFence = function(message, railCount)
	{
		message = this.NormaliseMessage(message);
		var railFence = this.GenerateEmptyRailFence(railCount);

		console.log(railFence);

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

	this.ReadRailFence = function(railFence)
	{
		// Read along the rails
		var encryptedString = "";

		for (var i = 0; i < railFence.length; i++)
		{
			for (var j = 0; j < railFence[i].length; j++)
			{
				if (railFence[i][j] != ".")
				{
					encryptedString += railFence[i][j];
				}
			}
		}

		return encryptedString;
	}
});