

var menuids=["sidebarmenu1"] //Enter id(s) of each Side Bar Menu's main UL, separated by commas

var onMouseOutDelay = 3000;      //Delay that will apply to mouseout event

function initsidebarmenu(){
for (var i=0; i<menuids.length; i++){
  var ultags=document.getElementById(menuids[i]).getElementsByTagName("ul")
    for (var t=0; t<ultags.length; t++){
    ultags[t].parentNode.getElementsByTagName("a")[0].className+=" subfolderstyle"
 

 if (ultags[t].parentNode.parentNode.id==menuids[i]) //if this is a first level submenu
 
  ultags[t].style.left=ultags[t].parentNode.offsetWidth+"px" //dynamically position first level submenus to be width of main menu item
  else //else if this is a sub level submenu (ul)



    ultags[t].style.left=ultags[t].parentNode.offsetWidth+"px" //position menu to the right of menu item that activated it
   



     ultags[t].parentNode.onmouseover = function() 
             {
                 this.getElementsByTagName("ul")[0].isMouseOver = true;
                 this.getElementsByTagName("ul")[0].style.display = "block";
                 hideAllOther(this);
                 if (this.toref)
                     window.clearTimeout(this.toref);
             }
             ultags[t].parentNode.onmouseout = function() 
             {
                 var saveref = this.getElementsByTagName("ul")[0];
                 saveref.isMouseOver = false;
                 if (this.toref)
                     window.clearTimeout(this.toref);


                 //this.getElementsByTagName("ul")[0].style.display = "none";
                 this.toref = window.setTimeout(function(e) {
                     if (!saveref.isMouseOver)
                         saveref.style.display = "none"
                 }, onMouseOutDelay);
             }
         }
         for (var t = ultags.length - 1; t > -1; t--) { //loop through all sub menus again, and use "display:none" to hide menus (to prevent possible page scrollbars
             ultags[t].style.visibility = "visible";

             ultags[t].style.display = "none";
         }
     }
 }


 function hideAllOther(liobj) {
     var p = liobj.parentNode.childNodes;


     //alert(liobj.parentNode.childNodes[3]);
     //alert(p);
     var i;
     try {
         for (i = 0; i < p.length; i++) {
             if (liobj != p[i] && "LI" == p[i].tagName && p[i].getElementsByTagName("ul").length)
                 p[i].getElementsByTagName("ul")[0].style.display = "none";
         }
     } catch (e) {
         alert(p[i].innerHTML)
     }


 }

if (window.addEventListener)
window.addEventListener("load", initsidebarmenu, false)
else if (window.attachEvent)
window.attachEvent("onload", initsidebarmenu)


