$(function () {
	
    $('.btn-success').click(function(){  
        var issuccess = true;
        var login = $('#username').val();
        var password = $('#password').val();
        if(login==''||login==undefined){
            $('.username-field').find ('label').show ();
            issuccess=false;
        }
        
        if(password==''||password==undefined){
            $('.password-field').find ('label').show ();
            issuccess=false;
        }
        
        if(issuccess&&login=="user_1"){
            window.location.href = "user.html";            
        }
        if(issuccess&&login=="janine"){
            window.location.href = "janine.html";            
        }
        if(issuccess&&login=="venkman"){
            window.location.href = "venkman.html";            
        }
        return false;
                
    }); 
	
	test = document.createElement('input');
	if('placeholder' in test) jQuery.support.placeholder = true;
	
	
	//$('.field').find ('label').show ();
});