function copyPostSaved(index){
    var textAreaId = "content-" + index;
    var post = document.getElementById(textAreaId) ;
    const data = postsArray[index];       
    const article = data.article;    var msg = article.description;
    var title = article.title;
    var pic = article.urlToImage;
    var news_url = article.url;
    var publishedAt = article.publishedAt;
    var publisher = article.source.name;
    post.value =  post.value  +'\n' + title +'\n'+ msg + '\n \nRead more at ' + news_url + '\nSource : '+publisher;   
    post.select();
    document.execCommand('copy');
    document.getElementById('alert_console').insertAdjacentHTML('afterend','<div>Post no: '+parseInt(index+1)+' copied</div>');
    var copyBtnElement = document.getElementById('copyBtn'+index);
    copyBtnElement.innerHTML = 'Copied'
    copyBtnElement.disabled = true;
   
    var updateBtnElement = document.getElementById('updateBtn'+index);
    updateBtnElement.disabled = true;

}