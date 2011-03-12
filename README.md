# IE9 Hackathon HTML5 demo: Paper toss

This is the demo I made on site at [IE9 Hackathon](http://msdn.microsoft.com/zh-tw/gg609322.aspx) for Microsoft Taiwan. I got 3rd place and won an XBox 360 with Kinect with this :)

Position and wind drag is not calculate with physics engine :P. The effect of wind drag and gravity are simply added at every loop.

## Demonstrated Technologies
* jQuery, jQuery plugin
* &lt;canvas&gt;
 * drawImage()
 * rotate()
 * translate()
* Inline SVG
* &lt;img&gt; SVG
* CSS transform
* CSS text-shadow

## Known issue

* Doesn't work on Firefox for unknown reason (it complain about image not ready)
* Webkit doesn't calculate the native size of an SVG image correctly; that's why the HTML5 logo is distorted.

## Image copyright

* HTML5 logo is a trademark owned by W3C
* IE9 logos and Windows wallpapers are owned by Microsoft and/or the creator.
 * Break XP wallpaper is found [here](http://pixdaus.com/single.php?id=24259)
 * Windows ME wallpaper is found [here](http://www.flickr.com/photos/30569203@N07/4649952290/sizes/l/)