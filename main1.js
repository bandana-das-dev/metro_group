// Change heading:
jQuery(function($) {
$( document ).ready(function() {
  $('#part1-id').delay(2000).slideUp();
  $('#part2-id').delay(2000).slideUp();
  $('#loaderfont-id').delay(1750).fadeOut();
  $('#loader-id').delay(1750).fadeOut();
});
});

(function($){
  $.fn.HrSlider=function(option){
    var defaults={
      'speed'   :600,
      'pause'   :4000,
      'transition':'buttonslider',
      'imagewidth':$( window ).width(),
      'imageheight':$( window ).height(),
      'radius'    :0,
      'autoslide'   :'on',
      'autoButtonSlide':'on'
      },
    option=$.extend(defaults,option),
    img=$(this).find('img');
    img.css({
      'width':defaults.imagewidth,
      'height':defaults.imageheight
    });
    (defaults.speed>=defaults.pause)?defaults.speed=defaults.pause-100:defaults.speed;
    (defaults.radius>0)?img.css('border-radius',defaults.radius):0;
  // this is for auto slide
    if (defaults.autoslide=='on') {
      this.each(function(){
      var $this=$(this),
      children=$this.children();
      $this.wrap('<div class="slider-wrap" />');
      $this.css({
        'width'   :   '9999999px',
        'position'  :   'relative',
        'padding' :   0
      });
      if (defaults.transition==='slaidLeft') {
        children.css({
          'float':'left',
          'list-style':'none'
        })
        $('.slider-wrap').css({
          'width':children.width(),
          'height':children.height(),
          'overflow':'hidden',
          'margin'  : 'auto'
        });
        slaidLeft();
      }else if(defaults.transition==='slaidRight'){
        $this.children().css({
          'float':'left',
          'list-style':'none'
        })
        $('.slider-wrap').css({
          'width':children.width(),
          'height':children.height(),
          'overflow':'hidden',
          'margin'  : 'auto'
        });
        slaidRight();
      }
      if (defaults.transition==='faid') {
        children.css({
          'width':$this.find('img').width(),
          'position':'absolute',
          'left':0,
        });
        for (var i = children.length - 1,y=0; i >= 0; i--,y++) {
          children.eq(y).css('z-index',i+999999);
        }
        faid();
      }
      function faid(){
          setInterval(function(){
            $this.children(':first').animate({'opacity':0},defaults.speed,function(){
              $this
                .children(':first')
                  .css('opacity','1')
                    .css('z-index',$this.children(':last').css('z-index')-1
                  ).appendTo($this);
            });
          },defaults.pause);
        }
      function slaidLeft(){
        SL=setInterval(function(){
          $this.animate({'left':"-"+$this.parent().width()},defaults.speed,function(){
            $this
              .css('left',0)
                .children(':first')
                  .appendTo($this);
          });
        },defaults.pause);
      }
      function slaidRight(){
        for (var i = 0; i <= $this.children().length; i++) {
          $this.children().eq(i).css('margin-left','-'+(defaults.imagewidth*i+defaults.imagewidth)+"px");
        }
        $this.children(':first').css('margin-left','0');
        var i=1;
        setInterval(function(){ 
          
          if(i<=children.length){
          $this.children(':first').animate({'margin-left':defaults.imagewidth*i},defaults.speed);}
          i++
          if(i===children.length){
            i=0;
            $this.children(':first').css('margin-left','0');
          }
        },defaults.pause);
      }
      });
    }
  // when user can define button then it will create automatically

    if (defaults.transition=='buttonslider') {
      $($(this)).parent().css({
        'position':'relative',
        'margin':'auto' ,
        'width':'100%'
      });
      $('<div class="navigation"><button type="button" data-dir="prev" name="prev">prev</button><button type="button" data-dir="next" name="next" >next</button></div>').appendTo($(this));
      $('.navigation').css({
        'position':'absolute',
        'left'    :"50%",
        'bottom'  :"-0%",
        'margin-left': '-15%'
      });
      function Slider(slidcontainer,navigation){
        this.slidcontainer=slidcontainer;
        this.navigation=navigation;
        this.img=img;
        this.imagewidth=defaults.imagewidth;
        this.imageLenth=this.img.length;
        this.current= 0;
      }
      Slider.prototype.transition=function(coords){
        this.slidcontainer.animate({
          'margin-left':coords || -(this.current*this.imagewidth)
        },defaults.speed);
      }
      Slider.prototype.auto=function(){
        var _this=this;
        setInterval(function(){_this.problem()},defaults.pause);
      }
      Slider.prototype.problem=function(){
        (this.current==this.imageLenth-1)?this.current=0:this.current++;
        this.transition() 
      }
      Slider.prototype.setcoordinet=function(dir){
        this.current+=(~~(dir=='next')||-1);
        this.current=(this.current<0)?this.imageLenth -1:this.current%this.imageLenth;
        // return this.current;
        this.transition();
      }
      var containerStyle=$(this).parent().css({
        'width': defaults.imagewidth,
        'height':defaults.imageheight,
        'overflow':'hidden'
        }).children().css({
          'width': "1000000px",
          'list-style':'none',
          'padding':0,
          'margin':0
          }).children().css({
            'float':'left'}),
      buttonSlider=new Slider($(this),$('.navigation'));
      (defaults.autoButtonSlide=='on')?buttonSlider.auto():false;

      buttonSlider.slidcontainer.find('button').on('click',function(){
        buttonSlider.setcoordinet($(this).data('dir')); 
      }).stop(true,true);
    }// button close
  }
})(jQuery);
$('ul').HrSlider({
 'width': "100%", 
 'height': "auto",
 'background-size' : "cover"
});


