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
        
    }
}

var cities:City[] = new Array<City>();

for (let index = 0; index < numberOfCities; index++) {
    cities.push(new City(getRandomInt(0, canvas.width-10), getRandomInt(0, canvas.height-10)))
}

for (let index = 0; index < numberOfCities; index++) {
    cities[index].cityOne = cities[getRandomInt(0,cities.length)];

    var temp = getRandomInt(0,cities.length);
    while (cities[index].cityOne !== cities[temp]){
        temp = getRandomInt(0,cities.length);
    }
    cities[index].cityTwo = cities[temp];
    
}

console.log(cities.length);


function MainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(MainLoop.bind(this));

    cities.forEach(element => {
        element.Draw();
    });


}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

MainLoop();
