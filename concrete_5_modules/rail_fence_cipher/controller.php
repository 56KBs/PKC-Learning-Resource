<?php

namespace Application\Block\RailFenceCipher;

use Concrete\Core\Block\BlockController;
use Concrete\Core\Asset\AssetList;
use Concrete\Core\Asset\Asset;
use Core;

defined('C5_EXECUTE') or die(_("Access Denied."));

class Controller extends BlockController
{

    protected $btTable = "btRailFenceCipher";
    protected $btInterfaceWidth = "550";
    protected $btInterfaceHeight = "240";
    protected $btDefaultSet = 'basic';

    public function getBlockTypeName()
    {
        return t('Rail Fence Cipher');
    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register(
            'javascript', 'railfencecipherapp', 'blocks/rail_fence_cipher/rail_fence_cipher/app/myApp.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'railfencecipherdirective', 'blocks/rail_fence_cipher/rail_fence_cipher/app/rail-fence-cipher/rail-fence-directive.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'railfencecipherencryption', 'blocks/rail_fence_cipher/rail_fence_cipher/app/rail-fence-cipher/rail-fence-encryption-service.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjs', 'blocks/rail_fence_cipher/rail_fence_cipher/angular.js',
            array('version' => '1.5.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'bootstrap', 'blocks/rail_fence_cipher/rail_fence_cipher/bootstrap.js',
            array('version' => '3.3.6', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'css', 'railfencecipherdirective', 'blocks/rail_fence_cipher/rail_fence_cipher/style.css',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->registerGroup('railfencecipher', array(
            array('javascript', 'angularjs'),
            array('javascript', 'railfencecipherapp'),
            array('javascript', 'railfencecipherdirective'),
            array('javascript', 'railfencecipherencryption'),
            array('css', 'railfencecipherdirective')
        ));
    }

    public function registerViewAssets()
    {
        $this->requireAsset('javascript', 'jquery');
        $this->requireAsset('railfencecipher');
    }

    public function validate($data)
    {
        $e = Core::make('error');

        if (!$data['plaintext'] XOR !$data['railamount'])
        {    
            if (!$data['plaintext']) {
                $e->add(t('You must put something in the plaintext box if entering a shift amount.'));
            }

            if (!$data['railamount']) {
                $e->add(t('You must put something in the shift amount box if entering a plaintext string.'));
            }
        }

        if ($data['plaintext'] && $data['railamount'])
        {
            if (!is_numeric($data['railamount']))
            {
                $e->add(t('The shift amount must be numeric.'));
            }
            else if (intval($data['railamount']) > strlen($data['plaintext']))
            {
                $e->add(t('The shift amount must be equal to or less than the length of the plaintext.'));
            }
        }

        return $e;
    }

    public function getBlockTypeDescription()
    {
        return t('A block for an interactive Rail Fence Cipher.');
    }

    public function save($data)
    {
        $data['railamount'] = intval($data['railamount']);
        parent::save($data);
    }
}
