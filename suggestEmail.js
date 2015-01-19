/**
 * @author liangbin
 *
 * denpendence: only jQuery
 *
 * args: reference _opt
 *
 * example: $("emali").suggestEmail({local: "en"})
 */


jQuery.fn.suggestEmail = function(options){
	var _this = $(this);
	var _opt = {local: "zh" , liSelect: "liSelect"}
	var _emails = {	zh: ["qq.com", "163.com", "126.com", "sina.com", "gmail.com"], 
					en: ["gmail.com", "hotmail.com", "hotmail.co.uk", "yahoo.com", "yahoo.co.uk", "aol.com", "mail.ru", "rediffmail.com", "live.com", "msn.com"]
					};
	var _listContainer, _liArr, _curLi, _liLen;
	function init(){
		if(!_this){
			throw "Input is not exists."
		}
		
		if(_this.length > 1)
			throw "Array is not accepted!"
		
		if(_this.filter("[type='text']").length !==1)
			throw "Input is not a Text Input!"
		
		_generateMailList();
		_this.bind("keyup", _keyUp);
		_this.bind("keydown", _keyDown);
		_liArr.bind("mouseover", _mouseOver);
		_liArr.bind("mouseout", _mouseOut);
		$(document).bind("click", _click);
	}
	
	function _keyUp(e){
		if(_this.val()){
			switch(e.keyCode){
			case 38: 
				_up();
				break;
			case 40:
				_down();
				break;
			case 13:
				_enter();
				break;
			default:
				_changeListVal(_this.val());
				break;
			}
		};
	};
	
	function _keyDown(e){
		if(e.keyCode === 38 || e.keyCode ===40){
			e.preventDefault();
			e.stopPropagation();
		}
	}
	
	function _mouseOver(e){
		$(this).addClass(_opt.liSelect);
	}
	
	function _mouseOut(e){
		_liArr.removeClass(_opt.liSelect);
	}
	
	function _click(e){
		if(_listContainer.is(":visible")){
			if($.inArray(e.target, _listContainer[0].childNodes) > -1){
				_enter();
			}else{
                _listContainer.hide();
            }
		}
	}
	
	function _generateMailList(){
		_listContainer = $("<ul></ul>");
		$.each(_emails[_opt.local], function(index, item){
			_listContainer.append("<li style=\"padding: 5px 10px; cursor: pointer;\">undefined@" + item +"</li>");
		});
		$(_listContainer).appendTo($("body"));
		var cssHash = {"display": "none", "position": "absolute", "top": _this.offset().top -1 + _this.outerHeight(), "left": _this.offset().left, "min-width": _this.outerWidth() - 2, "_width": _this.outerWidth(), "background": "#FFF", "border": "1px solid #CCC", "font": "12px/1.5 Arial", "list-style": "none", "margin": "0", padding: "0", "z-index": "9999"}
		_listContainer.css(cssHash);
		if($("style").length === 0)
		$("head").append("<style type=\"text/css\"></style>");
		$("style").append(".liSelect {background: #eeeeee;}")
		_liArr = _listContainer.children();
		_liLen = _liArr.length;
	}
	
	function _changeListVal(v){
		v = /(.*)@(.*)/.test(v) ? RegExp.$1 : v;
		if(!RegExp.$2)
		{
			$.each(_listContainer.children(), function(index, li){
				$(li).text($(li).text().replace(/.*@/, v+"@"));
			});
            var cssHash = {"display": "none", "position": "absolute", "top": _this.offset().top -1 + _this.outerHeight(), "left": _this.offset().left, "min-width": _this.outerWidth() - 2, "_width": _this.outerWidth(), "background": "#FFF", "border": "1px solid #CCC", "font": "12px/1.5 Arial", "list-style": "none", "margin": "0", padding: "0", "z-index": "9999"}
            _listContainer.css(cssHash);
			_listContainer.show();
		}else{
			_listContainer.hide();
		}
	}
	
	function _up(){
		_curLi = typeof(_curLi) === "number" ? _curLi : 0;
		_curLi--;
		_curLi = _curLi < 0 ? _curLi + _liLen :_curLi;
		_liArr.removeClass(_opt.liSelect);
		_liArr.eq(_curLi).addClass(_opt.liSelect);
	}
	
	function _down(){
		_curLi = typeof(_curLi) === "number" ? _curLi : -1;
		_curLi++;
		_curLi = _curLi >= _liLen ? _curLi -_liLen : _curLi;
		_liArr.removeClass(_opt.liSelect);
		_liArr.eq(_curLi).addClass(_opt.liSelect);
	}
	
	function _enter(){
		_this.val(_liArr.filter("." + _opt.liSelect).text());
		_listContainer.hide();
		_liArr.removeClass(_opt.liSelect);
        _this.focus();
	}
	
	return function(){
		_opt = $.extend(_opt, options);
		init();
	}();
};

