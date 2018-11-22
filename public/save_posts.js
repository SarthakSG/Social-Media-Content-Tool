
function savePost(index){

    var timestamp = new Date().getTime()
    var textAreaId = "content-" + index;
    const article = news.articles[index];
    var msg = article.description;
    var title = article.title;
    var pic = article.urlToImage;
    var news_url = article.url;
    var publishedAt = article.publishedAt;
    var publisher = article.source.name;
    var textAreaId = "content-" + index;
    var content = document.getElementById(textAreaId).value ;
    
    if(user.email.indexOf("@india-recycling.com")!=-1){
        dbRef = db.ref("PRO-India-Recycling/SavedPosts");
    }else {
        dbRef = db.ref(user.uid+"/SavedPosts");
    }
    
    dbRef.push({
        article : article,
        author : user.displayName,
        content : content,
        status: "Pending Review",
        updatedOn : date.getFullYear() + '-' + parseInt(parseInt(date.getMonth()) + 1) + '-' + parseInt(parseInt(date.getDate()) + 1)
    })

    console.log(commentsBak[index]);
    
    document.getElementById('alert_console').insertAdjacentHTML('afterend','<div>Post no: '+parseInt(index+1)+' Saved</div>');
    var saveBtnElement = document.getElementById('saveBtn'+index);
    saveBtnElement.disabled = true;

}

