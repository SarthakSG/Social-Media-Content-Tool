var keys = [];
var data = [];
var count = 0;
var postsArray = []
var news_results = "";
function view_saved_posts(){
    if(user.email.indexOf("@india-recycling.com")!=-1){
        dbRef = db.ref("PRO-India-Recycling/SavedPosts");
    }else {
        dbRef = db.ref(user.uid+"/SavedPosts");
    }
    var index = 0;
    dbRef.once('value',(snapshot)=>{
        snapshot.forEach((childSnapshot)=>{
            var data = childSnapshot.val();
            postsArray.push(data);
            keys[index] = childSnapshot.key;
/* 
            const article = data.article;
            var status = data.status;
            var content = data.content;
            
            var msg = article.description;
            var title = article.title;
            var pic = article.urlToImage;
            var news_url = article.url;
            var publishedAt = article.publishedAt;
            var publisher = article.source.name;
            var displayApproveBtn;
            
            if(!proIndia){
                displayApproveBtn = "none"
            }
            news_results = news_results + '<li class = "list-group-item card" style="margin:auto;font-size : 16px ; width:500px; margin-top:25px"> ' + parseInt(index + 1) + '. <div class="checkbox" style="width:15px; margin:10px;"><input type="checkbox" class="checkbox" id = "news_check_' + index + '"></div> <div class="d-block w-100 p-2" ><textarea type="message" name="content-' + index + '" class="form-control" id="content-' + index + '" rows="3" >'+content+'</textarea></div><div class="bmd-list-group-col"><h6 class="list-group-item-heading">' + title + '</h6><div class="news_image" ><img src="' + pic + '" class="news_image" style="max-width: 500px; margin:15px" alt=""></div><p class="list-group-item-text" style="font-size : 16px">' + msg + '</p><div></div> <div>  <a href="' + news_url + '" target="_blank">Read More <br></a></div><div><p>Published By : ' + publisher + '</p><p>Published At : ' + publishedAt.slice(0, 10) + '</p><p>Status : ' + status + '</p></div></div>    <button type="button" onclick="copyPost('+index+')" class="btn btn-info" >Copy Post</button><button id = "approveBtn'+index+'" style="display:'+displayApproveBtn+'" type="button" onclick="approvePost('+index+')" class="btn btn-info" >Approve Post</button><button id = "updateBtn'+index+'"  type="button" onclick="updatePost('+index+')" class="btn btn-info" >Update Post</button></li>'
            */ 
            index++ ;
        })
        
    
    }).then(()=>{
 
        keys.reverse();
        postsArray.reverse();
       for (let index = 0; index < postsArray.length; index++) {
        data = postsArray[index];
        count++;
        
        const article = data.article;
        var status = data.status;
        var content = data.content;
        var uploader = data.author;
        var msg = article.description;
        var title = article.title;
        var pic = article.urlToImage;
        var news_url = article.url;
        var publishedAt = article.publishedAt;
        var publisher = article.source.name;
        var displayApproveBtn;
        var updatedOn = data.updatedOn
        var textApproveBtn = (status=="Approved")?"Approved":"Approve";
        var disableApproveBtn = (status=="Approved")?"disabled":"";
        var disableUpdateBtn = (status=="Approved")?"disabled":"";
        
        if(user.email!="admin@india-recycling.com"){
            displayApproveBtn = "none"
        }
        news_results = news_results + '<li class = "list-group-item card" style="margin:auto;font-size : 16px ; width:500px; margin-top:25px"> ' + parseInt(index + 1) + '. <div class="checkbox" style="width:15px; margin:10px;"><input type="checkbox" class="checkbox" id = "news_check_' + index + '"></div> <div class="d-block w-100 p-2" ><textarea type="message" name="content-' + index + '" class="form-control" id="content-' + index + '" rows="3" >'+content+'</textarea></div><div class="bmd-list-group-col"><h6 class="list-group-item-heading">' + title + '</h6><div class="news_image" ><img src="' + pic + '" class="news_image" style="max-width: 500px; margin:15px" alt=""></div><p class="list-group-item-text" style="font-size : 16px">' + msg + '</p><div></div> <div>  <a href="' + news_url + '" target="_blank">Read More <br></a></div><div><p>Published By : ' + publisher + '</p><p>Published At : ' + publishedAt.slice(0, 10) + '</p><p id="status-'+index+'">Status : ' + status + '</p><p id="uploader">Uploaded by: ' + uploader + '<br>Updated on: ' + updatedOn + '</p></div></div>    <button type="button" id="copyBtn'+index+'" onclick="copyPostSaved('+index+')"  class="btn btn-info" >Copy Post</button><button id = "approveBtn'+index+'" data-toggle="snackbar" data-style="toast" data-content="Approved Post no: '+index+'" style="display:'+displayApproveBtn+'" type="button" onclick="approvePost('+index+')" class="btn btn-info" '+disableApproveBtn+' >'+textApproveBtn+'</button><button id = "updateBtn'+index+'"  '+disableUpdateBtn+' type="button" onclick="updatePost('+index+')" class="btn btn-info" >Update Post</button></li>'
       
       
    }
        
        var news_results_element = '<div><ul class="list-group">' + news_results + '</ul></div>'
        document.getElementById('news_results').innerHTML = news_results_element;
        if (index > 0) {
            news_fetched = true;
            $('#news_check_0').prop('checked', true);
        }
        else {
            document.getElementById('news_results').innerHTML = '<div class="alert alert-danger" style="margin:15px" role="alert"> No Posts Found.</div>';
        }
    })
}
