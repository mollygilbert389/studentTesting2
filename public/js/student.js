

//const { fn } = require("sequelize");

// closes the panel on click outside
$(document).foundation()



// closes the panel on click outside
$(document).mouseup(function (e) {
    var container = $('#contact-panel');
    if (!container.is(e.target) // if the target of the click isn't the container...
    && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
        container.removeClass('is-active');
      }
});




//Target login button after student is checked in
let user = localStorage.getItem("User")
$("#LoginStu").text("Logged in:" + user)
$("#LoginStu").css("color","green")
$("#LoginStu").hover(function(){
  $("#LoginStu").addClass("hide")
  $("#LogoutStu").removeClass("hide")

},
  function(){
    $("#LogoutStu").addClass("hide")
    $("#LoginStu").removeClass("hide")

  }
)


//funtion to log out
$("#LogoutStu").on("click", function(){
  window.location.href = "/";
  localStorage.clear()

})



  
  
