describe("Caesar Cipher Directive Controller", function() {
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
			controller = $controller('caesarCipherController', { $scope: $scope });
		});

		describe('Shift Count Modification', function() {
			it('triggering shiftLeft modifies the shift value', function() {
				$scope.shiftLeft();

				expect($scope.message.shift).toEqual(2);
			});

			it('triggering shiftLeft modifies the shift value with no plaintext', function() {
				$scope.message.plaintext = undefined;
				$scope.shiftLeft();

				expect($scope.message.shift).toEqual(2);
			});

			it('triggering shiftRight modifies the shift value with no plaintext', function() {
				$scope.message.plaintext = undefined;
				$scope.shiftRight();

				expect($scope.message.shift).toEqual(4);
			});

			it('triggering shiftLeft updates the ciphertext', function() {
				$scope.message.plaintext = "Hello";
				$scope.shiftLeft();

				expect($scope.message.ciphertext).toEqual("Jgnnq");
			});

			it('triggering shiftRight modifies the shift value', function() {
				$scope.shiftRight();

				expect($scope.message.shift).toEqual(4);
			});

			it('triggering shiftRight updates the ciphertext', function() {
				$scope.message.plaintext = "Hello";
				$scope.shiftRight();

				expect($scope.message.ciphertext).toEqual("Lipps");
			});
		});

		it('setting the shift by selecting a character sets correct shift amount', function() {
			$scope.message.plaintext = "Hello";
			$scope.setShiftByChar('G');

			expect($scope.message.shift).toBe(6);
		});

		it('setting the shift by selecting a character reencrypts the message', function() {
			$scope.message.plaintext = "Hello";
			$scope.setShiftByChar('G');

			expect($scope.message.ciphertext).toBe("Nkrru");
		});
	});

		
	describe('Input Validation', function() {
		var controller;

		beforeEach(function() {
			controller = $controller('caesarCipherController', { $scope: $scope });
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

	describe('Encryption/Decryption', function() {
		var controller;

		beforeEach(function() {
			controller = $controller('caesarCipherController', { $scope: $scope });
		});

		describe('Encryption', function() {
			it('re-encrypts the message when the plaintext is modified', function() {
				$scope.message.plaintext = "Hello";
				$scope.$digest();

				expect($scope.message.ciphertext).toEqual("Khoor");
			});

			it('removes the invalid characters when input into plaintext', function() {
				$scope.message.plaintext = "Hello";
				$scope.$digest();

				$scope.message.plaintext = "Hello~";
				$scope.$digest();

				expect($scope.message.ciphertext).toEqual("Khoor");
			});

			it('exampleEncrypt returns the expected value', function() {
				expect($scope.exampleEncrypt()).toEqual("DEFGHIJKLMNOPQRSTUVWXYZABC");
			});
		});

		describe('Decryption', function() {
			it('re-decrypts the message when the ciphertext is modified', function() {
				$scope.message.ciphertext = "Hello";
				$scope.$digest();

				$scope.message.ciphertext = "Khoor";
				$scope.$digest();

				expect($scope.message.plaintext).toEqual("Hello");
			});

			it('removes the invalid characters when input into ciphertext', function() {
				$scope.message.ciphertext = "Hello";
				$scope.$digest();

				$scope.message.ciphertext = "Khoor";
				$scope.$digest();

				$scope.message.ciphertext = "Khoor~";
				$scope.$digest();

				expect($scope.message.plaintext).toEqual("Hello");
			});
		});
	});

	describe('Directive scope', function() {
		var controller;

		it('adds predefined plaintext to the message scope', function() {
			$scope.plaintext = "Hello";

			controller = $controller('caesarCipherController', { $scope: $scope });

			expect($scope.message.plaintext).toEqual("Hello");
		});

		it('adds predefined shift to the message scope', function() {
			$scope.shift = 12;

			controller = $controller('caesarCipherController', { $scope: $scope });

			expect($scope.message.shift).toEqual(12);
		});
	});
});