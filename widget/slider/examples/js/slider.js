/* Copyright (c) 2006 Yahoo! Inc. All rights reserved. */YAHOO.widget.Slider=function(_1,_2,_3){if(_1){this.init(_1,_2,true);var _4=this;this.thumb=_3;_3.onChange=function(){_4.onThumbChange();};var el=_3.getEl();this.thumbCenterPoint={x:el.offsetWidth/2,y:el.offsetHeight/2};this.isTarget=false;this.animate=YAHOO.widget.Slider.ANIM_AVAIL;this.baselinePos=YAHOO.util.Dom.getXY(this.getEl());this.tickPause=40;if(_3._isHoriz&&_3.xTicks&&_3.xTicks.length){this.tickPause=Math.round(360/_3.xTicks.length);}else{if(_3.yTicks&&_3.yTicks.length){this.tickPause=Math.round(360/_3.yTicks.length);}}_3.onMouseDown=function(){return _4.focus();};_3.b4MouseDown=function(){return _4.b4MouseDown();};_3.onMouseUp=function(){_4.onMouseUp();};_3.onDrag=function(){_4.fireEvents();};_3.onAvailable=function(){return _4.setStartSliderState();};}};YAHOO.widget.Slider.prototype=new YAHOO.util.DragDrop();YAHOO.widget.Slider.getHorizSlider=function(_6,_7,_8,_9,_10){return new YAHOO.widget.Slider(_6,_6,new YAHOO.widget.SliderThumb(_7,_6,_8,_9,0,0,_10));};YAHOO.widget.Slider.getVertSlider=function(_11,_12,iUp,_14,_15){return new YAHOO.widget.Slider(_11,_11,new YAHOO.widget.SliderThumb(_12,_11,0,0,iUp,_14,_15));};YAHOO.widget.Slider.getSliderRegion=function(_16,_17,_18,_19,iUp,_20,_21){return new YAHOO.widget.Slider(_16,_16,new YAHOO.widget.SliderThumb(_17,_16,_18,_19,iUp,_20,_21));};YAHOO.widget.Slider.ANIM_AVAIL=true;YAHOO.widget.Slider.prototype.setStartSliderState=function(){if(this.thumb._isRegion){if(this.deferredSetRegionValue){this.setRegionValue.apply(this,this.deferredSetRegionValue,true);}else{this.setRegionValue(0,0,true);}}else{if(this.deferredSetValue){this.setValue.apply(this,this.deferredSetValue,true);}else{this.setValue(0,true,true);}}};YAHOO.widget.Slider.prototype.lock=function(){this.thumb.lock();this.locked=true;};YAHOO.widget.Slider.prototype.unlock=function(){this.thumb.unlock();this.locked=false;};YAHOO.widget.Slider.prototype.onMouseUp=function(){this._deferSlideEnd=true;this.fireEvents();};YAHOO.widget.Slider.prototype.focus=function(){var el=this.getEl();if(el.focus){el.focus();}this.verifyOffset();if(this.isLocked()){return false;}else{this.onSlideStart();return true;}};YAHOO.widget.Slider.prototype.onChange=function(_22,_23){};YAHOO.widget.Slider.prototype.onSlideStart=function(){};YAHOO.widget.Slider.prototype.onSlideEnd=function(){};YAHOO.widget.Slider.prototype.getValue=function(){return this.thumb.getValue();};YAHOO.widget.Slider.prototype.getXValue=function(){return this.thumb.getXValue();};YAHOO.widget.Slider.prototype.getYValue=function(){return this.thumb.getYValue();};YAHOO.widget.Slider.prototype.onThumbChange=function(){var t=this.thumb;if(t._isRegion){t.onChange(t.getXValue(),t.getYValue());}else{t.onChange(t.getValue());}};YAHOO.widget.Slider.prototype.setValue=function(_25,_26,_27){if(!this.thumb.available){this.deferredSetValue=arguments;}if(this.isLocked()&&!_27){return false;}if(isNaN(_25)){return false;}var t=this.thumb;var _28,newY;if(t._isRegion){return false;}else{if(t._isHoriz){_28=t.initPageX+_25+this.thumbCenterPoint.x;this.moveThumb(_28,t.initPageY,_26);}else{newY=t.initPageY+_25+this.thumbCenterPoint.y;this.moveThumb(t.initPageX,newY,_26);}}return true;};YAHOO.widget.Slider.prototype.setRegionValue=function(_29,_30,_31){if(!this.thumb.available){this.deferredSetRegionValue=arguments;}if(this.isLocked()&&!force){return false;}if(isNaN(_29)){return false;}var t=this.thumb;if(t._isRegion){var _32=t.initPageX+_29+this.thumbCenterPoint.x;var _33=t.initPageY+_30+this.thumbCenterPoint.y;this.moveThumb(_32,_33,_31);return true;}return false;};YAHOO.widget.Slider.prototype.verifyOffset=function(){var _34=YAHOO.util.Dom.getXY(this.getEl());if(_34[0]!=this.baselinePos[0]||_34[1]!=this.baselinePos[1]){this.thumb.resetConstraints();this.baselinePos=_34;return false;}return true;};YAHOO.widget.Slider.prototype.moveThumb=function(x,y,_37){if(!this.thumb.available){return;}this.verifyOffset();var _38=this;var t=this.thumb;t.setDelta(this.thumbCenterPoint.x,this.thumbCenterPoint.y);var _p=t.getTargetCoord(x,y);var p=[_p.x,_p.y];if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&t._graduated&&!_37){this.lock();setTimeout(function(){_38.moveOneTick(p);},this.tickPause);}else{if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&!_37){this.lock();var _41=new YAHOO.util.Motion(t.id,{points:{to:p}},0.4,YAHOO.util.Easing.easeOut);_41.onComplete.subscribe(function(){_38.endAnim();});_41.animate();}else{t.setDragElPos(x,y);this.fireEvents();}}};YAHOO.widget.Slider.prototype.moveOneTick=function(_42){var t=this.thumb;var _43=YAHOO.util.Dom.getXY(t.getEl());var tmp;var _45=null;if(t._isRegion){_45=this._getNextX(_43,_42);var _46=(_45)?_45[0]:_43[0];_45=this._getNextY([_46,_43[1]],_42);}else{if(t._isHoriz){_45=this._getNextX(_43,_42);}else{_45=this._getNextY(_43,_42);}}if(_45){YAHOO.util.Dom.setXY(t.getEl(),_45);if(!(_45[0]==_42[0]&&_45[1]==_42[1])){var _47=this;setTimeout(function(){_47.moveOneTick(_42);},this.tickPause);}else{this.unlock();this.fireEvents();}}else{this.unlock();this.fireEvents();}};YAHOO.widget.Slider.prototype._getNextX=function(_48,_49){var t=this.thumb;var _50;var tmp=[];var _51=null;if(_48[0]>_49[0]){_50=t.tickSize-this.thumbCenterPoint.x;tmp=t.getTargetCoord(_48[0]-_50,_48[1]);_51=[tmp.x,tmp.y];}else{if(_48[0]<_49[0]){_50=t.tickSize+this.thumbCenterPoint.x;tmp=t.getTargetCoord(_48[0]+_50,_48[1]);_51=[tmp.x,tmp.y];}else{}}return _51;};YAHOO.widget.Slider.prototype._getNextY=function(_52,_53){var t=this.thumb;var _54;var tmp=[];var _55=null;if(_52[1]>_53[1]){_54=t.tickSize-this.thumbCenterPoint.y;tmp=t.getTargetCoord(_52[0],_52[1]-_54);_55=[tmp.x,tmp.y];}else{if(_52[1]<_53[1]){_54=t.tickSize+this.thumbCenterPoint.y;tmp=t.getTargetCoord(_52[0],_52[1]+_54);_55=[tmp.x,tmp.y];}else{}}return _55;};YAHOO.widget.Slider.prototype.b4MouseDown=function(e){this.thumb.resetConstraints();};YAHOO.widget.Slider.prototype.onMouseDown=function(e){if(!this.isLocked()){var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.moveThumb(x,y);this.focus();}};YAHOO.widget.Slider.prototype.onDrag=function(e){if(!this.isLocked()){var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.moveThumb(x,y,true);}};YAHOO.widget.Slider.prototype.endAnim=function(){this.unlock();this.fireEvents();};YAHOO.widget.Slider.prototype.fireEvents=function(){var t=this.thumb;t.cachePosition();if(!this.isLocked()){if(t._isRegion){var _57=t.getXValue();var _58=t.getYValue();if(_57!=this.previousX||_58!=this.previousY){this.onChange(_57,_58);}this.previousX=_57;this.previousY=_58;}else{var _59=t.getValue();if(_59!=this.previousVal){this.onChange(_59);}this.previousVal=_59;}if(this._deferSlideEnd){this.onSlideEnd();this._deferSlideEnd=false;}}};YAHOO.widget.SliderThumb=function(id,_61,_62,_63,iUp,_64,_65){if(id){this.init(id,_61);this.parentElId=_61;}this.isTarget=false;this.tickSize=_65;this.maintainOffset=true;this.initSlider(_62,_63,iUp,_64,_65);this.scroll=false;};YAHOO.widget.SliderThumb.prototype=new YAHOO.util.DD();YAHOO.widget.SliderThumb.prototype.getOffsetFromParent=function(){var _66=YAHOO.util.Dom.getXY(this.getEl());var _67=YAHOO.util.Dom.getXY(this.parentElId);return [(_66[0]-_67[0]),(_66[1]-_67[1])];};YAHOO.widget.SliderThumb.prototype.startOffset=null;YAHOO.widget.SliderThumb.prototype._isHoriz=false;YAHOO.widget.SliderThumb.prototype._prevVal=0;YAHOO.widget.SliderThumb.prototype._graduated=false;YAHOO.widget.SliderThumb.prototype.initSlider=function(_68,_69,iUp,_70,_71){this.setXConstraint(_68,_69,_71);this.setYConstraint(iUp,_70,_71);if(_71&&_71>1){this._graduated=true;}this._isHoriz=(_68>0||_69>0);this._isVert=(iUp>0||_70>0);this._isRegion=(this._isHoriz&&this._isVert);this.startOffset=this.getOffsetFromParent();};YAHOO.widget.SliderThumb.prototype.getValue=function(){var val=(this._isHoriz)?this.getXValue():this.getYValue();return val;};YAHOO.widget.SliderThumb.prototype.getXValue=function(){var _73=this.getOffsetFromParent();return (_73[0]-this.startOffset[0]);};YAHOO.widget.SliderThumb.prototype.getYValue=function(){var _74=this.getOffsetFromParent();return (_74[1]-this.startOffset[1]);};YAHOO.widget.SliderThumb.prototype.onChange=function(x,y){};if("undefined"==typeof YAHOO.util.Anim){YAHOO.widget.Slider.ANIM_AVAIL=false;}