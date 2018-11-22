
function updatePost(index){

    
    var key = keys[index];
    if(proIndia){
        dbRef = db.ref("PRO-India-Recycling/SavedPosts");
    }else{
        dbRef = db.ref(user.uid.toString()+"/SavedPosts");
    }
    var contentAreaId = "content-" + index ;
    var content = document.getElementById(contentAreaId).value;
    dbRef.child(keys[index]+'/content').set(content).then((resp)=>{
    });
    dbRef.child(keys[index]+'/updatedOn').set(date.getFullYear() + '-' + parseInt(parseInt(date.getMonth()) + 1) + '-' + parseInt(parseInt(date.getDate()) + 1))

    

    document.getElementById('alert_console').insertAdjacentHTML('afterend','<div>Post no: '+parseInt(index+1)+' updated</div>');

    


}

