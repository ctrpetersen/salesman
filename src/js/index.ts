var numberOfCities: Number = Number((<HTMLInputElement>document.getElementById("citiesInput")).value);
var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mainCanvas");
var context: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

class City{
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    public x:number = 0;
    public y:number = 0;
    
    public cityOne:City = null;
    public cityTwo:City = null;

    Draw() {
        context.fillRect(this.x,this.y,5,5)
    }

    DrawLines() {
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.cityOne.x, this.cityOne.y);
        context.stroke();
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.cityTwo.x, this.cityTwo.y);
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
            cities[index].cityOne = cities[index+1];
            cities[index].cityTwo = cities[49]
        }
        else if (index == cities.length-1){
            cities[index].cityOne = cities[0];
            cities[index].cityTwo = cities[index-1];
        }
        else{
            cities[index].cityOne = cities[index+1];
            cities[index].cityTwo = cities[index-1];
        }

    } 
}

GenerateRandomPath();

console.log(cities.length);


function MainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(MainLoop.bind(this));

    cities.forEach(element => {
        element.Draw();
        element.DrawLines();
    });


}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

MainLoop();
