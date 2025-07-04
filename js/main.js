/* === start script === */
window.onload = function () {
  /* === variables === */
  const thaiFoodList = [
    "Som-Tum",
    "Tom-Kha-Kai",
    "Khao-Niew-Ma-Muang",
    "Fried-Rice",
    "Green-Curry",
    "Khao-Mun-Kai",
    "Pad-Thai",
    "Pad-Kra-Pow",
    "Tom-Yum-Goong",
  ];

  const germanFoodList = [
    "Schnitzel",
    "Bratwurst",
    "Currywurst",
    "Pretzel",
    "Sauerkraut",
    "Mett",
    "Schweinshaxe",
    "Broetchein",
    "Kartoffelsalat",
  ];

  const restartButton = document.getElementById("restart");
  const modeButtons = document.querySelectorAll(".mode");
  const message = document.getElementById("message");
  const attemptBadge = document.getElementById("attempt");
  const defaultMessage = "- Please click on the right picture -";
  let attempt = 0;
  let foodList = thaiFoodList;
  let folderName = "/thai-food-webp/";
  let box;
  let wantedDish;

  init();

  /* === Methods === */

  function init() {
    setImages(foodList, folderName);
    setMode();
    wantedDish = randomDish();
    reset();
  }

  function countAttempt() {
    const countAttempt = document.getElementById("countAttempt");
    attempt++;
    countAttempt.innerText = attempt;
  }

  function setMode() {
    for (let i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function () {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Thai food") {
          foodList = thaiFoodList;
          folderName = "/thai-food-webp/";
          reset();
        } else {
          foodList = germanFoodList;
          folderName = "/german-food-webp/";
          reset();
        }
      });
    }
  }

  restartButton.addEventListener("click", function () {
    reset();
  });

  function reset() {
    const countAttempt = document.getElementById("countAttempt");
    const imgParent = document.querySelectorAll(".img-parent");
    wantedDish = randomDish();
    shuffle();
    playSound("reset");
    for (let i = 0; i < 9; i++) {
      imgParent[i].removeChild(imgParent[i].firstChild);
      imgParent[i].classList.remove("hide");
    }
    setImages(foodList, folderName);
    attempt = 0;
    countAttempt.innerText = 0;
    message.innerText = defaultMessage;
    message.style.color = "grey";
  }

  function setImages(foodList, folderName) {
    // a loop for generating images
    for (let i = 0; i < 9; i++) {
      box = document.querySelector(".box" + (i + 1));

      box.innerHTML = ""; // Remove old content completely

      const img = document.createElement("img");
      img.src = "images" + folderName + foodList[i] + ".webp";
      img.alt = foodList[i];
      box.appendChild(img);
      box.classList.add("fx");

      const cleanBox = box.cloneNode(true);
      box.replaceWith(cleanBox);
      //replaceWith helps to fix counting attempt bugs caused by repeatedly assign addEventlistener (stacking). JS doesn’t automatically remove old ones.
      cleanBox.addEventListener("click", function () {
        const img = this.querySelector("img");

        if (img.alt == wantedDish) {
          countAttempt();
          playSound("correct");
          flashAttemptColor("green");
          cleanBox.classList.add("fade", "hide");
          wantedDish = randomDish();
          message.innerText = "Yummy! come eat with me :)";
          message.style.color = "green";
        } else {
          countAttempt();
          playSound("wrong");
          flashAttemptColor("red");
          message.innerText = "Oops, that's not what I want :(";
          message.style.color = "red";
        }
      });
    }
  }

  // keyword: shuffle-without-repeat
  function randomDish() {
    let randNum = Math.floor(Math.random() * 9);
    const textDisplay = document.getElementById("text-display");
    textDisplay.innerText = foodList[randNum];
    return foodList[randNum];
  }

  function shuffle() {
    for (let i = 0; i < 9; i++) {
      let randPointer = Math.floor(Math.random() * 9);
      // take this to store temporily somewhere
      let temp = foodList[randPointer];
      // take the 1 item to random position
      foodList[randPointer] = foodList[i];
      foodList[i] = temp;
    }
    return foodList;
  }

  function playSound(inputSound) {
    var sound = new Audio("sounds/" + inputSound + ".mp3");
    sound.play();
  }

  function flashAttemptColor(Color) {
    attemptBadge.classList.add(Color);
    setTimeout(function () {
      attemptBadge.classList.remove(Color);
    }, 200);
  }
};
