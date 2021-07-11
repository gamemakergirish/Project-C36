var dog,sadDog,happyDog;
var feed,addFood;
var foodObj; 

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodStocks);  
}

function draw() {
  background(46,139,87);
  //foodObj.display();
  
  FeedTime = database.ref('feedTime')
  FeedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,255);
  textSize(15);
  if(lastFed>=12){
   text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
   }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodStockS = data.val();
  foodObj.updatefood(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFood()<=0){
    foodObj.updateFood(foodObj.getFood()*0);
  }else{
    foodObj.updateFood(foodObj.getFood()-1);
  }
  database.ref('/').update({
    food : foodObj.getFood(),
    feedTime : hour()
  })
}

//function to add food in stock
function addFoodStocks(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
