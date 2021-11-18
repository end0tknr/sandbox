'use strict';

{
    var WindowBase = function() {
	
	this.sp_menu_open   = document.getElementById('sp_menu_open');
	this.sp_menu_close  = document.getElementById('sp_menu_close');
	this.sp_menu_overlay= document.getElementById('sp_menu_overlay');

	this.carousel_next  = document.getElementById('carousel_next');
	this.carousel_prev  = document.getElementById('carousel_prev');
	this.carousel_ul    = document.querySelector('.carousel ul');
	this.carousel_slides= this.carousel_ul.children;
	this.carousel_dots  = [];
	this.carousel_index = 0;

	this.tab_menu_items   = document.querySelectorAll('.tab_menu_container .menu li a');
	this.tab_menu_contents= document.querySelectorAll('.tab_menu_container .content');

    };

    WindowBase.prototype = {
	
	init_window: function(){
	    this.add_event_listeners();
	    this.setup_carousel_dots();
	    this.update_carousel_buttons();
	},

	add_event_listeners: function(){
	    var this_obj = this;

	    // スマホメニューの表示/非表示 切替え
	    this_obj.sp_menu_open.addEventListener('click', () => {
		this_obj.sp_menu_overlay.classList.add('show');
		this_obj.sp_menu_open.classList.add('hide');
	    });
	    this_obj.sp_menu_close.addEventListener('click', () => {
		this_obj.sp_menu_overlay.classList.remove('show');
		this_obj.sp_menu_open.classList.remove('hide');
	    });

	    // カルーセルの左右スライド
	    this_obj.carousel_next.addEventListener('click', () => {
		this_obj.carousel_index += 1;
		this_obj.update_carousel_buttons();
		this_obj.update_carousel_dots();
		this_obj.slide_carousel();
	    });
	    this_obj.carousel_prev.addEventListener('click', () => {
		this_obj.carousel_index -= 1;
		this_obj.update_carousel_buttons();
		this_obj.update_carousel_dots();
		this_obj.slide_carousel();
	    });
	    // カルーセルのサイズをwinサイズに追従
	    window.addEventListener('resize', () => {
		this_obj.slide_carousel();
	    });

	    // tabメニュの表示切替え
	    this.tab_menu_items.forEach(clicked_item => {
		clicked_item.addEventListener('click', e => {
		    e.preventDefault();
		    
		    this.tab_menu_items.forEach(item => {
			item.classList.remove('active');
		    });
		    clicked_item.classList.add('active');
		    
		    this.tab_menu_contents.forEach(content => {
			content.classList.remove('active');
		    });
		    document.getElementById(clicked_item.dataset.id).classList.add('active');
		});
	    });

	},

	update_carousel_buttons: function () {
	    this.carousel_prev.classList.remove('hidden');
	    this.carousel_next.classList.remove('hidden');
	
	    if (this.carousel_index === 0) {
		this.carousel_prev.classList.add('hidden');
	    }
	    if (this.carousel_index === this.carousel_slides.length - 1) {
		this.carousel_next.classList.add('hidden');
	    }
	},

	slide_carousel: function() {
	    var slide_w = this.carousel_slides[0].getBoundingClientRect().width;
	    var current_index = this.carousel_index;
	    
	    this.carousel_ul.style.transform =
		`translateX(${-1 * slide_w * current_index}px)`;
	},
	
	// カルーセル下部に表示する丸ボタン生成
	setup_carousel_dots: function() {
	    
	    for (let i = 0; i < this.carousel_slides.length; i++) {
		var button = document.createElement('button');
		button.addEventListener('click', () => {
		    this.carousel_index = i;
		    this.update_carousel_dots();
		    this.update_carousel_buttons();
		    this.slide_carousel();
		});
		this.carousel_dots.push(button);
		document.querySelector('.carousel nav').appendChild(button);
	    }
	    
	    this.carousel_dots[0].classList.add('current');
	},
	
	update_carousel_dots: function() {
	    
	    this.carousel_dots.forEach(dot => {
		dot.classList.remove('current');
	    });
	    this.carousel_dots[this.carousel_index].classList.add('current');
	}
	
    };

    var win_base = new WindowBase();
    win_base.init_window();
}
