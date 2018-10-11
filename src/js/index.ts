var numberOfCities: Number = Number((<HTMLInputElement>document.getElementById("citiesInput")).value);
var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mainCanvas");
var context: CanvasRenderingContext2D = canvas.getContext("2d");
var totalLength: number = 0;
document.getElementById("startButton").addEventListener("click", () => MainLoop());

canvas.width = 800;
canvas.height = 800;

class City{
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    public x:number = 0;
    public y:number = 0;
    
    //->
    public nextCity:City = null;

    Draw() {
        context.fillRect(this.x,this.y,5,5)
    }

    DrawLines() {
        context.beginPath();
        context.moveTo(this.x+3,this.y+3);
        context.lineTo(this.nextCity.x+3, this.nextCity.y+3);
        context.stroke();
    }
}

var cities:City[] = new Array<City>();

for (let index = 0; index < numberOfCities; index++) {
    cities.push(new City(getRandomInt(0, canvas.width-20), getRandomInt(0, canvas.height-20)))
}

function GenerateRandomPath(){
    for (let index = 0; index < numberOfCities; index++) {
        if (index == 0){
            cities[index].nextCity = cities[index+1];
        }
        else if (index == cities.length-1){
            cities[index].nextCity = cities[0];
        }
        else{
            cities[index].nextCity = cities[index+1];
        }
    } 
}

GenerateRandomPath();
totalLength = getDistance();

console.log(cities.length);


function MainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(MainLoop.bind(this));

    cities.forEach(element => {
        context.fillStyle = "gray";
        element.Draw();
        context.fillStyle = "black";
        element.DrawLines();
    });

    context.font = "18px Roboto";
    context.fillStyle = "white";
    context.fillText("Total length: " + totalLength, 0, canvas.height-5);
    context.fillStyle = "black";

    TryShuffle();
    totalLength = getDistance();


}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getDistance():number{
    var total = 0;
    for (let index = 0; index < numberOfCities; index++) {
        var city = cities[index];
        
        var a = city.x - city.nextCity.x;
        var b = city.y - city.nextCity.y;
        var c = Math.sqrt( a*a + b*b );

        total += c;
    }
    return total;
}

//Tries swapping two cities' nextCity. If path becomes shorter, continue. Otherwise, flip back.
function TryShuffle(){
    var rand1 = getRandomInt(0, cities.length-1);
    var rand2 = getRandomInt(0, cities.length-1);
    while (rand1 == rand2){
        rand2 = getRandomInt(0, cities.length-1);
    }

    var lengthBeforeShuffle = getDistance();

    var temp:City = new City(cities[rand1].x, cities[rand1].y);
    cities[rand1].x = cities[rand2].x;
    cities[rand1].y = cities[rand2].y;
    cities[rand2].x = temp.x;
    cities[rand2].y = temp.y;

    var lengthAfterShuffle = getDistance();

    if (lengthAfterShuffle > lengthBeforeShuffle){
        var temp:City = new City(cities[rand1].x, cities[rand1].y);
        cities[rand1].x = cities[rand2].x;
        cities[rand1].y = cities[rand2].y;
        cities[rand2].x = temp.x;
        cities[rand2].y = temp.y;
    }
    
}

