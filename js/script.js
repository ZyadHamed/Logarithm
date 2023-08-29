AOS.init();
window.onscroll = function() {
    scrollFunction()
};
const links = document.querySelectorAll('.nav-link');
    
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
      });
      //e.preventDefault();
      link.classList.add('active');
    });
  });
}
var scrolledTo = false;

var gpaText = document.getElementById("gpaText");
var actText = document.getElementById("actText");
var duolingoText = document.getElementById("duolingoText");
function scrollFunction() {
    var element = document.querySelector('#myData');
	var position = element.getBoundingClientRect();
    if (document.body.scrollTop > document.getElementById("myimg").offsetHeight / 4|| document.documentElement.scrollTop > document.getElementById("myimg").offsetHeight / 4) {
       document.getElementById("nv").classList.add("bg-dark");
       document.getElementById("nvName").style.fontSize = "25px";
    } else {
       
        document.getElementById("nv").classList.remove("bg-dark");
        document.getElementById("nvName").style.fontSize = "30px";
        
    }

    if(position.top >= 0 && position.bottom <= window.innerHeight) {
        if(scrolledTo == false){
            animateValue2(gpaText, 0, 4, 1500);
            animateValue(actText, 0, 32, 1500);
            animateValue(duolingoText, 0, 140, 1500);
            document.getElementById("gpaDes").innerHTML = "GPA on a 4 scale";
            document.getElementById("actDes").innerHTML = "ACT Score";
            document.getElementById("duolingoDes").innerHTML = "Duolingo Score";
            scrolledTo = true;
        }
	}

    else{
        //scrolledTo = false;
    }

}

function animateValue2(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.round((progress * (end - start) + start) * 10) / 10;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }


  function ShowPortfolioData(btnName)
  {
      document.getElementById("portfolio-row").innerHTML = "";
      if(btnName == "btnAll")
      {
          for(var i = 1; i <= 9; i++)
          {
              if(i <= 3)
              {
                  var widget = GenerateImageWidget("../images/portfolio/portfolio-" + i + ".jpg", 'App' + i, "APP");
                  document.getElementById("portfolio-row").appendChild(widget);
              }

              else if(i <= 6)
              {
                  var widget = GenerateImageWidget("../images/portfolio/portfolio-" + i + ".jpg", 'Card' + (i - 3), "CARD");
                  document.getElementById("portfolio-row").appendChild(widget);
              }

              else
              {
                  var widget = GenerateImageWidget("../images/portfolio/portfolio-" + i + ".jpg", 'Web' + (i - 6), "WEB");
                  document.getElementById("portfolio-row").appendChild(widget);
              }
          }
      }

      else if(btnName == "btnApp")
      {
          for(var i = 1; i <= 3; i++)
          {
              var widget = GenerateImageWidget("images/portfolio/portfolio-" + i + ".jpg", 'App' + i, "APP");
              document.getElementById("portfolio-row").appendChild(widget);
          }
      }

      else if(btnName == "btnCard")
      {
          for(var i = 4; i <= 6; i++)
          {
              var widget = GenerateImageWidget("images/portfolio/portfolio-" + i + ".jpg", 'Card' + (i - 3), "CARD");
              document.getElementById("portfolio-row").appendChild(widget);
          }
      }

      else if(btnName == "btnWeb")
      {
          for(var i = 7; i <= 9; i++)
          {
              var widget = GenerateImageWidget("images/portfolio/portfolio-" + i + ".jpg", 'Web' + (i - 6), "WEB");
              document.getElementById("portfolio-row").appendChild(widget);
          }
      }
  }

  function GenerateImageWidget(imgpath, name, type)
  {
      var Containerdiv = document.createElement("div");
      Containerdiv.className = "col-lg-4 col-md-4 col-sm-12 col-xs-12";

      var figure  = document.createElement("figure");

      var image = document.createElement("img");
      image.className = "img-fluid";
      image.src = imgpath;

      var textContainer = document.createElement("div");
      textContainer.className = "btn-light";

      var Name = document.createElement("h3");
      var NameText = document.createTextNode(name);
      Name.appendChild(NameText);


      var Type = document.createElement("figcaption");
      Type.className = "figure-caption text-center";
      var TypeText = document.createTextNode(type);
      Type.appendChild(TypeText);

      textContainer.appendChild(Name);
      textContainer.appendChild(Type);
      figure.appendChild(image);
      figure.appendChild(textContainer);
      Containerdiv.appendChild(figure);

      return Containerdiv;
  }
  
  var btnContainer = document.getElementById("nav-ul");

  var btns = btnContainer.getElementsByClassName("nav-item");

  for (var i = 0; i < btns.length; i++) { 
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";});
  }

  ShowPortfolioData("btnAll");