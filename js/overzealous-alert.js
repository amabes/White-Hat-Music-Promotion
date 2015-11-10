if(typeof(OA)=='undefined') OA = {}
OA.alert={
    data:{
        iam_alert_timeout:''
    },
	close:function(callback){                               // close alert bar, callback executes after closing animation is complete
        $('.iam-alert').css({opacity:0});                  // set to transparent (css handles animation)
        setTimeout(function(){
            $('.iam-alert').remove();                      // rm after 1 sec
        },500);
        if($.isFunction(callback)) callback();
    },
    init:function(params){                                  // color, message, duration
        if($('.iam-alert').length!=0){
            OA.alert.data.iam_alert_timeout = window.clearTimeout(OA.alert.data.iam_alert_timeout); // CLEAR INTERVAL.
            $('.iam-alert').remove();                       // RM if in DOM
        }
        $('body').append('<div class="iam-alert clearfix alert-'+params.color+'"><div class="alert-content clearfix"><div class="txt pull-left">'+params.message+'</div><a class="alert-close icon-cancel-circled2 pull-right" href="javascript:void(0);"></a></div></div>');
        setTimeout(function(){
            $('.iam-alert').css({bottom:'4%'});            // set bottom (css handles animation)
        },250);
        if(typeof(params.duration)!="undefined" && params.duration>0){
            OA.alert.data.iam_alert_timeout = setTimeout(function(){
                OA.alert.close();                   // alert closes after duration
            },params.duration+250);
        }
        $(".alert-close").click(function(){                 // close button click handler
            OA.alert.close();
            return false;
        });
    },
    run:function(color,message,duration){                   // move requests through run to init
        OA.alert.init({
            color:color,
            message:message,
            duration:duration||0
        });
    },
    feedback:function(params){
        var duration = 5000;
        var elem = 'body';
        if(typeof(params.duration)=='undefined') params.duration = duration;
        
        var markup = 
        '<div class="feedback">'+
          '<img src="'+params.image+'"/>'+
          '<div>'+params.message+'</div>'+
          '<a class="feedback-close icon-cancel-circled" href="javascript:void(0);"></a>'
        '</div>'
        if($(elem).find('.feedback').length!=0){
            $(elem).find('.feedback').remove();
            $(elem).removeClass('feedback-elem');
        }
        $(elem).addClass('feedback-elem');
        $(elem).append(markup);
        setTimeout(function(){
          $(elem).find('.feedback').css({top:20,opacity:1});
        },500);
        $(elem).find('.feedback-close').click(function(){
          $(this).parents('.feedback').fadeOut(250,function(){
            $(this).remove();
            $(elem).removeClass('feedback-elem');
          });
        });
        if(params.duration!=false){
            setTimeout(function(){
              $(elem).find('.feedback').fadeOut(250,function(){
                $(this).remove();
                $(elem).removeClass('feedback-elem');
              });
            },params.duration);
        }
    }
}