<?php

namespace Application\Block\CaesarCipher;

use Concrete\Core\Block\BlockController;
use Concrete\Core\Asset\AssetList;
use Concrete\Core\Asset\Asset;
use Core;

defined('C5_EXECUTE') or die(_("Access Denied."));

class Controller extends BlockController
{

    protected $btTable = "btCaesarCipher";
    protected $btInterfaceWidth = "550";
    protected $btInterfaceHeight = "240";
    protected $btDefaultSet = 'basic';

    public function getBlockTypeName()
    {
        return t('Caesar Cipher');
    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register(
            'javascript', 'caesarcipherapp', 'blocks/caesar_cipher/caesar_cipher/app/myApp.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'caesarcipherdirective', 'blocks/caesar_cipher/caesar_cipher/app/caesar-cipher/caesar-directive.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'caesarcipherencryption', 'blocks/caesar_cipher/caesar_cipher/app/caesar-cipher/caesar-encryption-service.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjs', 'blocks/caesar_cipher/caesar_cipher/angular.js',
            array('version' => '1.5.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjsmodules', 'blocks/caesar_cipher/caesar_cipher/angular.ng-modules.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'bootstrap', 'blocks/caesar_cipher/caesar_cipher/bootstrap.js',
            array('version' => '3.3.6', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'css', 'caesarcipherdirective', 'blocks/caesar_cipher/caesar_cipher/style.css',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->registerGroup('caesarcipher', array(
            array('javascript', 'angularjs'),
            array('javascript', 'angularjsmodules'),
            array('javascript', 'caesarcipherapp'),
            array('javascript', 'caesarcipherdirective'),
            array('javascript', 'caesarcipherencryption'),
            array('css', 'caesarcipherdirective')
        ));
    }

    public function registerViewAssets()
    {
        $this->requireAsset('javascript', 'jquery');
        $this->requireAsset('caesarcipher');
    }

    public function validate($data)
    {
        $e = Core::make('error');

        if (!$data['plaintext'] XOR !$data['shiftamount'])
        {    
            if (!$data['plaintext']) {
                $e->add(t('You must put something in the plaintext box if entering a shift amount.'));
            }

            if (!$data['shiftamount']) {
                $e->add(t('You must put something in the shift amount box if entering a plaintext string.'));
            }
        }

        if ($data['plaintext'] && $data['shiftamount'])
        {
            if (!is_numeric($data['shiftamount']))
            {
                $e->add(t('The shift amount must be numeric.'));
            }
        }

        return $e;
    }

    public function getBlockTypeDescription()
    {
        return t('A block for an interactive Caesar Cipher.');
    }

    public function save($data)
    {
        $data['shiftamount'] = intval($data['shiftamount']);
        parent::save($data);
    }
}
