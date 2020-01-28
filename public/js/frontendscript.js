let newBurgerEl = $("#new-burger");
let burgerContainerEl = $(".burger-container");
let devouredContainerEl = $(".devoured-container");

//add event listeners for getting, deleting and editing burgers
$("button.insert").on("click", addBurger);
// $("button.devour").on("click", devourBurger);
$(burgerContainerEl).on("click", "button.devour", devourBurger);
$(devouredContainerEl).on("click", "button.delete", deleteDevoured);

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
  devouredContainerEl.empty();

  for (let i = 0; i < burgers.length; i++) {
    if (burgers[i].devoured === false) {
      burgerContainerEl.push(createNewRow(burgers[i]));
    } else {
      devouredContainerEl.push(createDevouredRow(burgers[i]));
    }
  }
}

//makes a new burger row
function createNewRow(burger) {
  let newBurgerLi = $("<li class='row justify-content-between px-3 my-2'>");

  let burgerItem = $("<p class='burger-item text-center'>").text(burger.id + ". " + burger.name);
  let devourBtn = $("<button type='button' class='devour btn btn-sm float-right' data-toggle='modal' data-target='devourModal'>Devour it!</button>");

  // $(devourBtn).data("burger-id", burger.id); Why this line doesnt work??????????
  
  newBurgerLi.append(burgerItem, devourBtn);
  burgerContainerEl.append(newBurgerLi);

  //find() method returns the value of the first element in the provided array ???????????????????
  //that satisfies the provided testing function.
  newBurgerLi.find("button.devour").data("id", burger.id);
  newBurgerLi.data("burger", burger); //what does this mean?????
  newBurgerLi.find("button.devour").click(devourBurger); 

  return newBurgerLi;
}

function createDevouredRow(burger) {
  let devouredBurgerLi = $("<li class='row devour-row justify-content-between px-3 my-2'>");
  let devouredBurgerItem = $("<p class='devour-burger text-center'>").text(burger.id + ". " + burger.name);
  let deleteBtn = $("<button type='button' class='delete btn btn-sm float-right'>Delete</button>");

  $(deleteBtn).data("burger-id", burger.id); //helped by jason

  devouredBurgerLi.append(devouredBurgerItem, deleteBtn);
  devouredContainerEl.append(devouredBurgerLi);

  return devouredBurgerLi;
}

//add a new burger into database then update the view
function addBurger(event) {
  event.preventDefault();

  let burger = {
    name: newBurgerEl.val().trim(),
    devour: false
  };
  $.ajax({
    method: "POST",
    url: "/api/burgers", //-----what is burgers?????????
    data: burger
  }).then(getBurgers);

  // $.post("/api/burgers", burger, getBurgers); ----simpler ajax call?
  newBurgerEl.val(""); //set input empty
}

//UPDATE a burger to 'devour: true' when clicking the devour button
function devourBurger(event) {
  event.stopPropagation();
  console.log("devourBurger fired");
  let id = $(this).data("id"); //what does this mean?
  console.log(id);
  $.ajax({
    method: "PUT",
    url: "/api/burgers/" + id,
    data: { devoured: true }
  }).then(getBurgers);
}

function deleteDevoured(event){
  event.stopPropagation(); //won't affect the parent element

  let id = $(this).data("burger-id"); //what's data?

  $.ajax({
    method: "DELETE",
    url: "/api/burgers/" + id,
  }).then(getBurgers);
}


// let burgerItem = [
  //   burger.id,
  //   ". ",
  //   "<span>",
  //   burger.name,
  //   "</span>",
  //   "<input type='text' style='display: none;'>"
  // ].join("");
  // newBurgerLi.append(burgerItem, devourBtn);
  // devouredBurgerRow.data("burger", burger);

  // .data( key, value )
  // https://api.jquery.com/data/
  

