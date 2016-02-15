describe("Rail Fence Directive Controller", function() {
	var $scope;
	var $controller;

	beforeEach(module('websiteApp'));
	beforeEach(inject(function (_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$scope = _$rootScope_.$new();
	}));

	describe('UI Controls', function() {
		var controller;

		beforeEach(function() {
			controller = $controller('railFenceCipherController', { $scope: $scope });
			$scope.message.plaintext = "Hellotheresir"
			$scope.$digest();
		});

		describe('Rail Count Modification', function() {
			it('triggering increaseRailCount modifies the rail value', function() {
				$scope.increaseRailCount();

				expect($scope.message.rails).toEqual(4);
			});

			it('triggering increaseRailCount updates the ciphertext', function() {
				$scope.message.plaintext = "Hello";
				$scope.increaseRailCount();

				expect($scope.message.ciphertext).toEqual("Helol");
			});

			it('triggering increaseRailCount does\'t allow you to go over the maximum rail size', function() {
				$scope.message.plaintext = "Hello";
				$scope.message.rails = 4;
				$scope.increaseRailCount();
				$scope.increaseRailCount();
				$scope.increaseRailCount();

				expect($scope.message.rails).toEqual(5);
			});

			it('triggering decreaseRailCount modifies the rail value', function() {
				$scope.decreaseRailCount();

				expect($scope.message.rails).toEqual(2);
			});

			it('triggering decreaseRailCount updates the ciphertext', function() {
				$scope.message.plaintext = "Hello";
				$scope.decreaseRailCount();

				expect($scope.message.ciphertext).toEqual("Hloel");
			});

			it('triggering decreaseRailCount does\'t allow you to go less than 2', function() {
				$scope.message.plaintext = "Hello";
				$scope.decreaseRailCount();
				$scope.decreaseRailCount();
				$scope.decreaseRailCount();
				$scope.decreaseRailCount();
				$scope.decreaseRailCount();

				expect($scope.message.rails).toEqual(2);
			});
		});
	});

	describe('Encryption/Decryption', function() {
		var controller;

		beforeEach(function() {
			controller = $controller('railFenceCipherController', { $scope: $scope });
		});

		describe('Encryption', function() {
			it('re-encrypts the message when the plaintext is modified', function() {
				$scope.message.plaintext = "Hello";
				$scope.$digest();

				expect($scope.message.ciphertext).toEqual("Hoell");
			});

			it('removes the invalid characters when input into plaintext', function() {
				$scope.message.plaintext = "Hello";
				$scope.$digest();

				$scope.message.plaintext = "Hello~";
				$scope.$digest();

				expect($scope.message.ciphertext).toEqual("Hoell");
			});
		});

		describe('Decryption', function() {
			it('re-decrypts the message when the ciphertext is modified', function() {
				$scope.message.ciphertext = "Hello";
				$scope.$digest();

				$scope.message.ciphertext = "Hoell";
				$scope.$digest();

				expect($scope.message.plaintext).toEqual("Hello");
			});

			it('removes the invalid characters when input into ciphertext', function() {
				$scope.message.ciphertext = "Hello";
				$scope.$digest();

				$scope.message.ciphertext = "Hoell";
				$scope.$digest();

				$scope.message.ciphertext = "Hoell~";
				$scope.$digest();

				expect($scope.message.plaintext).toEqual("Hello");
			});
		});
	});

	describe('Input Validation', function() {
		var controller;

		beforeEach(function() {
			controller = $controller('railFenceCipherController', { $scope: $scope });
		});

		describe('returns true on', function() {
			it('allows spaces', function() {
				var valueToTest = ' ';
				expect($scope.validInput(valueToTest)).toBe(true);
			});

			it('allows newlines', function() {
				var valueToTest = '\n';
				expect($scope.validInput(valueToTest)).toBe(true);
			});

			it('allows a-z input', function() {
				var valueToTest = 'abcdefghijklmnopqrstuvwxyz';
				expect($scope.validInput(valueToTest)).toBe(true);
			});

			it('allows A-Z input', function() {
				var valueToTest = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				expect($scope.validInput(valueToTest)).toBe(true);
			});

			it('allows both mixed character and whitespace input', function() {
				var valueToTest = 'abcdfg\nhijklmn  opqrstu\nvwxyz';
				expect($scope.validInput(valueToTest)).toBe(true);
			});
		});

		describe('returns false on', function() {
			it('numerics', function() {
				var valueToTest = '1';
				expect($scope.validInput(valueToTest)).toBe(false);
			});

			it('special characters', function() {
				var valueToTest = "@~$%";
				expect($scope.validInput(valueToTest)).toBe(false);
			});

			it('valid mixed with invalid input', function() {
				var valueToTest = "Hello1";
				expect($scope.validInput(valueToTest)).toBe(false);
			});

			it('undefined input', function() {
				expect($scope.validInput(undefined)).toBe(false);
			});
		});
	});

	describe('Directive scope', function() {
		var controller;

		it('adds predefined plaintext to the message scope', function() {
			$scope.plaintext = "Hello";

			controller = $controller('railFenceCipherController', { $scope: $scope });

			expect($scope.message.plaintext).toEqual("Hello");
		});

		it('adds predefined shift to the message scope', function() {
			$scope.rails = 4;

			controller = $controller('railFenceCipherController', { $scope: $scope });

			expect($scope.message.rails).toEqual(4);
		});
	});
});