
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
    
$('.input-group-btn').click(function(){  
    var searcgterm = $('#srch-term').val();
    if(searcgterm !=""&&searcgterm!=undefined){
        searchevents(searcgterm);
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

var speechs = ["you forgot the magic word", "help activated welcome user", "my pleasure","Navigating calendar","Expelliarmus","you have zero unread messages"];
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


var jsonfeed = [{"title":"The Old One-user_1","Type of entry":"Singular Entity","Classification":"Class 7","allDay":null,"id":348,"end":"11/29/15 16:50","start":"11/29/15 14:26"},
{"title":"Nether Entities-user_1","Type of entry":"Group of Entities","Classification":"Class 5","allDay":null,"id":349,"end":"11/30/15 14:23","start":"11/30/15 11:59"}];




