
$(document).ready(function(){/* off-canvas sidebar toggle */

$('[data-toggle=offcanvas]').click(function() {
  	$(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});
    
$('#help').click(function(){  
    if($('.helpbar').hasClass('hidden')){
        showhelp();
    }else{
        hidehelp();
    }                 
}); 
    
$('#chat').click(function(){  
    if($('.chat').hasClass('hidden')){
        showchat();
    }else{
        hidechat();
    }                 
}); 
    
$('.input-group-btn').click(function(){  
    var searcgterm = $('#srch-term').val();
    if(searcgterm !=""&&searcgterm!=undefined){
        searchevents(searcgterm);
    }
                  
});  

$('#btn-chat').click(function(){
    var senditem = $('#chat-btn-input').val();
    if(senditem !="" && senditem!=undefined)
    {
        creatchat(senditem);  
        $('#chat-btn-input').val("");
    }           
});
        
});

$(document).ready(function() {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var calendar = $('#calendar').fullCalendar({
          height:425,
          aspectRatio: 1,
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'today,month,agendaWeek,agendaDay'
          },
          selectable: true,
          selectHelper: true,
          durationEditable:true,
          select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
              calendar.fullCalendar('renderEvent',
                {
                  title: title,
                  start: start,
                  end: end,
                  allDay: allDay
                },
                true // make the event "stick"
              );
            }
            calendar.fullCalendar('unselect');
          },
          editable: true,
          events:jsonfeed
        });
      });

var speechs = ["you forgot the magic word", "help activated welcome Janine", "my pleasure","Navigating calendar","Expelliarmus","you have zero unread messages"];
var jarvis_speaking =false;
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
 var commands = {
    'I need help': function() { 
        responsiveVoice.speak(speechs[0],"US English Female",{onstart: StartCallback});
    },
     'Please': function() { 
        responsiveVoice.speak(speechs[1],"US English Female", {onstart: StartCallback});
        showhelp();
    },
     'help': function() { 
        responsiveVoice.speak(speechs[1],"US English Female", {onstart: StartCallback});
        showhelp();
    },
     'open chat': function() { 
        responsiveVoice.speak(speechs[5],"US English Female", {onstart: StartCallback});
        showchat();
    },
     'thank you': function() { 
        responsiveVoice.speak(speechs[2],"US English Female",{onstart: StartCallback});
        hidehelp();
        hidechat();
    },
     'mischief managed': function() { 
        responsiveVoice.speak(speechs[4],"US English Female",{onstart: StartCallback});
        hidehelp();
    },
     'next': function() { 
        $('.fc-button-next').trigger("click");
        smileymessage_one(speechs[3]);
    },
     'previous': function() { 
        $('.fc-button-prev').trigger("click");
        smileymessage_one(speechs[3]);
    },
     'go to :month': {'regexp': /^go to (January|Febraury|March|April|May|June|July|August|September|October|November|December)/, 
                            'callback': gotomonth},
     'go to :year': {'regexp': /^go to (2015|2016|2010|2011|2012|2013|2014|2017)/, 
                            'callback': gotoyear},
     'send': function(){
         $('#btn-chat').trigger("click");
     },
     'input *term': function(term){
         var value = $('#chat-btn-input').val();
         $('#chat-btn-input').val(value+" "+term);
     }

  };
    annyang.addCallback('resultNoMatch', function (userSaid, commandText, phrases) {
        try{
            console.log(userSaid[0]); // sample output: 'hello (there)'
            if(!jarvis_speaking){
                smileymessage("You Said : "+userSaid[0], "Sorry i dont have any command. <br> For list of commands say 'commands'");
            }
            jarvis_speaking = false;
        }catch(e){
            console.log(e.message);
        }
    });
  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

function showhelp(){
    hidechat();
    $('.calendar').removeClass('col-sm-12');
    $('.calendar').addClass('col-sm-9');
    $('.helpbar').hide();
    $('.helpbar').removeClass('hidden');
    $('.helpbar').fadeIn( "slow" );
    $('#calendar').fullCalendar('render');
    smileymessage_one("Hello I am Jarvis, Your Assitant for today. Please say what you need in two words");
}
function hidehelp(){
    $('.calendar').removeClass('col-sm-9');
    $('.calendar').addClass('col-sm-12');
    $('.helpbar').addClass('hidden');
    $('#calendar').fullCalendar('render');
}
function showchat(){
    hidehelp();
    $('.calendar').removeClass('col-sm-12');
    $('.calendar').addClass('col-sm-9');
    $('.chat').hide();
    $('.chat').removeClass('hidden');
    $('.chat').fadeIn( "slow" );
    $('#calendar').fullCalendar('render');
    smileymessage_one("Hello I am Jarvis, Your Assitant for today. Please say what you need in two words");
}
function hidechat(){
    $('.calendar').removeClass('col-sm-9');
    $('.calendar').addClass('col-sm-12');
    $('.chat').addClass('hidden');
    $('#calendar').fullCalendar('render');
}
 /***************** Message Methods*************************/
        function smileymessage(content,content2){
            $("#Smiley_Message").hide(500);
            var options = {
              strings: [content, content2],
              typeSpeed: 0
            }
            $("#typed").html('<label id="Smiley_Message"></label>');
            $("#Smiley_Message").typed(options);            
        }
    
        function smileymessage_one(content){
            $("#Smiley_Message").hide(500);
            var options = {
              strings: [content],
              typeSpeed: 0
            }
            $("#typed").html('<label id="Smiley_Message"></label>');
            $("#Smiley_Message").typed(options);            
        }
        function StartCallback(){
            jarvis_speaking=true;
        }
        
        function gotomonth(month){
            smileymessage_one(speechs[3]);
            var moment=$('#calendar').fullCalendar('getDate');
            var date = new Date(moment);
            var monthnumber = getMonthFromString(month);
            date.setMonth(monthnumber);
            $('#calendar').fullCalendar( 'gotoDate', date );
            $(".fc-day"+date.getDate()).addClass('fc-state-highlight');
        }
        function getMonthFromString(mon){
           return new Date(Date.parse(mon +" 1, 2012")).getMonth();
        }
        function gotoyear(year){
            smileymessage_one(speechs[3]);
            var moment=$('#calendar').fullCalendar('getDate');
            var date = new Date(moment);
            date.setFullYear(year)
            $('#calendar').fullCalendar( 'gotoDate', date );
            $(".fc-day"+date.getDate()).addClass('fc-state-highlight');
        }

        function searchevents(title){
            
            var selector = ':has(.title:val("'+title+'"))'; // xPath CSS like selector
            alert(selector);
            try {
                var resultObj = JSONSelect.match(selector, jsonfeed);
                console.log(resultObj);
                console.log('- - - - -');
            } catch(e) { console.log(e); }
        }

        function creatchat(textmessage){
            $(".dummy").find(".messagbox").html(textmessage);
            var html = $(".dummy").html();
            var message ="<li class='left clearfix'>"+html+"</li>";
            $(".chatmessages").append(message);
        }


var jsonfeed = [{"title":"Demon Miners","Type of entry":"Type of Entity","Classification":"","allDay":null,"id":271,"end":"9/10/15 12:37","start":"9/10/15 10:13"},
{"title":"Bat Wing Demons","Type of entry":"Type of Entity","Classification":"","allDay":null,"id":272,"end":"9/12/15 11:34","start":"9/12/15 9:10"},
{"title":"Demon Warriors","Type of entry":"Type of Entity","Classification":"","allDay":null,"id":273,"end":"9/15/15 8:30","start":"9/15/15 6:06"},
{"title":"Greaser Haunt","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":274,"end":"9/17/15 14:30","start":"9/17/15 12:06"},
{"title":"Doctor McCatheter","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":275,"end":"9/19/15 21:17","start":"9/19/15 18:53"},
{"title":"McCatheter's Guests","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":276,"end":"9/20/15 13:03","start":"9/20/15 10:39"},
{"title":"Allergy Ghosts","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":277,"end":"9/21/15 5:27","start":"9/21/15 3:03"},
{"title":"Clock Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":278,"end":"9/21/15 23:06","start":"9/21/15 20:42"},
{"title":"James Moriarty","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":279,"end":"9/22/15 2:34","start":"9/22/15 0:10"},
{"title":"Hound of the Baskervilles","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":280,"end":"9/23/15 17:13","start":"9/23/15 14:49"},
{"title":"Sherlock Holmes","Type of entry":"Singular Entity","Classification":"Class 4","allDay":null,"id":281,"end":"9/26/15 11:49","start":"9/26/15 9:25"},
{"title":"John H. Watson","Type of entry":"Singular Entity","Classification":"Class 4","allDay":null,"id":282,"end":"9/27/15 0:39","start":"9/26/15 22:15"},
{"title":"Kestrel","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":283,"end":"9/27/15 12:05","start":"9/27/15 9:41"},
{"title":"Shifter","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":284,"end":"9/27/15 21:05","start":"9/27/15 18:41"},
{"title":"Poso","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":285,"end":"9/29/15 7:15","start":"9/29/15 4:51"},
{"title":"Poso's Followers","Type of entry":"Group of Entities","Classification":"Class 3","allDay":null,"id":286,"end":"9/29/15 17:37","start":"9/29/15 15:13"},
{"title":"Inverted Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":287,"end":"9/30/15 15:03","start":"9/30/15 12:39"},
{"title":"Four-Eyed Worm","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":288,"end":"10/1/15 3:48","start":"10/1/15 1:24"},
{"title":"Multi Appendage Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":289,"end":"10/3/15 16:58","start":"10/3/15 14:34"},
{"title":"Eel Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":290,"end":"10/4/15 1:05","start":"10/3/15 22:41"},
{"title":"Paper Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":291,"end":"10/4/15 7:39","start":"10/4/15 5:15"},
{"title":"Purple Gooper Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":292,"end":"10/7/15 13:10","start":"10/7/15 10:46"},
{"title":"East Side Phantasm","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":293,"end":"10/8/15 16:44","start":"10/8/15 14:20"},
{"title":"Pirate Ghosts","Type of entry":"Group of Entities","Classification":"Class 3","allDay":null,"id":294,"end":"10/9/15 9:32","start":"10/9/15 7:08"},
{"title":"Water Elemental","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":295,"end":"10/9/15 13:32","start":"10/9/15 11:08"},
{"title":"Judge Ghost","Type of entry":"Singular Entity","Classification":"Class 3","allDay":null,"id":296,"end":"10/10/15 3:52","start":"10/10/15 1:28"},
{"title":"Prosecutor ghost","Type of entry":"Singular Entity","Classification":"Class 3","allDay":null,"id":297,"end":"10/10/15 13:02","start":"10/10/15 10:38"},
{"title":"Ghostworld Kidnappers","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":298,"end":"10/11/15 19:51","start":"10/11/15 17:27"},
{"title":"Ghostworld Jury","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":299,"end":"10/11/15 20:49","start":"10/11/15 18:25"},
{"title":"Ghostworld Staff","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":300,"end":"10/11/15 23:00","start":"10/11/15 20:36"},
{"title":"Ghostworld Prisoners","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":301,"end":"10/12/15 12:43","start":"10/12/15 10:19"},
{"title":"Bowtie Full Torso","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":302,"end":"10/12/15 15:13","start":"10/12/15 12:49"},
{"title":"Governor ghost","Type of entry":"Singular Entity","Classification":"Class 3","allDay":null,"id":303,"end":"10/12/15 20:00","start":"10/12/15 17:36"},
{"title":"Al Capone","Type of entry":"Singular Entity","Classification":"Class 4","allDay":null,"id":304,"end":"10/13/15 3:34","start":"10/13/15 1:10"},
{"title":"Manny","Type of entry":"Singular Entity","Classification":"Class 4","allDay":null,"id":305,"end":"10/13/15 13:40","start":"10/13/15 11:16"},
{"title":"Al Capone's Gang","Type of entry":"Group of Entities","Classification":"Class 4","allDay":null,"id":306,"end":"10/15/15 13:07","start":"10/15/15 10:43"},
{"title":"North Side Gang","Type of entry":"Group of Entities","Classification":"Class 4","allDay":null,"id":307,"end":"10/16/15 2:31","start":"10/16/15 0:07"},
{"title":"Evil Slimer twin","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":308,"end":"10/16/15 7:42","start":"10/16/15 5:18"},
{"title":"Flaude's Family","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":309,"end":"10/16/15 21:58","start":"10/16/15 19:34"},
{"title":"Cycloptic Elephant Ghost","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":310,"end":"10/16/15 23:36","start":"10/16/15 21:12"},
{"title":"Netherworld Clerk","Type of entry":"Singular Entity","Classification":"Class 3","allDay":null,"id":311,"end":"10/20/15 6:50","start":"10/20/15 4:26"},
{"title":"Netherworld Bus","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":312,"end":"10/20/15 12:24","start":"10/20/15 10:00"},
{"title":"Spectral Family","Type of entry":"Group of Entities","Classification":"Class 4","allDay":null,"id":313,"end":"10/21/15 16:43","start":"10/21/15 14:19"},
{"title":"Last Dragon","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":314,"end":"10/22/15 2:11","start":"10/21/15 23:47"},
{"title":"Ogre Knights","Type of entry":"Group of Entities","Classification":"Class 6","allDay":null,"id":315,"end":"10/22/15 10:08","start":"10/22/15 7:44"},
{"title":"Pegasus","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":316,"end":"10/25/15 0:34","start":"10/24/15 22:10"},
{"title":"Horned Lion","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":317,"end":"10/26/15 20:28","start":"10/26/15 18:04"},
{"title":"Orlox","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":318,"end":"10/28/15 15:46","start":"10/28/15 13:22"},
{"title":"Twinkie","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":319,"end":"10/30/15 7:54","start":"10/30/15 5:30"},
{"title":"Twinkie's Witch","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":320,"end":"10/30/15 21:44","start":"10/30/15 19:20"},
{"title":"Witches (Type of Creatures)","Type of entry":"Type of Entity","Classification":"Class 7","allDay":null,"id":321,"end":"10/31/15 1:41","start":"10/30/15 23:17"},
{"title":"Wishes Made Manifest","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":322,"end":"11/1/15 10:19","start":"11/1/15 7:55"},
{"title":"Jonathan Tightly","Type of entry":"Singular Entity","Classification":"Class 4","allDay":null,"id":323,"end":"11/1/15 23:30","start":"11/1/15 21:06"},
{"title":"Dixie","Type of entry":"Singular Entity","Classification":"Class 4","allDay":null,"id":324,"end":"11/4/15 18:13","start":"11/4/15 15:49"},
{"title":"Dixie's Brothers","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":325,"end":"11/9/15 23:33","start":"11/9/15 21:09"},
{"title":"Dixie's Guests","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":326,"end":"11/10/15 10:27","start":"11/10/15 8:03"},
{"title":"Ghost Invaders","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":327,"end":"11/10/15 18:54","start":"11/10/15 16:30"},
{"title":"Demon Invader","Type of entry":"Singular Entity","Classification":"","allDay":null,"id":328,"end":"11/10/15 19:04","start":"11/10/15 16:40"},
{"title":"Spiderlegs' Henchmen","Type of entry":"Group of Entities","Classification":"","allDay":null,"id":329,"end":"11/11/15 4:02","start":"11/11/15 1:38"},
{"title":"Nine Eared Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":330,"end":"11/11/15 12:44","start":"11/11/15 10:20"},
{"title":"Spiderlegs","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":331,"end":"11/11/15 20:15","start":"11/11/15 17:51"},
{"title":"Grocery Specter","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":332,"end":"11/12/15 2:54","start":"11/12/15 0:30"},
{"title":"Containment Unit Escapees","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":333,"end":"11/13/15 9:59","start":"11/13/15 7:35"},
{"title":"Sparky","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":334,"end":"11/13/15 23:32","start":"11/13/15 21:08"},
{"title":"Giant Rat","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":335,"end":"11/15/15 17:57","start":"11/15/15 15:33"},
{"title":"Ironworks Spook","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":336,"end":"11/17/15 15:13","start":"11/17/15 12:49"},
{"title":"Player's Conductor","Type of entry":"Singular Entity","Classification":"Class 3","allDay":null,"id":337,"end":"11/18/15 8:46","start":"11/18/15 6:22"},
{"title":"The Player","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":338,"end":"11/18/15 15:27","start":"11/18/15 13:03"},
{"title":"Gorky Gargoyle","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":339,"end":"11/19/15 4:04","start":"11/19/15 1:40"},
{"title":"Tag Monster","Type of entry":"Singular Entity","Classification":"Class 6","allDay":null,"id":340,"end":"11/20/15 18:29","start":"11/20/15 16:05"},
{"title":"Fairweather","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":341,"end":"11/23/15 17:01","start":"11/23/15 14:37"},
{"title":"Boogaloo","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":342,"end":"11/23/15 19:41","start":"11/23/15 17:17"},
{"title":"Boogaloo's Minions","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":343,"end":"11/24/15 4:08","start":"11/24/15 1:44"},
{"title":"H2 Ghost Bottom","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":344,"end":"11/25/15 19:00","start":"11/25/15 16:36"},
{"title":"H2 Ghost Top","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":345,"end":"11/26/15 8:56","start":"11/26/15 6:32"},
{"title":"Bug-Eye Ghost","Type of entry":"Singular Entity","Classification":"Class 5","allDay":null,"id":346,"end":"11/27/15 9:56","start":"11/27/15 7:32"},
{"title":"Guardians of the Old One","Type of entry":"Group of Entities","Classification":"Class 7","allDay":null,"id":347,"end":"11/28/15 18:28","start":"11/28/15 16:04"},
{"title":"The Old One","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":348,"end":"11/29/15 16:50","start":"11/29/15 14:26"},
{"title":"Nether Entities","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":349,"end":"11/30/15 14:23","start":"11/30/15 11:59"}];




