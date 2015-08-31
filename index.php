<html>
<head>
    <title>My Hype Man : SoundCloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <link rel="apple-touch-icon" href="/schm/apple-touch.png" />
    <link rel="stylesheet" type="text/css" href="css/schm.css"/>
    <script src="js/jquery-1.10.1.min.js"></script>
    <script src="//connect.soundcloud.com/sdk-2.0.0.js"></script>
    <script src="js/schm.js"></script>
    <script id="body-tmpl" type="text/html">
        <div id="infoBar">
            <div id="ib-avatar" class="leftey"></div>
            <div id="ib-LeftSide" class="leftey">
                <div id="ib-username"></div>
                <div class="clear"></div>
                <div id="ib-followers" class="leftey"></div><div id="ib-plays" class="leftey"></div>
            </div>
            <div id="ib-rightSide" class="rightey">
            </div>
            <div class="clear"></div>
        </div>
        <ul id="tracks" class="bulletinthehead"></ul>
    </script>
</head>
<body>
    <?php include_once("../ga.php") ?>
    <div id="infoBar">
        <a id="soundCloudConnect" class="leftey" href="javascript:void(0);" title="Connect with SoundCloud"></a>
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
    <div class="holder">
        <div class="sector">
            <h2>Post to groups with one click!</h2>
            <div class="centerme">
                <img id="schm-scrnshot" src="imgs/soundcloud-hype-man-screenshot.png"/>
            </div>
            <div class="clear"></div>
            <h2>Start hyping up your crowd!</h2>
            <a href="http://www.youtube.com/watch?v=PdQ4aKP4jvg" title="Watch on YouTube" target="_blank"><div id="hypeManLeft" class="leftey"></div></a>
            <div id="hypeManRight" class="rightey">
                <div id="hmr-txt">
                    <p>"A hype man is a figure who plays a central but supporting role within a group, making his own interventions, generally aimed at hyping up the crowd while also drawing attention to the words of the MC".</p>
                    <p>- Excerpt from <a href="http://en.wikipedia.org/wiki/Hype_man" target="_blank" title="Read full article on Wikipedia">Wikipedia</a></p>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</body>
</html>
