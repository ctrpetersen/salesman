var numberOfCities: Number = Number((<HTMLInputElement>document.getElementById("citiesInput")).value);
var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("randomCanvas");
var iterativeCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("iterativeCanvas");
var context: CanvasRenderingContext2D = canvas.getContext("2d");
var iterativeContext: CanvasRenderingContext2D = iterativeCanvas.getContext("2d");
var totalLength: number = 0;
var totalLengthIterative: number = 0;
var hasClickedStart = false;
var totalLoops = 0;
var cities: City[] = new Array<City>();
var citiesIterative: City[] = new Array<City>();

document.getElementById("startButton").addEventListener("click", () => clickStart());


function clickStart(){
    hasClickedStart = true;
    numberOfCities = Number((<HTMLInputElement>document.getElementById("citiesInput")).value);

    for (let index = 0; index < numberOfCities; index++) {
        var x = getRandomInt(0, canvas.width - 20);
        var y = getRandomInt(0, canvas.height - 20);
        cities.push(new City(x,y));
        citiesIterative.push(new City(x, y));
    }

    GenerateRandomPath();
    totalLength = getDistance(cities);
    totalLengthIterative = getDistance(citiesIterative);
}

canvas.width = 800;
canvas.height = 800;
iterativeCanvas.width = 800;
iterativeCanvas.height = 800;

class City {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public x: number = 0;
    public y: number = 0;

    //->
    public nextCity: City = null;

}

function GenerateRandomPath() {
    for (let index = 0; index < numberOfCities; index++) {
        if (index == 0) {
            cities[index].nextCity = cities[index + 1];
            citiesIterative[index].nextCity = citiesIterative[index + 1];
        }
        else if (index == cities.length - 1) {
            cities[index].nextCity = cities[0];
            citiesIterative[index].nextCity = citiesIterative[0];
        }
        else {
            cities[index].nextCity = cities[index + 1];
            citiesIterative[index].nextCity = citiesIterative[index + 1];
        }
    }
}

function MainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    iterativeContext.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(MainLoop.bind(this));

    
    cities.forEach(element => {
        context.fillStyle = "gray";
        context.fillRect(element.x, element.y, 5, 5)
        context.beginPath();
        context.moveTo(element.x + 3, element.y + 3);
        context.lineTo(element.nextCity.x + 3, element.nextCity.y + 3);
        context.stroke();

    });
    citiesIterative.forEach(cityI => {
        iterativeContext.fillStyle = "gray";
        iterativeContext.fillRect(cityI.x, cityI.y, 5, 5)
        iterativeContext.beginPath();
        iterativeContext.moveTo(cityI.x + 3, cityI.y + 3);
        iterativeContext.lineTo(cityI.nextCity.x + 3, cityI.nextCity.y + 3);
        iterativeContext.stroke();
    });

    context.font = "18px Roboto";
    context.fillStyle = "white";
    context.fillText("Random - Total length: " + totalLength, 0, canvas.height - 5);

    iterativeContext.font = "18px Roboto";
    iterativeContext.fillStyle = "white";
    iterativeContext.fillText("Iterative - Total length: " + totalLengthIterative, 0, canvas.height - 5);

    if (!hasClickedStart) {return;}
    TryShuffle(cities);
    IterativeShuffle(citiesIterative);
    totalLength = getDistance(cities);
    totalLengthIterative = getDistance(citiesIterative);

}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getDistance(cityArr:City[]): number {
    var total = 0;
    for (let index = 0; index < numberOfCities; index++) {
        var city = cityArr[index];

        var a = city.x - city.nextCity.x;
        var b = city.y - city.nextCity.y;
        var c = Math.sqrt(a * a + b * b);

        total += c;
    }
    return total;
}


function TryShuffle(cityArr:City[]) {
    var rand1 = getRandomInt(0, cityArr.length - 1);
    var rand2 = getRandomInt(0, cityArr.length - 1);
    while (rand1 == rand2) {
        rand2 = getRandomInt(0, cityArr.length - 1);
    }

    var lengthBeforeShuffle = getDistance(cityArr);

    var temp: City = new City(cityArr[rand1].x, cityArr[rand1].y);
    cityArr[rand1].x = cities[rand2].x;
    cityArr[rand1].y = cities[rand2].y;
    cityArr[rand2].x = temp.x;
    cityArr[rand2].y = temp.y;

    var lengthAfterShuffle = getDistance(cityArr);

    if (lengthAfterShuffle > lengthBeforeShuffle) {
        var temp: City = new City(cityArr[rand1].x, cityArr[rand1].y);
        cityArr[rand1].x = cityArr[rand2].x;
        cityArr[rand1].y = cityArr[rand2].y;
        cityArr[rand2].x = temp.x;
        cityArr[rand2].y = temp.y;
    }
}

function IterativeShuffle(cityArr:City[]) {
    cityArr.forEach(citySwap => {
        cityArr.forEach(cityToSwap => {
            var lengthBeforeShuffle = getDistance(cityArr);

            var temp: City = new City(citySwap.x, citySwap.y);
            citySwap.x = cityToSwap.x;
            citySwap.y = cityToSwap.y;
            cityToSwap.x = temp.x;
            cityToSwap.y = temp.y;

            var lengthAfterShuffle = getDistance(cityArr);

            if (lengthAfterShuffle > lengthBeforeShuffle) {
                var temp: City = new City(citySwap.x, citySwap.y);
                citySwap.x = cityToSwap.x;
                citySwap.y = cityToSwap.y;
                cityToSwap.x = temp.x;
                cityToSwap.y = temp.y;
            }
        });
    });

}

MainLoop();