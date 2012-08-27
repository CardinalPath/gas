# GAS - Google Analytics on Steroids

## Overview

GAS is a wrapper around the Google Analytics Tracking API from Google. It tries
to add new functionality while keeping the same API.

GAS is not an official Google library and GAS developers are not affiliated 
with Google.

## Installation

To install GAS download the script from [download page][download] and put it somewhere on
your website. Also install the basic snippet on every page of your website. Be
sure to change the Account Number (UA) and the correct gas.js file location.

[download]: https://github.com/CardinalPath/gas/downloads

The basic snippet looks like this:

``` html
<script type="text/javascript">
var _gas = _gas || [];
_gas.push(['_setAccount', 'UA-YYYYYY-Y']); // REPLACE WITH YOUR GA NUMBER
_gas.push(['_setDomainName', '.mydomain.com']); // REPLACE WITH YOUR DOMAIN
_gas.push(['_trackPageview']);
_gas.push(['_gasTrackForms']);
_gas.push(['_gasTrackOutboundLinks']);
_gas.push(['_gasTrackMaxScroll']);
_gas.push(['_gasTrackDownloads']);
_gas.push(['_gasTrackYoutube', {force: true}]);
_gas.push(['_gasTrackVimeo', {force: true}]);
_gas.push(['_gasTrackMailto']);

(function() {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = '/gas.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script> 
```
    

There's no need to include the ga.js file. GAS will load that file for you.
That snippet will enable the common features of GAS.

## API

GAS is based on `_gaq` from Google and as such supports all methods it supports. 
So go check [official documentation][gajs] for the GA Tracker.

[gajs]: http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html

Additionally GAS support a couple more features.

### \_gasTrackForms
`_gas.push(['_gasTrackForms', opts])`

Form Tracking will trigger events every time a user submits a form or changes a
form field.

**parameters**

- _String_ _opts.category_ : The event category (default value is: "Form Tracking")



### \_gasTrackMaxScroll
`_gas.push(['_gasTrackMaxScroll', opts])`

Fire events with the Max-Scroll percentage value for every page the
user views.

**parameters**

- _String_ _opts.category_ : The event category (default value is: "MaxScroll")

### _gasTrackOutboundLinks
`_gas.push(['_gasTrackOutboundLinks', opts])`

This function will look for any outbound links on the current page and will
trigger an event when the link is clicked. It bounds to the `mousedown` 
javascript event

**parameters**

- _String_ _opts.category_ : The event category (default value is: "Outbound")


### _gasTrackDownloads
`_gas.push(['_gasTrackDownloads', opts])`

GAS will track the following extensions by default:
'xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip,rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv'

**parameters**

- _String_ _opts.category_ : The event category (default value is: "Download")
- _String_ _opts.extensions_ : Comma separated list of additional extensions to track.

eg:

``` javascript
_gas.push(['_gasTrackDownloads', {
    category: 'File Downloads',
    extensions: 'torrent,gz,mp4,wav'
}]);
```

### _gasTrackMailto
`_gas.push(['_gasTrackMailto', opts]);`

Tracks clicks on links with `href="mailto:..."`.

**parameters**

- _String_ _opts.category_ : The event category (default value is: "Mailto")

### _gasTrackVimeo
`_gas.push(['_gasTrackVimeo', opts])`

You can track [Vimeo][] video events. You must be using the iframe method 
of embedding videos. 

[Vimeo]: http://www.vimeo.com/

The browser must support HTML5 postMessage. That means it won't work on ie6 
and ie7.

After you enable it the following events will be tracked. 'play', 'pause' and 'finish'.

You should append to the video URL the parameter `api=1`. 
The embedding code should look like this:

``` html
<iframe id="player_1" src="http://player.vimeo.com/video/7100569?api=1" width="540" height="304" frameborder="0" webkitallowfullscreen></iframe> 
```

If you don't provide the `api` parameter than GAS will *force* a reload on the 
iframe adding this parameter. 

**parameters**

- _String_ _opts.category_ : The event category (default value is: "Vimeo Video")
- _boolean_ _opts.force_ : Add required parameters to video "src" causing the video iframe to reload. (default value is: true)

### _gasTrackYoutube
`_gas.push(['_gasTrackYoutube', opts])`

You can track [Youtube][] video events. You must be using the iframe method 
of embedding videos. 

[Youtube]: http://www.youtube.com/

The browser must support HTML5 postMessage. That means it won't work on ie6 
and ie7.

After you enable it the following events will be tracked: 'play', 'pause', 'finish' and 'error'.

You should append to the video URL the parameter `enablejsapi=1`. 
The embedding code should look like this:

``` html
<iframe width="640" height="510" src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1" frameborder="0" allowfullscreen></iframe>
```

If you don't provide the `enablejsapi` parameter than GAS will *force* a 
reload on the iframe adding this parameter. 

**parameters**

- _String_ _opts.category_ : The event category (default value is: "Youtube Video")
- _boolean_ _opts.force_ : Add required parameters to video "src" causing the video iframe to reload. (default value is: true)
- _Array_ _opts.percentages_ : Percentages to track in addition to the default events.

eg: 

``` javascript
_gas.push(['_gasTrackYoutube', {
    percentages: [25, 50, 75, 90]
}]);
```

This will setup Youtube Video Tracking so that events will be fired at 25%, 50%, 75% and 90% in addition to the other standard events, 'play', 'pause', 'finish'.

### _gasMeta
`_gas.push(['_gasMeta']);`

This function should be called before `_trackPageview`. It will look for
Custom Variables as meta elements with `name="ga_custom_var"`. It will also
look for metas with `name="ga_vpv"` to be used as virtual pagepaths for
_trackPageview. Note that ga_vpv will only be aplied with _trackPageview is
called with no parameters.

For metas to control customVars the parameters are the same as calling
`_setCustomVar` but they are delimeted by a caret (^).

eg:

``` html
<meta name="ga_vpv" content="/virtual_url" />
<meta name="ga_custom_var" content="1^Category^Trucks^3" />
<meta name="ga_custom_var" content="2^SignedIn^true^2" />
<meta name="ga_custom_var" content="3^A/B^Original^2" />
```

### _gasMetaEcommerce
`_gas.push(['_gasMetaEcommerce']);`

Will look for ecommerce transactions as meta elements.

eg:

``` html
<meta name="ga_trans" content="1234^Acme Clothing^35.97^1.29^5^San Jose^California^USA" />
<meta name="ga_item" content="1234^DD44^T-Shirt^Green Medium^11.99^1" />
<meta name="ga_item" content="1234^DD45^T-Shirt^Red Medium^11.99^2" />
```

### _gasHTMLMarkup
`_gas.push(['_gasHTMLMarkup']);`

Will enable HTML markup to define events and social hits. It uses attributes
for setting events and social actions.

For events the required attributes are `x-ga-event-categoy` and
`x-ga-event-action`.

eg:

``` html
<div x-ga-event-category="Video"
     x-ga-event-action="play"
     x-ga-event-label="Video Name"
     x-ga-event-value="0"
     x-ga-event-noninteractive="false"
>
        <a href="(...)">Play Video</a>
</div>
```

For Social Actions the required attributes are `x-ga-social-network` and
`x-ga-social-action`.

eg:

``` html
<div
     x-ga-social-network="Pinterest"
     x-ga-social-action="Pin It"
     x-ga-social-target="/targeturlTest.aspx"
     x-ga-social-pagepath="/basePagePath.php"
>
        <a href="(...)">Pin It</a>
</div>
```


## Other GAS Features

GAS changes the behaiour of some functions that are defined on the [official documentation][gajs] to make it easier to implement some very common cases.

### Cross-domain 

This feature help you implementing cross-domain setups. It will find and tag
all links to other domains and mark them with the `_link` or `_linkByPost`
function. You just need to push all domain names with `_setDomainName` and then
call `_gasMultiDomain`


``` javascript
_gas.push(['_setAccount', 'UA-XXXXX-1']);
_gas.push(['_setAllowLinker', true]);
_gas.push(['_setDomainName', 'mysite.com']);
_gas.push(['_setDomainName', 'myothersite.com']);
_gas.push(['_gasMultiDomain', 'click']);
```

The above snippet can be used in either `mysite.com` or `myothersite.com`. 
It will know the right one to use for each case and all other domains pushed to
`_setDomainName` will be used to discover links between the sites. 
The nice side effect is that you can have the same snippet for both websites.

Note that calling `_setDomainName` multiple times is not supported by _gaq. 

GAS respects the settings for `_setAllowAnchor` that you set. 
So if you set it to true all future calls to `_getLinkerUrl`, `_link` and 
`_linkByPost` used by gas will include the boolean `true` for the 
`opt_useAnchor` parameter.

```javascript
_gas.push(['_setAccount', 'UA-XXXXX-1']);
_gas.push(['_setAllowLinker', true]);
_gas.push(['_setAllowAnchor', true]);
_gas.push(['_setDomainName', 'mysite.com']);
_gas.push(['_setDomainName', 'myothersite.com']);
_gas.push(['_gasMultiDomain', 'click']);

```


### Multi-Account Tracking

Easier handling of multi-account setups. You can fire an event to all accounts
or just to one of the accounts you configured,


``` javascript
_gas.push(['_setAccount', 'UA-XXXXX-1']);
_gas.push(['_setAccount', 'UA-XXXXX-2']);
_gas.push(['custom._setAccount', 'UA-XXXXX-3']);

// This will be sent to all 3 accounts
_gas.push(['_trackPageview']);

// This pageview goes only to account UA-XXXXX-3
_gas.push(['custom._trackPageview']);
```

### Changing the Page Title

GAS support changing the page title.


``` javascript
_gas.push(['_trackPageview', {
    page: '/my_page', 
    title: 'My Page Title'
}]);
```

### Hooks for \_gaq Functions

Hooks are a handy feature if you want to monitor or change values of a call to
one of the function from _gaq. You can use it as a filter to lowercase values,
or to trigger events to another tool every time a pageView is fired. You can
assign multiple Hooks.


``` javascript
_gas.push(['_addHook', '_trackPageview', function(page){
    console.log(page);
    if(page.toLowerCase){
        page = page.toLowerCase();
    }
    return [page]
}]);
_gas.push(['_trackPageview', '/Home.aspx']);
```

The above Hook will print the pushed page to the browser console and will
return the page lowercased. So the actual value sent to GA is the lowercased
page. This may be helpful for sites in asp, where lowercase and uppercase
don't matter and will save you the work for creating a GA profile Filter.

Here's another handy Hook for Events. Event values must always be integer
values. The Hook bellow will try to round floats or convert strings to integers
when possible. This should avoid a bad value from canceling the Event.


``` javascript
_gas.push(['_addHook', '_trackEvent', function(cat,act,lab,val){
    if(typeof val == 'string'){
        val = parseInt(val, 10);
    }
    val = Math.round(val);
    return [cat, act, lab, val]
}]);
```


You can also cancel a call returning `false` from a Hook.


``` javascript
_gas.push(['_addHook', '_setVar', function(val){
    _gas.push(['_setCustomVar', 1, 'userType', val, 1]);
    return false;
}]);
```

The above Hook will intercept and cancel any call to the, now deprecated, 
`_setVar`. It will then trigger a call to `_setCustomVar` with an
equivalent value.
