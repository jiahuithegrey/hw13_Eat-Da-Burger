let newBurgerEl = $("#new-burger");
let burgerContainerEl = $(".burger-container");
let devouredBurgersEl = $(".devoured-burgers-container");

//add event listeners for getting, deleting and editing burgers
$("button.insert").on("click", addBurger);
$("button.delete").on("click", devourBurger);

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
    if (burgers[i].devoured === true) {
      devouredBurgers.push(createDevouredRow(burgers[i]));
    } else {
      undevouredBurgers.push(createNewRow(burgers[i]));
    }
  }
  burgerContainerEl.append(undevouredBurgers); //difference between undervouredBurgers and newBurgerRow???????
  devouredBurgersEl.append(devouredBurgers);
}

//makes a new burger row
function createNewRow(burger) {
  let newBurgerRow = $("<div class='row justify-content-between'>");

  let burgerItem = $("<p class='burger-item text-center'>").text(burger.id + ". " + burger.name);
  let devourBtn = $("<button class='delete bg-light text-dark'>Devour it!</button>");

  newBurgerRow.append(burgerItem, devourBtn);
  burgerContainerEl.append(newBurgerRow);

  //find() method returns the value of the first element in the provided array ???????????????????
  //that satisfies the provided testing function.
  newBurgerRow.find("button.delete").data("id", burger.id);
  newBurgerRow.data("burger", burger); //what does this mean?????

  newBurgerRow.find("button.delete").click(devourBurger);

  return newBurgerRow;
}

//UPDATE a burger to 'devour: true' when clicking the devour button
function devourBurger(event) {
  
  event.preventDefault();

  let id = $(this).data("id"); //what does this mean?
  $.ajax({
    method: "PUT",
    url: "/api/burgers/" + id,
    data: { devoured: true }
  }).then(getBurgers);
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
  let devourBurgerRow = $("<div class='row devour-row justify-content-between'>");
  let devouredBurgerItem = $("<p class='devour-burger'>").text(burger.id + ". " + burger.name);
  let deleteBtn = $("<button class='delete-btn bg-light text-dark'>x</button>");

  devourBurgerRow.append(devouredBurgerItem, deleteBtn);
  return devourBurgerRow;
}

// let burgerItem = [
  //   burger.id,
  //   ". ",
  //   "<span>",
  //   burger.name,
  //   "</span>",
  //   "<input type='text' style='display: none;'>"
  // ].join("");
  // newBurgerRow.append(burgerItem, devourBtn);
  // devouredBurgerRow.data("burger", burger);
