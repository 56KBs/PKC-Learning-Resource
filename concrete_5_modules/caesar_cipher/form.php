<?php

defined('C5_EXECUTE') or die(_("Access Denied."));

?>

<div class="form-group">
    <label class="control-label" for="plaintext"><?=t('Initial Plaintext')?></label>
    <input type="text" class="form-control" name="plaintext" value="<?php echo $plaintext?>">
</div>

<div class="form-group">
    <label class="control-label" for="shiftamount"><?=t('Shift Amount')?></label>
    <input type="text" class="form-control" name="shiftamount" value="<?php echo $shiftamount?>">
</div>
