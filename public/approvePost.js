var news;

function approvePost(index){

    
    var key = keys[index];
    if(proIndia){
        dbRef = db.ref("PRO-India-Recycling/SavedPosts");
    }else{
        dbRef = db.ref(user.uid+"/SavedPosts");
    }
    var approveBtnElement = document.getElementById('approveBtn'+index);
    approveBtnElement.innerHTML = 'Approved'
    approveBtnElement.disabled = true;

    dbRef.child(keys[index]+'/status').set('Approved');
    dbRef.child(keys[index]+'/timestamp').set('timestamp');
    var statusId = "status-"+index
    document.getElementById(statusId).innerHTML = "Status: Approved";
    console.log(keys[index] + 'approved');
    document.getElementById('alert_console').insertAdjacentHTML('afterend','<div>Post no: '+parseInt(index+1)+' approved</div>');
    
    


}

