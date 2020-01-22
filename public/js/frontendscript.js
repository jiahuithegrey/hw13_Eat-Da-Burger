let burgers = [];
let newBurgerEl = $(".newBurger");
let burgerContainerEl = $(".burgerContainer");

//add event listeners for getting, deleting and editing burgers
$("#submit-btn").on("click", addBurger);
$("#devour-btn").on("click", devourBurger);

getBurgers();

// resets the burgers displayed with new burgers from the database
function initializeRows(){
    burgerContainerEl.empty();
    let rowsToAdd = [];
    for (let i=0; i<burgers.length; i++){
        rowsToAdd.push(createNewRow(burgers[i]));
    }
    burgerContainerEl.prepend(rowsToAdd);
}
//get burgers from the database and updates the view
function getBurgers(){
    $.get("/api/burgers",function(data){
        burgers = data;
        initializeRows();
    });
}
//delete a burger when clicking the devour button
function devourBurger(event){
    event.stopPropagation();
    let id = $(this).data("id"); //what does this mean?
    $.ajax({
        method:"DELETE",
        url: "/api/burgers/" + id
    }).then(getBurgers);
}
//makes a burger-item row
function createNewRow(burger){
    let newBurgerRow = $(
        [
        "<li class='list-group-item burger-item'>",
            "<span>",
            burger.name,
            "</span>",
            "<input type='text' style='display: none;'>",
            "<button class='delete btn btn-danger'>Devour!</button>",
            "</li>"
        ].join("")
    );
    newBurgerRow.find("#devour-btn").data("id", burger.id);
    newBurgerRow.data("burger",burger);
    if (burger.complete) {
        newBurgerRow.find("span").css("text-decoration", "line-through");
      }
      return newBurgerRow;
}
//add a new burger into database then update the view
function addBurger(event){
    event.preventDefault();
    let burger = {
      name: newBurgerEl.val().trim(),
      devour: false
    };

    $.post("/api/burgers", burger, getburgers);
    newBurgerEl.val("");
  }
