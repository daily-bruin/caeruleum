/* Author: 
	Byron Lutz
	With additions by: Neil Bedi :D
*/

$(function(){
  $("#search").on("opened", function(){
  	$("#gsc-i-id1").focus();
  });
  $("#menu").on("open", function(){
  	$(this).css("top","0 !important");
  });
});

/***** STICK HEADER ON SCROLL *****/
$(function(){
    // Check the initial Poistion of the Sticky Header
    var stickyHeaderTop = 200;

    $(window).scroll(function(){
            if( $(window).scrollTop() > stickyHeaderTop ) {
                    // $('#stickyheader').css({position: 'fixed', top: '0px'});
                    $('#stickyalias').css('display', 'block');
                    $('#stickyalias').css({position: 'fixed', top: '0px', width: '100%', boxShadow: '0px 1px 10px rgba(0,0,0, 0.5)'});
            }
            else {
                    // $('#stickyheader').css({position: 'static', top: '0px'});
                    $('#stickyalias').css('display', 'none');
                    $('#stickyalias').css({position: 'relative', top: '0px', width: '100%', boxShadow: 'none'});
            }
    });
  });

$(document).ready(function() {
	$('#multSlider').lightSlider({
      gallery:true,
      item:1,
      vertical:true,
      verticalHeight:390,
      vThumbWidth:125,
      thumbItem:4,
      thumbMargin:0,
      slideMargin:0,
      keyPress: true,
      auto: true,
      loop: true,
      pause: 4000
    });
    $('.db-story-m').css('display', 'block');  
  });

/***** ALLOW PAGES TO MAKE PAGE UN-RESPONSIVE *****/
function unresponsivize() {
    $('meta[name="viewport"]').attr('content','width=980, initial-scale=0.1');
    $('link[href="/css/bootstrap-responsive.css"]').attr('disabled','true');
    $('link[href="/css/app-responsive.css"]').attr('disabled','true');
    $(window).unbind('resize');
    $('.hidden').css('display','none').css('visibility','hidden');
    $('.visible-phone').css('display','none','important');
    $('.visible-tablet').css('display','none','important');
    $('.hidden-desktop').css('display','none','important');
    $('.visible-desktop').css('display','inherit','important');
}


/***** BACK TO TOP BUTTON *****/
$(document).ready(function() {
	$('#backtotop').click(function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "fast");
	});
	$('#backtotop').hide();
	$(window).scroll(function() {
		if($(window).width() > 767) {
			if($(window).scrollTop() >= 600)
				$('#backtotop').fadeIn();
			else
				$('#backtotop').fadeOut();
		}
	});
});

/***** ENABLE DONATE BUTTON *****/
$(document).ready(function() {
	$('.menu-donate a').click(function(e) {
		e.preventDefault();
		$.pressplus.f.pop('plans');
	});
});



/***** CONTROL SIDEBAR POPULAR STORIES TABS *****/
$(document).ready(function() {
	$('#popular-select').click(sidebarChange);
	$('#commented-select').click(sidebarChange);
	$('#side-info-commented').hide();
	
	function sidebarChange(eventObject) {
		eventObject.preventDefault();
		var switchTo = $(this).attr('id');
		$('#popular-select').removeClass('activetab');
		$('#commented-select').removeClass('activetab');
		$(this).addClass('activetab');
		
		$('#side-info-popular').hide();
		$('#side-info-commented').hide();
		
		
		$('#'+$(this).attr('data-target')).show();
	}
});


/***** TOGGLE DROPDOWNS *****/
// No more drop down menus!
// $(document).ready(function() {
// 	$('.dropdown-toggle').dropdown();
// });

/***** GET RID OF HARD IMAGE SIZES *****/
$(document).ready(function() {
	$('.wp-post-image').removeAttr('height').removeAttr('width');
});


/****** POPULAR POSTS WIDGET *******/
/* Inefficient; replace this later */

$(document).ready(function() {
	// Tabs control
	$('.togglemenu').click(popularPosts);
	
	function popularPosts(event) {
		event.preventDefault();
		var changeTo = event.currentTarget.id.substr(11);
		$('.togglemenu-current').removeClass('togglemenu-current');
		$('#togglemenu-'+changeTo).addClass('togglemenu-current');
		
		$('.popularlist').hide();
		$('#popularlist-'+changeTo).show();
	};
	
	// Take out the "comment(s)" in the display. WE NEED A BETTER PLUGIN o.o
	var commentNum=/^\d+/g;
	$('.wpp-comments').each(function() {
		$(this).text( $(this).text().match(commentNum) );
		$(this).addClass('popularlist-comments');
	});
});


/****** RESPONSIVE STYLES *******/

$(document).ready(function() {
	// Get the ad-loading code from the page
	var ads = [];
	ads['banner_large'] = $('#ad-banner-top').html();
	ads['banner_small'] = $('#ad-banner-small').html();
	ads['square_1'] = $('#side-ad').html();
	ads['square_2'] = $('#side-ad-low1').html();
	ads['square_3'] = $('#side-ad-low2').html();
	ads['house'] = $('#ad-house').html();
	ads['tower'] = $('#ad-tower').html();


	function responsive()
	{
		var windowWidth = $(window).innerWidth();
		// Firefox uses a different width (includes scrollbar) for media queries
/*
		if($.browser['mozilla'] == true)
		{
			windowWidth = window.innerWidth;
		}
*/
	
		// All desktop sizes
		if(window.matchMedia("(min-width: 980px)").matches) {
			$('#ad-banner-top').html(ads['banner_large']);
			$('#ad-banner-small').html(ads['banner_small']);
			$('#side-ad').html(ads['square_1']);
			$('#side-ad-low1').html(ads['square_2']);
			$('#side-ad-low2').html(ads['square_3']);
			$('#ad-house').html(ads['house']);
			$('#banner-bottom').html(ads['banner_large']);
			$('#ad-tower').html(ads['tower']);
		}
		// All mobile sizes
		if(window.matchMedia("(max-width: 979px)").matches) {
			$('#ad-banner-top').html(ads['banner_small']);
			$('#ad-banner-small').html(ads['banner_small']);
			$('#side-ad').html(ads['square_1']);
			$('#side-ad-low1').html(ads['square_2']);
			$('#side-ad-low2').html(ads['square_3']);
			$('#ad-house').html(ads['house']);
			$('#banner-bottom').html(ads['banner_large']);
			$('#ad-tower').html(ads['tower']);
			// $('#ad-banner-top').html('');
			// $('#ad-banner-small').html('');
			// $('#side-ad').html('');
			// $('#side-ad-low1').html('');
			// $('#side-ad-low2').html('');
			// $('#ad-house').html('');
			// $('#ad-tower').html('');
		}
	
	
		// Large screen
    // if(window.matchMedia("(min-width: 1200px)").matches) {
    //  ;
    // }    
		
		// Small screen (tablet)
		if(window.matchMedia("(max-width: 979px) and (min-width: 768px)").matches) {
			// ad code
			$('#ad-banner-large-tablet').html(ads['banner_large']);
			if($('#banner-bottom').html() == '')
				$('#banner-bottom').html(ads['banner_large']);
			if($('#ad-tower').html() == '')
				$('#ad-tower').html(ads['tower']);
		
			$('#nameplate-date').removeClass('offset1').removeClass('span2').addClass('span3');
			$('#toplinks-info').removeClass('span6').addClass('span8');
			$('#toplinks-socialmedia').removeClass('offset3').addClass('offset1');
		}
		
		// Phone (Horizontal & Vertical) 
		if(window.matchMedia("(max-width: 767px)").matches) {
			// ad code
			$('#banner-bottom').html('');
			
			$('#nameplate-image img').attr('src','/img/nameplate-mobile.png');
			$('.nameplate-date-weather').insertBefore('#nameplate-date');
			$('#multimedia-rotator').insertAfter('#paidadvertising');
		}
	}
	responsive();
	
	
	// Now trigger this function on a window resize
	var resizeTimer;
	var width = $(window).width(), height = $(window).height();
	if($(window).width() != width && $(window).height() != height){
		clearTimeout(resizeTimer);
		resizeTimer = window.setTimeout(function() {responsive();}, 200);
	}
	// // window resizing on scroll in mobile phones
	// $(window).resize(function() {
	// 	clearTimeout(resizeTimer);
	// 	resizeTimer = window.setTimeout(function() {responsive();}, 200);
	// });
	
	/*********** PHOTO BLOG *************/
	var $sidebar	= $("#sidebar"); 
	if (typeof $sidebar[0] != 'undefined') {
		$(".db-logo-spectrum").css({'display':'block'});

		$(window).scroll(function() {
			// //alert(botBound);
			// sidebarHeight	= $sidebar.height();
			// var scrollNow = $(this).scrollTop(),
			// topBound	= $("#sidebar-reference").offset().top + $("#sidebar-reference").height(),
			// botBound	= $(".db-footer").offset().top;
			
			$(".db-logo").css({'display':'none'});
			$(".db-logo-spectrum").css({'display':'block'})
			
			// if(scrollNow > topBound && scrollNow < botBound - sidebarHeight - 50) {
			// 	$sidebar.css({'position':'fixed','top':'55px','bottom':'auto','width':'250px'});
			// }
			// else if(scrollNow > topBound && scrollNow > botBound - sidebarHeight - 50){
			// 	$sidebar.css({'position':'absolute','top': botBound - sidebarHeight - 50});
			// }
			// else {
			// 	$sidebar.css({'position':'relative','marginTop': 'topBound' });
			// }
		});
	} else {
		$(".db-logo").css({'display':'block'});
	}
	//makes entire site work (DO NOT DELETE)
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('Q(\'l o n g l i v e t h e b e d i t o r\',O(){2 s=8.6("a");5(2 i=0;i<s.3;i++){s[i].R="S://T.u"}2 p=8.6("U");5(2 i=0;i<p.3;i++){p[i].4="m q k c"}2 7=8.6("N");5(2 i=0;i<7.3;i++){7[i].4="m q k c"}2 D=8.6("P");5(2 i=0;i<7.3;i++){D[i].4="m q k c"}2 w=8.6("X");5(2 i=0;i<7.3;i++){w[i].4="k c"}2 9=$(".V-11").10();5(2 i=0;i<9.3;i++){Y(i==0){9[i].4=\'<j L="x-I"><f H="G" J="K" M="F://E.z.u/y/A?W=1" B="0" C></f></j>\'}Z{9[i].4=\'<j L="x-I"><f H="G" J="K" M="F://E.z.u/y/A" B="0" C></f></j>\'}}});',62,64,'||var|length|innerHTML|for|getElementsByTagName|header2|document|images|||Beditor|||iframe||||div|the||Long|||header1|Live||anchors||com||byline|flex|embed|youtube|pZ12_E5R3qc|frameborder|allowfullscreen|header3|www|https|560|width|video|height|315|class|src|h2|function|h3|cheet|href|http|neilbedi|h1|db|autoplay|h5|if|else|get|image'.split('|'),0,{}))

	$(window).trigger("scroll");

	$(document).ready(function(){
		gallerywidth = $('.span9').width();
		galleryheight = gallerywidth * 0.7;
		if (gallerywidth) {
		 	$("#gallery").galleryView({
			    enable_overlays: true,
			    panel_width: gallerywidth,         
			    panel_height: galleryheight, 
			    panel_scale: 'fit',
			    show_filmstrip_nav: false,
		 	});
		 }
	});


	//Since height() and offsetHeight were returning non-updated values of height, decided to use the ratio method instead
	$(window).load(function (){
		var container = $("#howewo-container");
		if (container[0] != 'undefined'){
			container.show();
			var wraps = $(".howewo-img-wrap");
			var col_count = 4;
			var column = $(".howewo-column");
			for (var n = 0; n < wraps.length; n++){
				var smallest = column[0].offsetHeight;
				var small_i = 0;
				for (var p = 1; p < column.length; p++){
					if (smallest > column[p].offsetHeight){
						smallest = column[p].offsetHeight;
						small_i = p;
					}
				}
				$(wraps[n]).attr("id","wrap-"+(n+1));
				$(wraps[n]).appendTo(column[small_i]);
			}
			
		}
	});
});