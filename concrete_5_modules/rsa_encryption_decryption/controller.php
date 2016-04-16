<?php

namespace Application\Block\RSAEncryptionDecryption;

use Concrete\Core\Block\BlockController;
use Concrete\Core\Asset\AssetList;
use Concrete\Core\Asset\Asset;
use Core;

defined('C5_EXECUTE') or die(_("Access Denied."));

class Controller extends BlockController
{
    protected $btDefaultSet = 'basic';

    public function getBlockTypeName()
    {
        return t('RSA Encryption Decryption');
    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register(
            'javascript', 'rsakeygenerationapp', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/app/myApp.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsakeygenerationdirective', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/app/encryption/EncryptionDirectives.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsaencryption', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/app/EncryptionFactory.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsamath', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/app/MathService.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'biginteger', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/BigInteger.min.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjs', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/angular.js',
            array('version' => '1.5.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjsmodules', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/angular.ng-modules.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'bootstrap', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/bootstrap.js',
            array('version' => '3.3.6', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'css', 'rsakeygenerationdirective', 'blocks/rsa_encryption_decryption/rsa_encryption_decryption/style.css',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->registerGroup('rsa-encryption-decryption', array(
            array('javascript', 'angularjs'),
            array('javascript', 'angularjsmodules'),
            array('javascript', 'biginteger'),
            array('javascript', 'rsakeygenerationapp'),
            array('javascript', 'rsakeygenerationdirective'),
            array('javascript', 'rsaencryption'),
            array('javascript', 'rsamath'),
            array('css', 'rsakeygenerationdirective')
        ));
    }

    public function registerViewAssets()
    {
        $this->requireAsset('javascript', 'jquery');
        $this->requireAsset('rsa-encryption-decryption');
    }

    public function getBlockTypeDescription()
    {
        return t('A block for an interactive RSA Cryptography.');
    }
}
