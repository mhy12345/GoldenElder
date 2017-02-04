var options = {
    uploadJson: '/api/uploadImg'
};

function sendMessage(url,message) {
    alert("Post Message to "+url+" :"+message);
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(message);
}
function saveArticle(id,field,title,text){
    sendMessage('/api/savearticle',"id="+id+"&field="+field+"&title="+title+"&user=admin&text="+escape(text));
}
function newArticle(){
    sendMessage('/api/newarticle',"");
    window.location.reload();
}
function newFolder(){
    sendMessage('/api/newfolder',"");
    window.location.reload();
}
var editor;
function setArticle(id,title,text)
{
    editor.html(unescape(text));
}
KindEditor.ready(function(K) {
    editor = K.create('#editor', options);
    editor.html(unescape(document.getElementById('articleText').value));
    K("input[name=saveArticle]").click(function(e){
        var articleContent = editor.html();
        var articleField = document.getElementById('articleField').value;
        var articleTitle = document.getElementById('articleTitle').value;
        var articleId = document.getElementById('articleId').value;
        saveArticle(articleId,articleField,articleTitle,articleContent);
    });
});
