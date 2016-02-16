<?php

defined('C5_EXECUTE') or die(_("Access Denied."));

?>

<div class="form-group">
    <label class="control-label" for="plaintext"><?=t('Initial Plaintext')?></label>
    <input type="text" class="form-control" name="plaintext" value="<?php echo $plaintext?>">
</div>

<div class="form-group">
    <label class="control-label" for="railamount"><?=t('Rail Amount')?></label>
    <input type="text" class="form-control" name="railamount" value="<?php echo $railamount?>">
</div>
