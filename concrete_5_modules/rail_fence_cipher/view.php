<?php defined('C5_EXECUTE') or die(_("Access Denied.")) ?>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<div ng-app="railFenceApp">
	<div ng-controller="TestController">
		<rail-fence-cipher plaintext="<?php echo $plaintext ?>" rails="<?php echo $railamount ?>"></rail-fence-cipher>
	</div>
</div>