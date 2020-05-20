<!-- Twitter button from https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview-->
<!-- Facebook Share button from https://developers.facebook.com/docs/plugins/share-button-->

<main>
    <!-- twitter plugin -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

    <!-- facebook SDK for javascript -->
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=3238023856261896&autoLogAppEvents=1">

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    </script>

    <div id="buttons">

        <div>
            <a href="https://twitter.com/intent/tweet?button_hashtag=CCHugs&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="Send a virtual hug today!" data-url="https://cchugs.xyz" data-show-count="false">Tweet</a>
        </div>

        <div class="fb-share-button" data-href="https://cchugs.xyz" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcchugs.xyz%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share on Facebook</a>
        </div>
        
    </div>
    
</main>


<style>
    div{
      display: flex;
      margin-left: 3px;
    }
</style>
