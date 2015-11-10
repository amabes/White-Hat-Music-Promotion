SC.initialize({
    client_id: 'b0e3c8efb9e7bd401fdceebedfdd0f72',
    client_secret: '47e657ef42672c330356977c078bedac',
    redirect_uri: 'http://alanmabry.com/schm/callback.html'
});
if(typeof(SCHM)=='undefined'){
    SCHM = {
        data:{
            me:{
                plays:0
            }
        }
    }    
}
function trackControl(params,callback){
    SC.stream('/tracks/'+params.track,function(player){
      player[params.type]();
      if($.isFunction(callback)) callback(player);
    });
}
function groupAdd(group,track){
    SC.put('/groups/'+group+'/contributions/'+track, function(data){
        if(data.errors!=undefined && data.errors.length!=0){
            console.log(data.errors);
            return false;
        }
    });
}
function groupDel(group,track){
    SC.delete('/groups/'+group+'/contributions/'+track,function(e){
        // do something
    });
}
function checkGroups(id,callback){
    SC.get('/tracks/'+id+'/groups',function(data){
        if($.isFunction(callback)) callback(data);
    });
}
function groupAddMulti(track){

    var i = 0;
    
    var groupMultiTime = setInterval(function(){
        
        if(i < 74){ // maximum groups a track can be in is 75.
            
            groupAdd(SCHM.data.groups[i].id,track);
            
            i++;
            
            //console.log('Added to '+i+' group(s)');
        }else{
            
            $('.groupAdd').removeClass('loading');

            OA.alert.run('green', 'Track added to 75 groups', 2500);

            groupMultiTime = window.clearInterval(groupMultiTime);

        }

    },500);

}
function groupDelAll(track,callback){
    checkGroups(track,function(groups){
        if(groups.length==0){
            if($.isFunction(callback)) callback(track);
        }else{
            for(var i=0;i<groups.length;i++){
                groupDel(groups[i].id,track);
                if(i == groups.length-1){
                    setTimeout(function(){
                        console.log("removed from all groups");
                        if($.isFunction(callback)) callback(track);
                    },3000);
                }
            }
        }
    });
}
function shuffleArray(d){
    if(d!=null){
        for(var c=d.length-1;c>0;c--){
            var b=Math.floor(Math.random()*(c+1));
            var a=d[c];
            d[c]=d[b];
            d[b]=a
        }
        return d;
    }
}
function soundCloudHypeMan(){
    var debug = false;
    $('body').html($('#body-tmpl').html()).removeClass('front');
    SC.get('/me', function(me){
        SCHM.data.me.basic = '';
        SCHM.data.me.basic = me;
        var imgUrl = me.avatar_url;
        $('#ib-followers').html(me.followers_count);
        $('#ib-username').html('<a href="'+me.permalink_url+'" title="Visit '+me.username+' on SoundCloud" target="_blank">'+me.username+'</a>');
        $('#ib-avatar').html('<a href="'+me.permalink_url+'" title="Visit '+me.username+' on SoundCloud" target="_blank"><img class="leftey" src="'+imgUrl+'" height="50" width="50"/></a>');
        $('#ib-rightSide').html('<a id="ib-refresh" href="javascript:void(0);" title="Refresh"></a>');
        SC.get('/me/tracks', function(tracks){
            SCHM.data.tracks = tracks;
            SCHM.data.me.plays = 0;
            $('#tracks').empty();
            $.each(tracks,function(index){
                SCHM.data.me.plays += this.playback_count;
                if(this.artwork_url != null){
                    imgUrl = this.artwork_url;
                }
                if(this.sharing == 'public'){
                    var markup_track =
                        '<li class="row-'+index+1+'">'+
                            '<div class="imgHold leftey">'+
                                '<img src="'+imgUrl+'" height="100" width="100"/>'+
                                '<div class="imgHold-plays">'+this.playback_count+' plays</div>'+
                            '</div>'+
                            '<div class="trackRowRight leftey">'+
                            '<div class="trackTitle">'+this.title+'</div>'+
                                '<a class="groupAdd loading groupBtn leftey" rel="'+this.id+'" href="javascript:void(0);" title="Add '+this.title+' to Groups">'+
                                    '<span class="ico">+</span>'+
                                '</a>'+
                                // '<a class="trackControl loading groupBtn leftey" type="play" rel="'+this.id+'" href="javascript:void(0);">'+
                                //     '<span class="ico">></span>'+
                                // '</a>'+
                            '</div>'+
                            '<div class="clear"></div>'+
                        '</li>'
                    $('#tracks').append(markup_track);
                }
            });
            $('#ib-plays').html(SCHM.data.me.plays+' plays');
            $('.trackControl').click(function(){
                var that = $(this);
                if(that.hasClass('inactive') || that.hasClass('loading')){
                    // TODO: refactor
                }else{
                    var id = that.attr('rel'),
                        type = that.attr('type');
                    if(type=='play'){
                        that.attr('type','pause');
                        that.find('.ico').html('||');
                    }else{
                        that.attr('type','play');
                        that.find('.ico').html('>');
                    }
                    trackControl({
                        track:id,
                        type:type
                    },function(player){
                        console.log(player);
                    });
                }
            });
            $('.groupAdd').click(function(){
                if($(this).hasClass('inactive') || $(this).hasClass('loading')){
                    // TODO: refactor
                }else{
                    var id = $(this).attr('rel');
                    $(this).addClass('inactive loading');
                    groupDelAll(id,function(track){
                        if(debug){
                            var markup = '<div id="done-removing-from-groups"><a id="check-groups" rel="'+id+'" href="javascript:void(0);">Check Groups</a></div>';
                            $('body').prepend(markup);
                            $('#check-groups').click(function(){
                                var id = $(this).attr('rel');
                                checkGroups(id);
                                $('#done-removing-from-groups').remove();
                            });
                        }else{
                            groupAddMulti(track);
                        }
                    });
                }
            });
        });
    });
    SC.get('/me/groups', {limit:400}, function(groups){
        console.log(groups);
        if(groups == null){
            alert('refresh');
        }
        SCHM.data.groups = shuffleArray(groups);
        $('.groupAdd, .trackControl').removeClass('inactive loading');
    });
}
$(document).ready(function(){
    $('#soundCloudConnect').click(function(){
        SC.connect(function() {
            soundCloudHypeMan();
            $('body').on('click','#ib-refresh',function(){
                soundCloudHypeMan();
            });
        });
    });
});