function validateForm() {
    let regEx = new RegExp("^[a-zA-Z]+$");

    let x = document.forms["Lessons-Signup"]["first-Name"].value;
    if (x.search(regEx) === -1) {
      document.getElementById("First-Name").insertAdjacentHTML("afterend", 
      '<p class="error-msg">First Name should include only letters a-Z</p>'
      );
      return false;
    }

    
    let y = document.forms["Lessons-Signup"]["Last-Name"].value;
    if (y.search(regEx) === -1) {
      document.getElementById("Last-Name").insertAdjacentHTML("afterend", 
      '<p class="error-msg">Last Name should include only letters a-Z</p>'
      );
      return false;
    }
  }

  let menuOn = false;
  function menu() {
    let z = document.getElementById("nav");
    if(menuOn === true)
    {
      menuOn = false;
      z.style.left = -500 + "px";
    }
    else if(menuOn === false)
    {
      menuOn = true;
      z.style.left = 0 + "px";
    }
  }

  function menuOff() {
    let z = document.getElementById("nav");
    menuOn = false;
      z.style.left = -500 + "px";
  }