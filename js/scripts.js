
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
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          selectable: true,
          selectHelper: true,
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
          events: [
            {
              title: 'All Day Event',
              start: new Date(y, m, 1)
            },
            {
              title: 'Long Event',
              start: new Date(y, m, d+5),
              end: new Date(y, m, d+7)
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: new Date(y, m, d-3, 16, 0),
              allDay: false
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: new Date(y, m, d+4, 16, 0),
              allDay: false
            },
            {
              title: 'Meeting',
              start: new Date(y, m, d, 10, 30),
              allDay: false
            },
            {
              title: 'Lunch',
              start: new Date(y, m, d, 12, 0),
              end: new Date(y, m, d, 14, 0),
              allDay: false
            },
            {
              title: 'Birthday Party',
              start: new Date(y, m, d+1, 19, 0),
              end: new Date(y, m, d+1, 22, 30),
              allDay: false
            }
          ]
        });
      });

var speechs = ["you forgot the magic word", "help activated welcome Janine", "my pleasure","Navigating calendar"];
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
     'Thank you': function() { 
        responsiveVoice.speak(speechs[2],"US English Female",{onstart: StartCallback});
        hidehelp();
    },
     'next month': function() { 
        $('.fc-button-next').trigger("click");
        smileymessage_one(speechs[3]);
    },
     'previous month': function() { 
        $('.fc-button-prev').trigger("click");
        smileymessage_one(speechs[3]);
    },
     'go to :month': {'regexp': /^go to (January|Febraury|March|April|May|June|July|August|September|October|November|December)/, 
                            'callback': gotomonth},
     'go to :year': {'regexp': /^go to (2015|2016|2010|2011|2012|2013|2014|2017)/, 
                            'callback': gotoyear}

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
