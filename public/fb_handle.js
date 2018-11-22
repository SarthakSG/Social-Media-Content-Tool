window.fbAsyncInit = function() {
    FB.init({
        appId      : 165494194305794,
        cookie     : true,
        xfbml      : true,
        oauth : true,
        version    : 'v3.0'
    });

    FB.AppEvents.logPageView();

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fb_login() {

    if(FB){
        FB.login(function(response) {
            if (response.authResponse) {
                var accessToken = response.authResponse.accessToken;
                document.getElementById('error').insertAdjacentHTML('afterend','<div class="alert alert-danger" style="margin:auto" role="alert">Facebook Connected</div>');
                /*FB.api("/me/permissions", function(resp) {
                        console.log(resp);
                        
                })*/ } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        },{
            scope:'email,publish_pages,manage_pages',
            return_scopes: true

        },)}
}


function fb_post(){
          console.log('FB Post');
          
    if(news_fetched){
        FB.api('/me/accounts?fields=access_token,name', function(response) {
            var pages = response;
            pages.data.forEach(element => {
    
                if(element.name==$('#page_name').val()){
                    console.log('count : ',count)
                    for (let index = 0; index < count; index++) {
                        const article = news.articles[index];
                        var msg= article.description+'\n'+
                                article.url;
                                console.log(msg);
                                var link = article.url;
                        var page_id = element.id;
                        console.log(page_id);
                        FB.api('/' + page_id + '/feed', 'post', { "message" : msg ,"link":link, "access_token": element.access_token }, function (response) {
                            console.log(response);
                
                            if (!response || response.error) {
                                console.log("Error in Feed posting." + response.error.message);
                                console.log(msg+' , ',accessToken);
                            } else {
                                console.log("Feed posted successfully.");
                
                            }});
                                
                        
                        
                    }
                    
                }                        
            });
        });
    }
   
    
  
}