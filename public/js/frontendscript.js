let newBurgerEl = $("#new-burger");
let burgerContainerEl = $(".burger-container");
let devouredBurgersEl = $(".devoured-burgers-container");

//add event listeners for getting, deleting and editing burgers
$(".submit-btn").on("click", addBurger);
$("#devour-btn").on("click", devourBurger);

// initial burgers array
let burgers = [];

// Getting burgers from database when page loads
getBurgers();

//get burgers from the database and updates the view
function getBurgers() {
  $.get("/api/burgers", function(data) {
    burgers = data;
    initializeRows();
  });
}
// resets the burgers displayed with new burgers from the database
function initializeRows() {
  burgerContainerEl.empty();
  devouredBurgersEl.empty();

  let undevouredBurgers = [];
  let devouredBurgers = [];

  for (let i = 0; i < burgers.length; i++) {
    if (burgers[i].devour === true) {
      devouredBurgers.push(createDevouredRow(burgers[i]));
    } else {
      undevouredBurgers.push(createNewRow(burgers[i]));
    }
  }
  burgerContainerEl.append(undevouredBurgers);
  devouredBurgersEl.append(devouredBurgers);
}

//makes a new burger row
function createNewRow(burger) {
  let newBurgerRow = $(
    [
      "<li class='list-group-item new-burger'>",
      burger.id,
      ". ",
      "<span>",
      burger.name,
      "</span>",
      "<input type='text' style='display: none;'>",
      "<button class='delete btn btn-secondary' id='devour-btn'>Devour it!</button>",
      "</li>"
    ].join("")
  );

  //The find() method returns the value of the first element in the provided array
  //that satisfies the provided testing function.
  newBurgerRow.find("#devour-btn").data("id", burger.id);

  // newBurgerRow.find("#devour-btn").click(devourBurger);

  newBurgerRow.data("burger", burger); //what does this mean?????

  return newBurgerRow;
}

//delete a burger when clicking the devour button
function devourBurger(event) {
  console.log("devourBurger fired");
  event.stopPropagation();
  let id = $(this).data("id"); //what does this mean?
  $.ajax({
    method: "DELETE",
    url: "/api/burgers/" + id
  }).then(function(deletedBurger) {
    getBurgers();
    console.log(deletedBurger);
  });
}

//add a new burger into database then update the view
function addBurger(event) {
  event.preventDefault();
  let burger = {
    name: newBurgerEl.val().trim(),
    devour: false
  };

  $.post("/api/burgers", burger, getBurgers);
  newBurgerEl.val(""); //set input empty
}

function createDevouredRow(burger) {
  let devouredBurgerRow = $(
    [
      "<li class='list-group-item devoured-burger'>",
      burger.id,
      ". ",
      "<span>",
      burger.name,
      "</span>",
      "<input type='text' style='display: none;'>",
      "</li>"
    ].join("")
  );
  devouredBurgerRow.data("burger",burger);
  return devouredBurgerRow;
}
