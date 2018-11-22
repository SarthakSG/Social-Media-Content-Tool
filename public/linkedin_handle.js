function onLinkedInLoad() {
    IN.Event.on(IN, "auth", function(){
        console.log('LinkedIn Connected');
        document.getElementById('error').insertAdjacentHTML('afterend','<div class="alert alert-danger" style="margin:auto" role="alert">LinkedIn Connected</div>');
        
    });
  }

  

// Handle the successful return from the API call
function onSuccess(data) {
  console.log(data);
  document.getElementById('error').insertAdjacentHTML('afterend','<div class="alert alert-danger" style="margin:auto" role="alert">Posting on LinkedIn Successful</div>');

}

// Handle an error response from the API call
function onError(error) {
  console.log(error);
}

var date = new Date;
// Use the API call wrapper to share content on LinkedIn
function linkedin_post() {
  document.getElementById('error').insertAdjacentHTML('afterend','<div class="alert alert-danger" style="margin:auto" role="alert">Posting on LinkedIn</div>');


 if(news_fetched){
  for (let index = 0; index < count; index++) {
    var id = 'news_check_'+index;
    var content_id = ('content-' + index).toString() ;
    var news_check = document.getElementById(id).checked;
    console.log(index + ' : ' +news_check);
    var content = document.getElementById(content_id).value + '\n';
    if(news_check){
      const article = news.articles[index];
    var msg= content + article.description+'\n'+
            article.url;
            console.log(msg);
            var link = article.url;
    var payload = { 
              "comment": msg, 
              "visibility": { 
                "code": "anyone"
              } 
            };
    IN.API.Raw("/people/~/shares?format=json")
    .method("POST")
    .body(JSON.stringify(payload))
    .result(onSuccess)
    .error(onError);
    }
    
  }
  
 
 }
}

function linkedin_saved_post() {
  document.getElementById('error').insertAdjacentHTML('afterend','<div class="alert alert-danger" style="margin:auto" role="alert">Posting on LinkedIn</div>');


 if(news_fetched){
  for (let index = 0; index < count; index++) {
    var textAreaId = "content-" + index;
    var post = document.getElementById(textAreaId) ;

    const data = postsArray[index];       
    const article = data.article;    var msg = article.description;
    var title = article.title;
    var pic = article.urlToImage;
    var news_url = article.url;
    var publishedAt = article.publishedAt;
    var publisher = article.source.name;
    post.value = title +'\n'+ post.value  +'\n' + msg + '\n \nRead more at ' + news_url + '\nSource : '+publisher;   
   
    var payload = { 
              "comment": post.value, 
              "visibility": { 
                "code": "anyone"
              } 
            };
            var cpnyID = 2414183;

            IN.API.Raw("/companies/" + cpnyID + "/shares?format=json")
              .method("POST")
              .body(JSON.stringify(payload))
              .result(onSuccess)
              .error(onError);
    }
    
  }
  
 
 }
