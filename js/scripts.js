
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

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
 var commands = {
    'I need help': function() { 
        responsiveVoice.speak("You forgot the magic word.");
    },
     'Please': function() { 
        responsiveVoice.speak("Help activated. Welcome Janine.");
        showhelp();
    },
     'Thank you': function() { 
        responsiveVoice.speak("My pleasure.");
        hidehelp();
    }
  };

    annyang.addCallback('resultNoMatch', function (userSaid, commandText, phrases) {
      console.log(userSaid); // sample output: 'hello'
      console.log(commandText); // sample output: 'hello (there)'
      console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
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
}
function hidehelp(){
    $('.calendar').removeClass('col-sm-9');
    $('.calendar').addClass('col-sm-12');
    $('.helpbar').addClass('hidden');
    $('#calendar').fullCalendar('render');
}