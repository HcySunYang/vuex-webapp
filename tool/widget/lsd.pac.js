/**
 * @desc H5左滑删除 组件
 * @copyright (c) 2016 doumi Inc
 * @author 霍春阳 <huochunyang1@doumi.com>
 * @since 2016-03-29 */

import Hammer from 'tool/lib/hammer.js'
// var hammertime = new Hammer(myElement, myOptions);
// hammertime.on('pan', function(ev) {
//     console.log(ev);
// });
;(function(win, doc, undefined){

	var LeftSlideDelete = function(opations){
		// 配置参数
		this.settings = {
			contentSelete : '.lsd-content',
			deleteSelete : '.lsd-delete',
			deleteBtnWidth: 84,
			deleteCallback : function(){

			}
		};

		$.extend(this.settings, opations);

		this.startPosX = 0;
		this.startPosY = 0;
		this.curPosX = 0;
		this.curPosY = 0;
		this.endPos = 0;
		this.disX = 0;
		this.disY = 0;
		this.tanValue = 0.5774;
		this.lockX = true;
		this.lockY = true;
		this.endTimer = [];
		this.lockMark = null;
		this.maxSlideWidth = this.settings.deleteBtnWidth + 30;
		// this.bindEventTimer = null;
		this.lockMarkTimer = null;
		this.endFnTimer = null;

		this.contentDom = $(this.settings.contentSelete);
		this.deleteDom = $(this.settings.deleteSelete);

		this.createLockMarkDom();

		this.bind();

	};

	var proto = LeftSlideDelete.prototype;

	$.extend(proto, {

		constructor : LeftSlideDelete,

		createLockMarkDom : function(){
			var self = this;
			if(!this.lockMark){
				var lockMark = document.createElement('div');
				this.lockMark = lockMark;

				lockMark.style.position = 'fixed';
				lockMark.style.display = 'none';
				lockMark.style.width = '100%';
				lockMark.style.height = '100%';
				lockMark.style.background = '#ffad0f';
				lockMark.style.opacity = '0.5';
				lockMark.style.zIndex = '10000';
				lockMark.style.top = '0';
				lockMark.style.left = '0';

				$(lockMark).on('touchstart', function(){
					var Domself = this;

					for(var i = 0; i < self.endTimer.length; i++){
						(function(i){
							clearTimeout(self.endTimer[i]);
						})(i);
					}
					self.endTimer = [];

					// console.log($(self.settings.deleteSelete))
					$(self.settings.deleteSelete).css({zIndex: 1})
					self.addTransionStyle(self.settings.contentSelete, '0.3s');
					self.setTranslateX(self.settings.contentSelete, 0);
					clearTimeout(self.lockMarkTimer)
					self.lockMarkTimer = setTimeout(function(){
						Domself.style.display = 'none';
						self.addTransionStyle(self.settings.contentSelete, '0s');
					}, 300);

					self.bindSlide();


				});
				$(lockMark).on('touchmove', function(event){
					
					event.preventDefault();
					return false;

				});
				document.body.appendChild(lockMark);
			}
		},

		bind : function(){

			var self = this;

			self.bindSlide();

			$(self.settings.deleteSelete).on('click', function(){
				self.settings.deleteCallback(this);
			})
		},

		bindSlide : function(){
			var self = this;
			$(self.settings.contentSelete).off('touchstart');
			$(self.settings.contentSelete).off('touchmove');
			$(self.settings.contentSelete).off('touchend');
			$(self.settings.contentSelete).on('touchstart', function(event){
				self.contentTouchStartFn(event, this);
			});
			$(self.settings.contentSelete).on('touchmove', function(event){
				self.contentTouchMoveFn(event, this);
			});
			$(self.settings.contentSelete).on('touchend', function(event){
				self.contentTouchEndFn(event, this);
			});
		},

		contentTouchStartFn : function(event, Obj){

			// $(this).addClass('content-not')
			console.log(event.touches.length)
			var self = this;
			$(self.settings.contentSelete).not(Obj).off('touchstart');
			$(self.settings.contentSelete).not(Obj).off('touchmove');
			$(self.settings.contentSelete).not(Obj).off('touchend');

			self.startPosX = 0;
			self.startPosY = 0;
			self.curPosX = 0;
			self.curPosY = 0;
			self.endPos = 0;
			self.disX = 0;
			self.disY = 0;

			self.startPosX = event.touches[0].pageX;
			self.startPosY = event.touches[0].pageY;
		},

		contentTouchMoveFn : function(event, obj){

			var self = this;
			self.curPosX = event.touches[0].pageX;
			self.curPosY = event.touches[0].pageY;

			self.disX = (self.curPosX - self.startPosX);
			self.disY = (self.curPosY - self.startPosY);

			if(self.disX > 0){
				self.disX = 0;
			}

			if(self.disX < -self.maxSlideWidth){
				self.disX = -self.maxSlideWidth;
			}
			// console.log(Math.abs(self.disX) + '------' + Math.abs(self.disY) + '------' + ((Math.abs(self.disY) / Math.abs(self.disX))))
		// $(this).html(((Math.abs(disY) / Math.abs(disX))));
			if(self.lockY && Math.abs(self.disY) / Math.abs(self.disX) >= self.tanValue){
				self.lockX = false;
			}
			if(self.lockX && Math.abs(self.disY) / Math.abs(self.disX) < self.tanValue || !self.lockY){
				self.lockY = false;

				self.setTranslateX(obj, self.disX);

				event.preventDefault();
				return false;
			}
			$('.product-title').html(event.touches.length)
			
		},

		contentTouchEndFn : function(event, obj){
			var self = this;
			var deleteBtnObj = $(obj).parent().find(self.settings.deleteSelete);

			if(self.lockX){
				if(-10 < self.disX){
					self.bindSlide();
				}else if(self.disX <= -(self.settings.deleteBtnWidth / 2)){
					self.disX = -self.settings.deleteBtnWidth;
					self.lockMark.style.display = 'block';
					self.endTimer.push(setTimeout(function(){
						$(deleteBtnObj).css({zIndex: 100000});
					}, 300));
				}else{
					self.lockMark.style.display = 'block';
					self.endTimer.push(setTimeout(function(){
						self.lockMark.style.display = 'none';
					}, 300));
					self.disX = 0;

					self.bindSlide();
				}
				self.addTransionStyle(obj, '0.3s');
				self.setTranslateX(obj, self.disX);
				
				self.endTimer.push(setTimeout(function(){
					self.addTransionStyle(obj, '0s');
				}, 300));
			}else{
				clearTimeout(self.endFnTimer)
				self.endFnTimer = setTimeout(function(){
					self.bindSlide();
				}, 800)
				
			}

			
			self.lockX = true;
			self.lockY = true;

			
		},

		setTranslateX : function(obj, diff) {
		    $(obj).css({
		        "-webkit-transform": "translateX(" + diff + "px)",
		        "transform": "translateX(" + diff + "px)"
		    });
		    $(obj).data('translateX', diff);
		},

		addTransionStyle : function(obj, str){
			$(obj).css({
				"transition": str,
				"WebkitTransition": str,
				"MozTransition": str,
				"OTransition": str,
				"msTransition": str
			});
		}


	});


	// 暴露接口
	if (typeof module !== 'undefined' && module.exports) {
	    module.exports = LeftSlideDelete;
	} else {
	    win.LeftSlideDelete = LeftSlideDelete;
	}
})(window, document);

	
