//"use strict";

(function ($) {
	$.paperTossSupported = (function () {
		var $c = $('<canvas />'), ctx;
		if (!$c[0] || !$c[0].getContext) return false;
		ctx = $c[0].getContext('2d');
		//if (!ctx.getImageData) return false;
		//if (!ctx.fillText) return false;
		if (!Array.prototype.some) return false;
		if (!Array.prototype.push) return false;
		return true;
	}());

	$.fn.paperToss = function (options) {
		if (!$.paperTossSupported) return this;
		
		var settings = {
			gravity: -9.8/10, //px
			wind: [0, 0],
			initPos: [0, 0],
			initSpeed: [10, 30],
			bucketPos: [550, 60],
			bucketSize: [60, 60],
			bucketImage: null,
			bucketImageSize: [0, 0],
			ballImage: null,
			ballSize: 20,
			ballRotate: true,
			inBucket: $.noop,
			outBucket: $.noop,
			complete: $.noop
		},
		coor = function (xy, dim) {
			return [xy[0], dim[1]-xy[1]];
		},
		visual = function (ctx, pos, spd) {
			if (settings.ballImage) {
					var bc = $('<canvas />')[0];
					bc.width = settings.ballSize;
					bc.height = settings.ballSize;
					
					var bctx = bc.getContext('2d');
					bctx.translate(settings.ballSize/2, settings.ballSize/2);
					bctx.rotate(Math.random()*Math.PI);
					bctx.drawImage(settings.ballImage, -settings.ballSize/2, -settings.ballSize/2, settings.ballSize, settings.ballSize);
					ctx.drawImage(
						bc,
						pos[0],
						pos[1],
						settings.ballSize,
						settings.ballSize
					);
			} else {
				ctx.fillStyle = '#000';
				ctx.fillRect(pos[0], pos[1], 3, 3);
			}
		},
		drawBucket = function (ctx, pos, size) {
/*			if (typeof settings.bucketImage === 'string') {
				var image = new Image();
				image.onload = function () {
					console.log(image.width, image.height);
					ctx.drawImage(
						image,
//						0, 0,
//						image.width, image.height,
						pos[0],
						pos[1],
						size[0],
						size[1]
					);
				};
				image.src = settings.bucketImage;
			} else if (typeof settings.bucketImage === 'object') {
					ctx.drawImage(
						settings.bucketImage,
//						0, 0,
//						settings.bucketImage.width, settings.bucketImage.width,
						pos[0],
						pos[1],
						size[0],
						size[1]
					);
			} else { */
				ctx.fillStyle = 'rgba(255,0,0,0.6)';
				ctx.fillRect(pos[0], pos[1], size[0], size[1]);
//			}
		};
		
		if (options) { 
			$.extend(settings, options);
		}

		return this.each(function() {
			if (this.nodeName.toLowerCase() !== 'canvas') return;

			var WH = [
				$(this).attr('width'),
				$(this).attr('height')
			],
			currentPos = settings.initPos,
			currentSpeed = settings.initSpeed,
			ctx = this.getContext('2d')
			timer = setInterval(
				function () {
					currentSpeed = [
						currentSpeed[0] + settings.wind[0],
						currentSpeed[1] + settings.wind[1] + settings.gravity,
					];
					currentPos = [
						currentPos[0] + currentSpeed[0],
						currentPos[1] + currentSpeed[1]
					];
					
					visual(ctx, coor(currentPos, WH), coor(currentSpeed, WH));
					
					if (
						currentPos[0] > settings.bucketPos[0]
						&& currentPos[0] < settings.bucketPos[0] + settings.bucketSize[0]
						&& currentPos[1] > settings.bucketPos[1]
						&& currentPos[1] < settings.bucketPos[1] + settings.bucketSize[1]
					) {
						settings.inBucket();
						settings.complete();
						clearTimeout(timer);					
					}
					if (currentPos[0] > WH[0] 
						|| currentPos[0] < 0
						|| currentPos[1] > WH[1]
						|| currentPos[1] < 0 ) {
						settings.outBucket();
						settings.complete();
						clearTimeout(timer);
					}
				},
				0
			);
			
			drawBucket(ctx, coor(settings.bucketPos, WH), coor(settings.bucketSize, WH)); 
		});

	}
	
})(jQuery);