var news;
var count;
var interval;
var commentsBak = [];
var news_fetched = false;
var date = new Date;
window.onload = function () {
    
    console.log(date.toISOString().slice(0, 10));
    document.getElementById('from_date').value = date.toISOString().slice(0, 10);
}
function copyPost(index){
    var textAreaId = "content-" + index;
    var post = document.getElementById(textAreaId) ;
    commentsBak[index] = post.value;

    const article = news.articles[index];
    var msg = article.description;
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
    var saveBtnElement = document.getElementById('saveBtn'+index);
    saveBtnElement.disabled = true;


}
var sources_list_html = '';
var sources_collected = false;
var sources = ['The Times Of India', 'BBC News', 'The Hindu', 'Al Jazeera English', 'CNN', 'Financial Times', 'The Economist', 'Fox News', 'Google News IN', 'Google News', 'ESPN', 'Bloomberg']
var source_codes = sources.slice(0);

for (let index = 0; index < sources.length; index++) {

    source_codes[index] = source_codes[index].toLowerCase().replace(/ /g, '-');


}

for (let index = 0; index < sources.length; index++) {
    const element = sources[index];
    /* element.toLowerCase();
    element.replace(' ','-'); */
    var label = element;
    var id = element.replace(/ /g, '-');
    sources_list_html = sources_list_html + '<li class="list-group-item"><div class="checkbox"><label><input type="checkbox" id="' + id + '">' + label + '</label></div></li>'

    if (index == sources.length - 1) {
        sources_collected = true;
    }

}

if (sources_collected) {
    var sources_list_html_element = '<ul class="form-inline">' + sources_list_html + '</ul>';

    document.getElementById('news_sources_element').innerHTML = sources_list_html_element;

}


function fetch_news() {

    count = $('#post_count').val();
    fetchNews();


    /*  if(count<15){
                 fetchNews();
                 setInterval(function(){
                
                     console.log('Posting');
                     console.log('interval : ',interval);
                     login();
                     fetchNews();
 
                  
                    },interval)
             } else{
                 $('#fb_error').html("Input Error");
             }      */



    function fetchNews() {


        document.getElementById('news_results').innerHTML = '<div class="alert alert-danger m-2" style="margin:auto" role="alert"> Please wait...  Fetching news.</div>';


        var days_count = $('#days_count').val();
        var from_date = document.getElementById('from_date').value
        var from_month = parseInt(parseInt(date.getMonth()) + 1);
        /* if(from_date<0){
            from_date = parseInt(from_date+31);
            from_month = parseInt(from_month-1)
        } */
        var request_source = ''
        var request_source_codes = [];
        for (let index = 0; index < sources.length; index++) {
            const element = sources[index];

            var id = element.replace(/ /g, '-');

            if (document.getElementById(id).checked) {
                request_source_codes.push(source_codes[index]);
            }

        }

        var url = ('https://newsapi.org/v2/everything?' +
            'q=' + ($('#search_tags').val()) + '&' +
            'sources=' + request_source_codes.join(',') + '&' +
            //'sources=the-times-of-india,bbc-news,the-hindu,al-jazeera-english,google-news,national-geographic&'+
            'from=' + from_date + '&' +
            'to=' + date.getFullYear() + '-' + parseInt(parseInt(date.getMonth()) + 1) + '-' + parseInt(parseInt(date.getDate()) + 1) + '&' +
            'apiKey=171076a0c16c43d7a347f8575d56c4bf');
        var req = new Request(url);
        fetch(req).then((response) => {
            response.json().then((result) => {

                news = result;
                var news_results = ''
                for (let index = 0; index < count && index < news.articles.length; index++) {
                    const article = news.articles[index];
                    var msg = article.description;
                    var title = article.title;
                    var pic = article.urlToImage;
                    var news_url = article.url;
                    var publishedAt = article.publishedAt;
                    var publisher = article.source.name;
                    news_results = news_results + '<li class = "list-group-item card" style="margin:auto;font-size : 16px ; width:500px; margin-top:25px"> ' + parseInt(index + 1) + '. <div class="checkbox" style="width:15px; margin:10px;"><input type="checkbox" class="checkbox" id = "news_check_' + index + '"></div> <div class="bmd-list-group-col"><h6 class="list-group-item-heading">' + title + '</h6><div class="d-block w-100 p-2" ><textarea type="message" name="content-' + index + '" class="form-control" id="content-' + index + '" rows="3" placeholder="Enter your comments here "></textarea></div><div class="news_image" ><img src="' + pic + '" class="news_image" style="max-width: 500px; margin:15px" alt=""></div><p class="list-group-item-text" style="font-size : 16px">' + msg + '</p><div></div> <div>  <a href="' + news_url + '" target="_blank">Read More <br></a></div><div><p>Published By : ' + publisher + '</p><p>Published At : ' + publishedAt.slice(0, 10) + '</p></div></div>    <button type="button" onclick="copyPost('+index+')" id="copyBtn'+index+'"  class="btn btn-info" >Copy Post</button><button id="saveBtn'+index+'" type="button" onclick="savePost('+index+')" class="btn btn-info" >Save Post</button></li>'
                }

                var news_results_element = '<div><ul class="list-group">' + news_results + '</ul><div class="alert alert-danger" style="margin:15px" role="alert"> If the results are not appropriate, please try again with different search tags or increase number of past Days.</div></div>'
                document.getElementById('news_results').innerHTML = news_results_element;
                if (news.articles.length > 0) {
                    news_fetched = true;
                    $('#news_check_0').prop('checked', true);
                }
                else {
                    document.getElementById('news_results').innerHTML = '<div class="alert alert-danger" style="margin:15px" role="alert"> No results Found. \nPlease try again with different search tags or increase number of past Days.</div>';
                }
            });


        })
    }


}

