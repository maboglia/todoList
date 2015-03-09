function ajax(method, url, async, callback, postData){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        callback(xmlhttp.readyState, xmlhttp.status, xmlhttp.responseText);
    }
    xmlhttp.open(method, url, async);
    if(method == "POST"){
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(postData);
    } else //mothod == "GET"
        xmlhttp.send();
}
function loadItems(){
    document.getElementById("items").innerHTML = '<div class="spinner"></div>';
    ajax("GET", "getItems.php", true, function(readyState, status, responseText){
        if (readyState==4 && status==200){
            document.getElementById("items").innerHTML = responseText;
            init();
        }
    });
}
loadItems();
function init(){
    var items = document.getElementsByClassName("item");
    for(i = 0; i < items.length; i++){
        var arrow = items[i].getElementsByClassName("arrow")[0];
        arrow.addEventListener("click", function(){
            if(this.getAttribute("class").indexOf("down") == -1){
                this.setAttribute("class", this.getAttribute("class") + " down");
                this.parentNode.parentNode.getElementsByClassName("description")[0].style.height = "auto";
            } else {
                this.setAttribute("class", this.getAttribute("class").replace(/down/,""));
                this.parentNode.parentNode.getElementsByClassName("description")[0].style.height = "0px";
            }
        }, false);
        if(items[i].getAttribute("data-completed") == "0"){
            //delete
            var remove = items[i].getElementsByClassName("remove")[0];
            remove.addEventListener("click", function(){
                var e = this,
                    id = e.parentElement.parentElement.getAttribute("id").replace(/itemid/,""),
                    item = e.parentElement.parentElement,
                    itemParent = e.parentElement.parentElement.parentElement;
                item.style.background = "#333";
                item.style.color = "#fff";
                e.parentElement.innerHTML = "Instructing server to delete...";
                ajax("POST", "delete.php", true, function(readyState, status, responseText){
                    if (readyState==4 && status==200){
                        if(responseText == "Sql Error")
                    alert("Fatal error");
                        else
                    itemParent.removeChild(item);
                    }
                }, "id=" + id);
            }, false);
            //complete
            var complete = items[i].getElementsByClassName("complete")[0];
            complete.addEventListener("click", function(){
                var e = this,
                    id = e.parentElement.parentElement.getAttribute("id").replace(/itemid/,""),
                    item = e.parentElement.parentElement,
                    itemParent = e.parentElement.parentElement.parentElement;
                item.style.background = "#AAA";
                item.style.color = "#333";
                e.parentElement.innerHTML = "Instructing server to complete...";
                ajax("POST", "complete.php", true, function(readyState, status, responseText){
                    if (readyState==4 && status==200){
                        if(responseText == "Sql Error")
                            alert("Fatal error");
                        else
                        loadItems();
                    }
                }, "id=" + id);
            }, false);
        }
    }
}
//new item & modal
function closeModal(){
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("modal").setAttribute("data-down", "false");
    window.setTimeout(function(){
        document.getElementById("overlay").style.display = "none";
    }, .25 * 1000)
    document.getElementById("overlay").style.background = "rgba(0, 0, 0, 0)";
}
document.getElementById("overlay").addEventListener("click", function(){
    closeModal();
}, false);
document.getElementById("modalClose").addEventListener("click", function(){
    closeModal();
}, false);
document.getElementById("createItem").addEventListener("click", function(){
    if(document.getElementById("title").value !== ""){
        ajax("POST", "add.php", true, function(readyState, status, responseText){
            if (readyState==4 && status==200){
                if(responseText == "Sql Error")
                    alert("Fatal error");
                else {
                    loadItems();
                    closeModal();
                }
            }
        }, "title=" + escape(document.getElementById("title").value) + "&description=" + escape(document.getElementById("desc").value));
        document.getElementById("createItem").innerHTML = '<div class="spinner"></div>';
    }
}, false);
document.getElementById("newItem").addEventListener("click", function(){
    document.getElementById("createItem").innerHTML = "Create item";
    document.getElementById("modal").setAttribute("data-down", "true");
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").style.background = "rgba(0, 0, 0, .2)";
}, false);
document.getElementById("clearCompleted").addEventListener("click", function(){
    ajax("POST", "deleteCompleted.php", true, function(readyState, status, responseText){
        if (readyState==4 && status==200){
            if(responseText == "Sql Error")
                alert("Fatal error");
            else {
                var items = document.getElementsByClassName("item"),
                    elementsToRemove = [];
                for(i = 0; i < items.length; i++)
                    if(items[i].getAttribute("data-completed") == "1")
                        elementsToRemove.push(items[i]);
                for(var i in elementsToRemove){
                    elementsToRemove[i].parentElement.removeChild(elementsToRemove[i]);
                }
            }
        }
    }, "");
}, false);