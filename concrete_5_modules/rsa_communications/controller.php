<?php

namespace Application\Block\RSACommunications;

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
        return t('RSA Scenarios');
    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register(
            'javascript', 'rsakeygenerationapp', 'blocks/rsa_communications/rsa_communications/app/myApp.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsakeygenerationdirective', 'blocks/rsa_communications/rsa_communications/app/encryption/EncryptionDirectives.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsaencryption', 'blocks/rsa_communications/rsa_communications/app/EncryptionFactory.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsamath', 'blocks/rsa_communications/rsa_communications/app/MathService.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'biginteger', 'blocks/rsa_communications/rsa_communications/BigInteger.min.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjs', 'blocks/rsa_communications/rsa_communications/angular.js',
            array('version' => '1.5.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'angularjsmodules', 'blocks/rsa_communications/rsa_communications/angular.ng-modules.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'bootstrap', 'blocks/rsa_communications/rsa_communications/bootstrap.js',
            array('version' => '3.3.6', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'css', 'rsakeygenerationdirective', 'blocks/rsa_communications/rsa_communications/style.css',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsaanimationdirective', 'blocks/rsa_communications/rsa_communications/app/AnimationDirectives.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsaanimationmodel', 'blocks/rsa_communications/rsa_communications/app/AnimationModelFactory.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsaanimationservice', 'blocks/rsa_communications/rsa_communications/app/AnimationService.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsalinkdirective', 'blocks/rsa_communications/rsa_communications/app/animation/link-directive.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsamessagedirective', 'blocks/rsa_communications/rsa_communications/app/animation/message-directive.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'rsapcnodedirective', 'blocks/rsa_communications/rsa_communications/app/animation/pc-node-directive.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->register(
            'javascript', 'svganimation', 'blocks/rsa_communications/rsa_communications/app/animation/svg-animation.js',
            array('version' => '1.0.0', 'minify' => false, 'combine' => false)
        );

        $al->registerGroup('rsa-animation', array(
            array('javascript', 'angularjs'),
            array('javascript', 'angularjsmodules'),
            array('javascript', 'biginteger'),
            array('javascript', 'rsakeygenerationapp'),
            array('javascript', 'rsakeygenerationdirective'),
            array('javascript', 'rsaencryption'),
            array('javascript', 'rsamath'),
            array('javascript', 'rsaanimationdirective'),
            array('javascript', 'rsaanimationmodel'),
            array('javascript', 'rsaanimationservice'),
            array('javascript', 'rsalinkdirective'),
            array('javascript', 'rsamessagedirective'),
            array('javascript', 'rsapcnodedirective'),
            array('javascript', 'svganimation'),
            array('css', 'rsakeygenerationdirective')
        ));
    }

    public function registerViewAssets()
    {
        $this->requireAsset('javascript', 'jquery');
        $this->requireAsset('rsa-animation');
    }

    public function getBlockTypeDescription()
    {
        return t('A block for an interactive RSA Cryptography.');
    }
}
