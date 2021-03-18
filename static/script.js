import Interactive from "https://vectorjs.org/interactive.js";

// Construct an interactive within the HTML element with the id "my-interactive"
let interactive = new Interactive("my-interactive");
interactive.border = true;

interactive.width = 500;
interactive.height = 500;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.height / 2;
interactive.border = true;

let unit = 20;

let xaxis = interactive.line(-interactive.originX, 0, interactive.width - interactive.originX, 0);
let yaxis = interactive.line(0, -interactive.originY, 0, interactive.height - interactive.originY);

let control1 = interactive.control(-5 * unit, 0);
let control2 = interactive.control(5 * unit, 0);
let control3 = interactive.control(0,-Math.sqrt(Math.pow((control2.x - control1.x), 2)) / 2);

/*
let semicircle = interactive.path('');

//update semicircle when controls update
semicircle.addDependency(control1);
semicircle.addDependency(control2);
semicircle.addDependency(control3);

semicircle.update = function () {
    semicircle.d = 
    `M  ${control1.x} ${control1.y}
    A 1 1 0 0 1 ${control2.x} ${control2.y}
    `
}
semicircle.classList.add('default');
semicircle.update();

control3.constrain(semicircle);
*/
control1.constrainToX(0,0);
control2.constrainToX(0,0);

let circle = interactive.circle(-50,0,60);
circle.addDependency(control1);
circle.addDependency(control2);

circle.update = function () {
    circle.cx = (control2.x + control1.x) / 2;
    circle.cy = 0;
    circle.r = Math.sqrt(Math.pow((control2.x - control1.x), 2)) / 2;
};

circle.classList.add('default');
circle.update();

control3.constrainTo(circle);

control3.addDependency(control1);
control3.addDependency(control2);

control3.update = function () {
    control3.x = circle.cx;
    control3.y = -Math.sqrt(Math.pow((control2.x - control1.x), 2)) / 2;
}


var line1 = interactive.line(control3.x, control3.y, control1.x, control1.y);
var line2 = interactive.line(control3.x, control3.y, control2.x, control2.y);

line1.addDependency(control1);
line1.addDependency(control3);
line2.addDependency(control2);
line2.addDependency(control3);

line1.update = function () {
    line1.x1 = control3.x;
    line1.y1 = control3.y;
    line1.x2 = control1.x;
    line1.y2 = control1.y;
}

line2.update = function () {
    line2.x1 = control3.x;
    line2.y1 = control3.y;
    line2.x2 = control2.x;
    line2.y2 = control2.y;
}
