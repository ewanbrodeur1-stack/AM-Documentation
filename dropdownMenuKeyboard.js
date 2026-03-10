var branch;

function dropdownMenu(navid)
{
  var isopera = typeof window.opera != 'undefined';
  var isie = typeof document.all != 'undefined'
      && !isopera && navigator.vendor != 'KDE';
  var issafari = navigator.vendor == 'Apple Computer, Inc.';

  if (typeof document.getElementById == 'undefined'
      || (issafari && typeof window.XMLHttpRequest == 'undefined')
      || (isie && typeof document.uniqueID == 'undefined'))
  {
    return;
  }


  var tree = document.getElementById(navid);



  if (tree)
  {
    var horiz = tree.className.indexOf('sidebarmenu') != -1;
    branch = tree;
    var items = tree.getElementsByTagName('li');
    for (var i = 0; i < items.length; i++)
    {
      dropdownTrigger(tree, items[i], navid, isie, horiz);
    }

    if (!isopera)
    {
      cleanUselessWhitespace(tree);

      var keyevent = issafari || isie ? 'keydown' : 'keypress';
      attachEventListener(document, keyevent, function(e)
      {
        var target = typeof e.target != 'undefined'
            ? e.target : e.srcElement;
        if (tree.contains(target) && target.getAttribute('href'))
        {
          if (/^(37|38|39|40)$/.test(e.keyCode.toString()))
          {
            arrowKeyNavigation(tree, target, e.keyCode, horiz);

            if (typeof e.preventDefault != 'undefined')
            {
              e.preventDefault();
            }
            return false;
          }
        }
        return true;

      }, false);
    }

    var eles = typeof document.all != 'undefined'
        ? document.all : document.getElementsByTagName('*');
    for (i = 0; i < eles.length; i++)
    {
      attachEventListener(eles[i], 'focus', function(e)
      {
        var target = typeof e.target != 'undefined'
            ? e.target : e.srcElement;
        if (!tree.contains(target))
        {
          resetSiblingBranches(items[0]);
        }
      }, false);
    }

    if (!isie)
    {
      tree.contains = function(node)
      {
        if (node == null) { return false; }
        if (node == this) { return true; }
        else { return this.contains(node.parentNode); }
      };
    }
  }
}

function dropdownTrigger(tree, li, navid, isie, horiz)
{


 



  var opentime, closetime;
  var a = li.getElementsByTagName('a')[0];
  var menu = li.getElementsByTagName('ul').length > 0
      ? li.getElementsByTagName('ul')[0] : null;





  var issub = li.parentNode.id == navid;

  if (menu)
  {
   // li.className += (li.className == '' ? '' : ' ') + 'hasmenu';
  }

  attachEventListener(a, 'focus', function(e)
  {
    clearTimeout(closetime);

   // a.className += (a.className == '' ? '' : ' ') + 'rollover';

//a.style.backgroundColor = 'green'

    resetSiblingBranches(li);
    if (menu)
    {
      showMenu(menu, horiz, issub, li, a, isie);
    }

    var parent = li.parentNode;
    if (parent != tree)
    {
      if (parent.style.left == '' || parent.style.left == '-100em')
      {
        showAncestors(tree, parent, horiz, issub, isie);
      }

      if (toggleSelects('visible') && tree.contains(e.srcElement))
      {
        toggleSelects('hidden');
      }
    }
  }, false);

  

  if (!isie)
  {
    li.contains = function(node)
    {
      if (node == null) { return false; }
      if (node == this) { return true; }
      else { return this.contains(node.parentNode); }
    };
  }
}

function showMenu(menu, horiz, issub, li, a, isie)
{

                     
  menu.style.display="block"

     eventFire(menu,'mouseover');    




// try to colour 


li.focus();

   //  a.style.backgroundColor = 'purple'  // restore to black current selection
  // a.setAttribute("className", "active");


  if (typeof document.uniqueID != 'undefined')
  {

   // createIframeLayer(menu);
  }
}

function showAncestors(tree, menu, horiz, issub, isie)
{
  clearMenus(tree);

  while (menu.id != tree.id)
  {
    var li = menu.parentNode;
    var a = li.getElementsByTagName('a')[0];

    showMenu(menu, horiz, issub, li, a, isie);

    menu = li.parentNode;

  

  }
}

function resetSiblingBranches(trigger)
{
  clearMenus(trigger.parentNode);

  var links = trigger.parentNode.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++)
  {
    //links[i].className = links[i].className.replace(/ ?rollover/g, '');
  }
}

function cleanUselessWhitespace(node)
{
  for (var x = 0; x < node.childNodes.length; x++)
  {
    var child = node.childNodes[x];
    if (child.nodeType == 3 && !/\S/.test(child.nodeValue))
    {
      node.removeChild(node.childNodes[x]);
      x--;
    }
    if (child.nodeType == 1)
    {
      cleanUselessWhitespace(child);
    }
  }
}

function mapKeyCode(keycode, type)
{
  switch (type)
  {
    case 0:
      if (keycode == 37) keycode = 39;
      else if (keycode == 39) keycode = 37;
      break;

    case 1:
      if (keycode % 2) keycode++;
      else keycode--;
      break;

    case 2:
      if (keycode == 38) { keycode = 37; }
      break;
  }

  return keycode;
}

function arrowKeyNavigation(tree, link, keycode, horiz)
{
  var li = link.parentNode;
  var menu = li.getElementsByTagName('ul').length > 0
      ? li.getElementsByTagName('ul')[0] : null;
  var parent = li.parentNode;

  if (menu)
  {
    if (getRoughPosition(menu, 'x')
        < getRoughPosition(li.parentNode, 'x'))
    {
      keycode = mapKeyCode(keycode, 0);
    }
  }
  else if (parent != tree)
  {
    if (getRoughPosition(parent.parentNode.parentNode, 'x')
        > getRoughPosition(parent, 'x'))
    {
      keycode = mapKeyCode(keycode, 0);
    }
  }

  if (horiz)
  {
    if (parent == tree)
    {
      keycode = mapKeyCode(keycode, 1);
    }
    else if (parent.parentNode.parentNode == tree
        && li == li.parentNode.firstChild)
    {
      keycode = mapKeyCode(keycode, 2);
    }
  }

  switch (keycode)
  {
    case 37:
// left arrow
      parent = parent.parentNode;
      if (tree.parentNode == parent) { parent = null; }
      if (parent)
      {
        parent.firstChild.style.display="block"
       // parent.firstChild.style.backgroundColor = 'blue'
        parent.firstChild.focus();
//li.firstChild.style.backgroundColor = 'black'  // restore to black current selection

         // hide menu to the left!
         // menu.firstChild.firstChild.style.backgroundColor = 'blue'

          // menu.style.display="none"

      }
      break;

    case 38:
// up arrow
      var previous = li.previousSibling;


   

      if (!previous)
      {
        previous = li.parentNode.childNodes
            [li.parentNode.childNodes.length - 1];
      }


 

      
//li.firstChild.style.backgroundColor = 'black'  // restore to black current selection

 //previous.firstChild.style.backgroundColor = 'red' 

try{     
 previous.firstChild.focus();


  try{
      // have a go at clearing menus for tidiness
      //  menu.style.display="none"
      
     }
    catch(err)
      {
       //Handle errors here
      }

}
catch(err){
 li.firstChild.focus
}
      break;

// ----------------------------------------------------------------------------------------------------
    case 39:
// right arrow



      if (menu)
      {
 //li.firstChild.style.backgroundColor = 'black'  // restore to black current selection
 
        



try
  {
  menu.firstChild.firstChild.focus();

  }catch(err)  {
document.getElementsByTagName("a")[1].focus();
  }


 //menu.firstChild.firstChild.style.backgroundColor = 'blue'

      }
      break;

    case 40:
// down arrow
      var next = li.nextSibling;
      if (!next)
      {
        next = li.parentNode.childNodes[0];



      }

     try{
        next.firstChild.focus();
}
catch(err){}


   try{
      // have a go at clearing menus for tidiness
       // menu.style.display="none"
     }
catch(err)
  {
  //Handle errors here
  }


//li.firstChild.style.backgroundColor = 'black'  // restore to black current selection
       // next.firstChild.style.backgroundColor = 'blue'
   


      break;
  }
}

function clearMenus(root)
{
  var menus = root.getElementsByTagName('ul');
  for (var i = 0; i < menus.length; i++)
  {
   menus[i].style.display="none"
    
  }
}

function unwantedTextEvent()
{
  return (navigator.vendor == 'Apple Computer, Inc.'
      && (event.target == event.relatedTarget.parentNode
      || (event.eventPhase == 3
      && event.target.parentNode == event.relatedTarget)));
}

function getRoughPosition(ele, dir)
{
  var pos = dir == 'x' ? ele.offsetLeft : ele.offsetTop;
  var tmp = ele.offsetParent;
  while (tmp != null)
  {
    pos += dir == 'x' ? tmp.offsetLeft : tmp.offsetTop;
    tmp = tmp.offsetParent;
  }
  return pos;
}

function getViewportSize()
{
  var size = [0,0];

  if (typeof window.innerWidth != 'undefined')
  {
    size = [
        window.innerWidth,
        window.innerHeight
    ];
  }
  else if (typeof document.documentElement != 'undefined'
      && typeof document.documentElement.clientWidth != 'undefined'
      && document.documentElement.clientWidth != 0)
  {
    size = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
    ];
  }
  else
  {
    size = [
        document.getElementsByTagName('body')[0].clientWidth,
        document.getElementsByTagName('body')[0].clientHeight
    ];
  }

  return size;
}



function toggleSelects(vis)
{
  if (typeof document.uniqueID != 'undefined'
      && typeof document.body.style.scrollbarTrackColor == 'undefined')
  {
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++)
    {
      selects[i].style.visibility = vis;
      selects[i].style.visibility = vis;


  selects[i].style.display="hidden"
    }

    return true;
  }

  return false;
}

function attachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.addEventListener != 'undefined')
  {
    target.addEventListener(eventType, functionRef, capture);
  }
  else if (typeof target.attachEvent != 'undefined')
  {
    target.attachEvent('on' + eventType, functionRef);
  }
  else
  {
    eventType = 'on' + eventType;

    if (typeof target[eventType] == 'function')
    {
      var oldListener = target[eventType];

      target[eventType] = function()
      {
        oldListener();

        return functionRef();
      }
    }
    else
    {
      target[eventType] = functionRef;
    }
  }

  return true;
}

function addLoadListener(fn)
{
  if (typeof window.addEventListener != 'undefined')
  {
    window.addEventListener('load', fn, false);
  }
  else if (typeof document.addEventListener != 'undefined')
  {
    document.addEventListener('load', fn, false);
  }
  else if (typeof window.attachEvent != 'undefined')
  {
    window.attachEvent('onload', fn);
  }
  else
  {
    var oldfn = window.onload;
    if (typeof window.onload != 'function')
    {
      window.onload = fn;
    }
    else
    {
      window.onload = function()
      {
        oldfn();
        fn();
      };
    }
  }
}

addLoadListener(function() { dropdownMenu('sidebarmenu1'); });


function eventFire(el, etype){     if (el.fireEvent) {       el.fireEvent('on' + etype);     } else {       var evObj = document.createEvent('Events');       evObj.initEvent(etype, true, false);       el.dispatchEvent(evObj);     } } 