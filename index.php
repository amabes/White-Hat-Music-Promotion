<html>
<head>
    <meta charset="utf-8">
    <title>WHITE HAT</title>
    <meta name="description" content="White Hat Music Promotion helps artists promote their music on SoundCloud for FREE with simple mobile friendly tools.">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />-->
    <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/skeleton.css">
    <link rel="stylesheet" href="css/overzealous-alert.css"/>
    <link rel="stylesheet" href="css/schm.css"/>
    <link rel="icon" type="image/png" href="imgs/favicon.png">
    <link rel="apple-touch-icon" href="imgs/apple-touch.png" />    
    <script src="js/jquery-1.10.1.min.js"></script>
    <script src="//connect.soundcloud.com/sdk-2.0.0.js"></script>
    <script src="js/overzealous-alert.js"></script>
    <script src="js/schm.js"></script>

    <script id="body-tmpl" type="text/html">
        <div id="infoBar">
            <div id="ib-avatar" class="leftey"></div>
            <div id="ib-LeftSide" class="leftey">
                <div id="ib-username"></div>
                <div class="clear"></div>
                <div id="ib-followers" class="leftey"></div>
                <div id="ib-plays" class="leftey"></div>
            </div>
            <div id="ib-rightSide" class="rightey">
            </div>
            <div class="clear"></div>
        </div>
        <ul id="tracks" class="bulletinthehead"></ul>
    </script>
</head>
<body class="front">
    <?php include_once("../ga.php") ?>
    <div id="infoBar">
        <img id="logo" src="imgs/logo.png" width="35px" class="leftey" />
        <h3 class="leftey">WHITE HAT</h3>
        
        <div class="rightey">
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                <input type="hidden" name="cmd" value="_s-xclick">
                <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
">
                <input id="donate" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
            </form>
        </div>
    </div>
    
    <div class="container">
        <div class="row">
            <div id="tagline" class="column centerme">
                <h3>Grow your Fan Base</h3>
                <h2>FREE tools that get your music heard by fans with ONE click.</h2>
                <div class="centerme">
                    <a id="soundCloudConnect" href="javascript:void(0);" title="Connect with SoundCloud"></a>
                </div>
            </div>
        </div>
        
        <div id="how-it-works">

            <div class="row" style="">
                <div class="column centerme">
                    <h3>How it works</h3>
                    <h2>Increase SoundCloud plays, follows, likes and comments in 3 steps.</h2>
                </div>
            </div>

            <div class="row">
                <div class="one-third column centerme">
                    <p>
                        <img id="group" class="promo-icons" src="imgs/group.png" width="60"/>
                    </p>
                    <h2>1. Join groups where you want your music heard.</h2>
                </div>
                <div class="one-third column centerme">
                    <p>
                        <img id="add-to-group" class="promo-icons" src="imgs/add-to-group.png" height="40"/>
                    </p>
                    <h2>2. Add tracks to 75 groups with ONE click.</h2>
                </div>

                <div class="one-third column centerme">
                    <p>
                        <img id="bell" class="promo-icons" src="imgs/bell.png" width="60"/>
                    </p>
                    <h2>3. Repeat steps 1-2 once a day for as long as you like.</h2>
                </div>
            </div>

        </div>
    </div>

</body>
</html>
