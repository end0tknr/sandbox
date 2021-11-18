'use strict';

{
    var WindowBase = function() {};

    WindowBase.prototype = {
        
        init_window: function(){
            this.init_sp_menu();
            
            var tab_menus = document.querySelectorAll('.tab_menu');
            tab_menus.forEach(tab_menu=>{
                this.init_tab_menu( tab_menu );
            });
            
            var carousels = document.querySelectorAll('.carousel');
            carousels.forEach(carousel=>{
                this.init_carousel( carousel );
                this.update_carousel_buttons( carousel );
            });
            
            // カルーセルのサイズをwinサイズに追従
            window.addEventListener('resize', () => {
                carousels.forEach(carousel=>{
                    this.slide_carousel( carousel );
                });
            });

            
        },

        init_sp_menu: function(){
            var pc_menu_ul = document.querySelector('#pc_menu nav ul');
            var sp_menu_ul = pc_menu_ul.cloneNode(true);

            var sp_menu_nav = document.querySelector('#sp_menu_overlay nav');
            sp_menu_nav.after(sp_menu_ul);

            this.sp_menu_open   = document.getElementById('sp_menu_open');
            this.sp_menu_close  = document.getElementById('sp_menu_close');
            this.sp_menu_overlay= document.getElementById('sp_menu_overlay');

            this.sp_menu_open.addEventListener('click', () => {
                this.sp_menu_overlay.classList.add('show');
                this.sp_menu_open.classList.add('hide');
            });
            this.sp_menu_close.addEventListener('click', () => {
                this.sp_menu_overlay.classList.remove('show');
                this.sp_menu_open.classList.remove('hide');
            });
            
        },

        init_carousel: function(carousel){
            carousel.current_index = 0;
            carousel.prev_button = carousel.querySelector('.carousel_prev');
            carousel.next_button = carousel.querySelector('.carousel_next');
            carousel.ul     = carousel.querySelector('ul');
            carousel.slides = carousel.querySelectorAll('ul li');
            carousel.dots   = [];
            
            // ボタンによる左右スライド
            carousel.prev_button.addEventListener('click', () => {
                carousel.current_index -= 1;
                this.update_carousel_buttons(carousel);
                this.update_carousel_dots(carousel);
                this.slide_carousel(carousel);
            });
            carousel.next_button.addEventListener('click', () => {
                carousel.current_index += 1;
                this.update_carousel_buttons(carousel);
                this.update_carousel_dots(carousel);
                this.slide_carousel(carousel);
            });

            // カルーセル下部に表示する丸ボタン生成
            for (let i = 0; i < carousel.slides.length; i++) {
                var button = document.createElement('button');
                button.addEventListener('click', () => {
                    carousel.current_index = i;
                    this.update_carousel_dots(carousel);
                    this.update_carousel_buttons(carousel);
                    this.slide_carousel(carousel);
                });
                carousel.dots.push(button);
                carousel.querySelector('nav').appendChild(button);
            }
            
            carousel.dots[0].classList.add('current');
        },
        
        init_tab_menu: function(tab_menu){
            var this_obj = this;

            var tab_menu_items    = tab_menu.querySelectorAll('ul li a');
            var tab_menu_contents = tab_menu.querySelectorAll('section');

            for (let i = 0; i < tab_menu_items.length; i++) {
                tab_menu_items[i].addEventListener('click', event => {
                    event.preventDefault();
                    
                    tab_menu_items.forEach(item => {
                        item.classList.remove('active');
                    });
                    tab_menu_items[i].classList.add('active');
                    
                    tab_menu_contents.forEach(content => {
                        content.classList.remove('active');
                    });
                    tab_menu_contents[i].classList.add('active');
                });
            }
        },

        update_carousel_buttons: function (carousel) {
            carousel.prev_button.classList.remove('hidden');
            carousel.next_button.classList.remove('hidden');
        
            if (carousel.current_index == 0) {
                carousel.prev_button.classList.add('hidden');
                
            }
            if (carousel.current_index === carousel.slides.length - 1) {
                carousel.next_button.classList.add('hidden');
            }
        },

        slide_carousel: function(carousel) {
            var slide_w = carousel.slides[0].getBoundingClientRect().width;
            var current_index = carousel.current_index;
            
            carousel.ul.style.transform =
                `translateX(${-1 * slide_w * current_index}px)`;
        },
        
        update_carousel_dots: function(carousel) {
            carousel.dots.forEach(dot => {
                dot.classList.remove('current');
            });
            carousel.dots[carousel.current_index].classList.add('current');
        }
        
    };

    var win_base = new WindowBase();
    win_base.init_window();
}
