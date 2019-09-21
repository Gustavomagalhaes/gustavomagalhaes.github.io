var CORSProxy = "https://cors-hld.herokuapp.com/";
var activeArticle = 0;
var totalArticle = 10;

var xDown = null;
var yDown = null;

function trimString(string, maxLength){
  if(string.length > maxLength){
    string = string.substring(0,maxLength);
    string = string.substr(0, Math.min(string.length, string.lastIndexOf(" ")));
    string += " [...]";
  }
  return string;
}

function replaceText(original, before, after){
    if(before.constructor !== Array){
      before = [before];
      after = [after];
    }
    var result = original;
    for(var i = 0; i < before.length; i++){
      result = result.split(before[i]).join(after[i]);
    }
    return result;
}

function fetchFeed(url){
  $.ajax({
    url: CORSProxy+url,
    type: 'GET',
    dataType: "xml",
    error:function(xhr, ajaxOptions, thrownError){
      //$("#my-articles").append("<li class='error'><h2>Can't Fetch News :/</h2></li>");
      //$("#my-articles").css("max-height","100px");
      // generateCards($("#backup").html(),false);
      // $(".limit-error").addClass("show");
    },
    success:function(xml){
      generateCards(xml,true);
    }
  })
}

function generateHtml(data){
  var html = $("#article-template").html();
  var before = ["{{category}}","{{title}}","{{pubDate}}","{{description}}","{{url}}","{{z-index}}"];
  return replaceText(html, before, data);
}

function generateCards(xml,isCDATA){
  var items = $(xml).find('item');
  for(var i = 0; i < totalArticle; i++){
    var url = $(items[i]).find('guid').text();
    
    var title = $(items[i]).find('title').text();
    title = trimString(title,65);
    
    var description = $(items[i]).find("content\\:encoded").text();
    description = description.split('<p>')[1].split('</p>')[0]
    description = description.replace(/<[^>]*>/g, "");
    description = trimString(description,130);

    var pubDate = new Date($(items[i]).find('pubDate').text());
    pubDate = moment(pubDate).locale('pt-br').fromNow();

    var category = $(items[i]).find('category').last().text().toLowerCase();
    var html = generateHtml([category,title,pubDate,description,url,(i * -2)]);

    $("#my-articles").append(html);
    
    var image = $(items[i]).find("content\\:encoded").text();
    image = image.split('<img alt="" src="')[1].split('" />')[0]
    $("#my-articles li").eq(i).find(".card-image").css("background-image","url("+image+")");
    
  }
  $("#my-articles").css("max-height","600px");
  arrangeCards();

  $("#my-articles li").click(function(){
    $(this).find(".card-content").toggleClass("open");
    if($(this).find(".card-content").hasClass("open")){
      $("#my-articles li").eq(activeArticle).find("a").removeAttr("tabindex");
    }
  })

  $('#my-articles li').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      $(this).find(".card-content").toggleClass("open");
      if($(this).find(".card-content").hasClass("open")){
        $("#my-articles li").eq(activeArticle).find("a").removeAttr("tabindex");
      }
      else{
        $("#my-articles li").eq(activeArticle).find("a").attr("tabindex",-1);
      }
      return false;  
    }
  });  

  $(".card-content a").click(function(e){
    e.stopPropagation();
  })
}

function arrangeCards(){
  var order = 0;
  for (var i = activeArticle; i < totalArticle; i++){
    $("#my-articles li").removeAttr("tabindex");
    $("#my-articles li").eq(i).css("transform", "translate3d(0px, 0px, "+order*-50+"px) rotateX(0deg)");
    order++;
  }
  $("#my-articles .card-content").removeClass("open");
  $("#my-articles li").eq(activeArticle).attr("tabindex",0);
  $("#my-articles li").eq(activeArticle).find("a").attr("tabindex",-1);
  $("#my-articles li").eq(activeArticle).find(".open a").removeAttr("tabindex");
}

function nextCard(){
  if(activeArticle < totalArticle - 1){
    $("nav button").removeAttr("disabled");
    $("#my-articles li").eq(activeArticle).addClass("go-away");
    activeArticle++;
    arrangeCards();

    if(activeArticle == totalArticle - 1)
      $(".next-article").attr("disabled","");
  }
}

function prevCard(){
  if(activeArticle > 0){
    $("nav button").removeAttr("disabled");
    activeArticle--;
    $("#my-articles li").eq(activeArticle).removeClass("go-away");
    arrangeCards();

    if(activeArticle == 0)
      $(".prev-article").attr("disabled","");
  }
}

//swiping functions (from https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android)
function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
};                                                

function handleTouchMove(evt) {
  if ( ! xDown || ! yDown ) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
    if ( xDiff > 0 ) {
      nextCard();
    } else {
      prevCard();
    }
  }
  xDown = null;
  yDown = null;
};

window.onload = function() {
  fetchFeed("https://medium.com/feed/concretebr");
  // fetchFeed("https://medium.com/feed/@primefactoring");
  
  $(".prev-article").click(function(){
    prevCard();
  })
  $(".next-article").click(function(){
    nextCard();
  })
  
  //navigate with arrow keyboard
  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
          prevCard();
        break;

        case 38: // up
          prevCard();
        break;

        case 39: // right
          nextCard();
        break;

        case 40: // down
          nextCard();
        break;

        default: return;
    }
    e.preventDefault();
  });
  
  //swipe listener
  document.getElementById("articles").addEventListener('touchstart', handleTouchStart, false);        
  document.getElementById("articles").addEventListener('touchmove', handleTouchMove, false);
  
}