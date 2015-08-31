SCHM = {};
SCHM.data = {};
SCHM.data.me = {};
SCHM.data.me.plays = 0;
SC.initialize({
    client_id: 'b0e3c8efb9e7bd401fdceebedfdd0f72',
    client_secret: '47e657ef42672c330356977c078bedac',
    redirect_uri: 'http://alanmabry.com/schm/callback.html'
});
function groupAdd(group,track){
    SC.put('/groups/'+group+'/contributions/'+track, function(reply, e){
        if(e){
            if(e.message){
                if(e.message == 'Hold your horses! Your track has reached the maximum of 75 group contributions.'){
                    //console.log(e);
                    return false;
                }
            }
        }
        //console.log(reply);
    });
}
function groupDel(group,track){
    SC.delete('/groups/'+group+'/contributions/'+track,function(e){
        if(e){
            //console.log(e)
        }
    });
}
function groupAddMulti(track){
    console.log("adding to groups...");
    var counter = 0;
    var groupMultiTime = setInterval(function(){
        if(counter <= 75){
            groupAdd(SCHM.data.groups[counter].id,track);
            counter++;
        }else if(counter == 75){
            window.clearInterval(groupMultiTime);
        }else{
            $('.groupAdd, .groupDel').removeClass('loading');
            console.log('Track added to 75 groups');
            window.clearInterval(groupMultiTime);
        }
    },100);
}
function groupPreAdd(track){
    var flag = 0;
    $.each(SCHM.data.groups,function(){
        groupDel(this.id,track);
        flag++;
    });
    if(flag == SCHM.data.groups.length){
        console.log("removing from all groups...");
        groupAddMulti(track);
    }
}
function groupDelMulti(track){
    var flag = 0;
    $.each(SCHM.data.groups,function(){
        groupDel(this.id,track);
        flag++;
    });
    if(flag == SCHM.data.groups.length){
        console.log("removed track");
    }
}
function shuffleArray(d){for(var c=d.length-1;c>0;c--){var b=Math.floor(Math.random()*(c+1));var a=d[c];d[c]=d[b];d[b]=a}return d};
function soundCloudHypeMan(){
    $('body').html($('#body-tmpl').html());
    SC.get('/me', function(me){
        SCHM.data.me.basic = '';
        SCHM.data.me.basic = me;
        imgUrl = me.avatar_url;
        $('#ib-followers').html(me.followers_count);
        $('#ib-username').html('<a href="'+me.permalink_url+'" title="Visit '+me.username+' on SoundCloud" target="_blank">'+me.username+'</a>');
        $('#ib-avatar').html('<a href="'+me.permalink_url+'" title="Visit '+me.username+' on SoundCloud" target="_blank"><img class="leftey" src="'+me.avatar_url+'" height="50" width="50"/></a>');
        $('#ib-rightSide').html('<a id="ib-refresh" href="javascript:void(0);" title="Refresh"></a>');
        //tracks
        SC.get('/me/tracks', function(tracks){
            SCHM.data.tracks = tracks;
            SCHM.data.me.plays = 0;
            $('#tracks').empty();
            $.each(tracks,function(index){
                SCHM.data.me.plays += this.playback_count;
                if(this.artwork_url != null){
                    var imgUrl = this.artwork_url;
                }else{
                    var imgUrl = me.avatar_url;
                }
                //$('#tracks').append('<li class="row-'+index+1+'"><div class="imgHold leftey"><img src="'+imgUrl+'" height="100" width="100"/><div class="imgHold-plays">'+this.playback_count+' plays</div></div><div class="trackRowRight leftey"><div class="trackTitle">'+this.title+'</div><a class="groupAdd inactive groupBtn leftey" rel="'+this.id+'" href="javascript:void(0);" title="Add '+this.title+' to Groups"><span class="ico">+</span></a><a class="groupDel inactive groupBtn leftey" rel="'+this.id+'" href="javascript:void(0);" title="Delete '+this.title+' from Groups"><span class="ico">-</span></a></div><div class="clear"></div></li>');
                if(this.sharing == 'public'){
                    $('#tracks').append('<li class="row-'+index+1+'"><div class="imgHold leftey"><img src="'+imgUrl+'" height="100" width="100"/><div class="imgHold-plays">'+this.playback_count+' plays</div></div><div class="trackRowRight leftey"><div class="trackTitle">'+this.title+'</div><a class="groupAdd loading groupBtn leftey" rel="'+this.id+'" href="javascript:void(0);" title="Add '+this.title+' to Groups"><span class="ico">+</span></a></div><div class="clear"></div></li>');
                }
            });
            $('#ib-plays').html(SCHM.data.me.plays+' plays');
            $('.groupAdd').click(function(){
                if($(this).hasClass('inactive') || $(this).hasClass('loading')){
                    //do nothing
                }else{
                    $(this).addClass('inactive loading');
                    groupPreAdd($(this).attr('rel'));
                }
            });
            /*$('.groupDel').click(function(){
                if($(this).hasClass('inactive')){
                    //do nothing
                }else{
                    $(this).addClass('inactive');
                    groupDelMulti($(this).attr('rel'));
                }
            });*/
        });
    });
    SC.get('/me/groups', {limit:400}, function(groups){
        SCHM.data.groups = '';
        SCHM.data.groups = shuffleArray(groups);
        $('.groupAdd, .groupDel').removeClass('inactive loading');
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