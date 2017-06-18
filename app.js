const topic = {
    title: "Geometry"
};

const subtopics = [
    {index: 1, title: "Triangles", completed: true},
    {index: 2, title: "Angle Sum", completed: true},
    {index: 3, title: "Similar Triangles", completed: true},
    {index: 4, title: "Congruence", completed: false},
    {index: 5, title: "Enlargements", completed: false},
    {index: 6, title: "Parallel Lines", completed: false},
    {index: 7, title: "Pythagoras Theorem", completed: false},
    {index: 8, title: "Revision", completed: false},
    {index: 9, title: "Topic Test", completed: false}
];

let taskMover = document.getElementById("taskMover")
let mainTaskPanel = document.getElementById('mainTaskPanel');
let circlePanel = document.getElementById('circlePanel');
let circleMover = document.getElementById('circleMover');
let btnPre = document.getElementById('btnPre');
let btnNxt = document.getElementById('btnNxt');

let params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
//get css
let getCss = function (o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};


let startDrag = function (bar, target, callback) {
    if (getCss(target, "left") !== "auto") {
        params.left = getCss(target, "left");
    }
    if (getCss(target, "top") !== "auto") {
        params.top = getCss(target, "top");
    }

    bar.onmousedown = function (event) {
        params.flag = true;
        if (!event) {
            event = window.event;
            //provent select on IE
            bar.onselectstart = function () {
                return false;
            }
        }
        let e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;

    };

    document.onmouseup = function () {
        params.flag = false;
        // console.log(params);
        if (getCss(target, "left") !== "auto") {
            params.left = getCss(target, "left");
        }
        if (getCss(target, "top") !== "auto") {
            params.top = getCss(target, "top");
        }
    };
    document.onmousemove = function (event) {
        let e = event ? event : window.event;
        if (params.flag) {
            let nowX = e.clientX,
                nowY = e.clientY;
            let disX = nowX - params.currentX,
                disY = nowY - params.currentY;
            let acturalDit = parseInt(params.left) + disX + 0 + "px";
            target.style.left = parseInt(params.left) + disX + 0 + "px";

            let targetLeftVal = target.getBoundingClientRect().left
            let elWidth = target.scrollWidth
            switch (true) {
                //TODO: number need to dymanic, smoothing the drag
                case (targetLeftVal < (-elWidth + 200)):
                    target.style.left = -elWidth + 500 + "px";
                    break;
                case (targetLeftVal > 500):
                    target.style.left = 30 + "px";
                    break;
            }
        }
        if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
        }
    }
};

function btnMover ($target, $btnPre, $btnNxt) {

    $btnPre.on('click', function () {
        currentX = $target.css('left');
        if (parseInt(currentX) > 25) {
            $target.animate({"left": "30px"}, "fast");
        } else {
            $target.animate({"left": "+=70px"}, "");
        }
    });

    $btnNxt.on('click', function () {
        currentX = $target.css('left');
        if (parseInt(currentX) < -320) {
            $target.animate({"left": "-330"}, "fast");
        } else {
            $target.animate({"left": "-=70px"}, "");
        }
    });
}


for (var i = 0; i < subtopics.length; i++) {

    var circle = document.createElement("LI");
    var task = document.createElement("LI");
    var btn = document.createElement("BUTTON");
    var img = document.createElement("IMG");
    var text = document.createElement("DIV");
    circle.className = "circle";
    circle.innerHTML = i + 1;
    task.className = "task";
    img.className = "task_img";
    img.src = 'https://cdn.rawgit.com/Donnzh/ed39339463ff6ecbc696b6f6790c5be2/raw/16615cb153fd4fb10b5c5135e930c359683a7bbc/svgTick.svg';
    if (subtopics[i].completed) {
        img.style.visibility = 'visible';
        circle.setAttribute("id", "active");
        img.setAttribute("completed", true);

    } else {
        circle.setAttribute("id", ("c" + i));
        img.setAttribute("completed", false);

    }

    btn.className = "task_btn";
    btn.setAttribute("ref", i);
    btn.innerHTML = 'Let\'s Go';
    btn.addEventListener('click', taskBtnClick);

    text.className = "task_text";
    text.innerHTML = `${subtopics[i].index}. ${subtopics[i].title}`;
    task.appendChild(text);
    task.appendChild(btn);
    task.appendChild(img);

    circleMover.appendChild(circle);
    taskMover.appendChild(task);

    circle.setAttribute("ref", i);
    circle.addEventListener('click', function (e) {

        //TODO Change the attribute number to variable
        let ref = e.target.attributes[2].value;
        var singleTaskWidth = task.scrollWidth + 2 + 30;
        pointedPosition = ref * singleTaskWidth;
        pointedPosition = pointedPosition + singleTaskWidth / 2;
        let aimPostion = (mainTaskPanel.scrollWidth - 20) / 2;
        let acturalMove = (aimPostion - pointedPosition) + "px";
        // jQuery for animation...
        $("#taskMover").animate({"left": acturalMove}, "");
    })

}
;

function taskBtnClick () {
    let flag = this.nextSibling.getAttribute("completed");
    if (flag === "false") {
        subtopics[this.getAttribute("ref")].completed = true;
        this.nextSibling.style.visibility = 'visible';
        this.nextSibling.setAttribute("completed", true);
        let circleId = `c${this.getAttribute("ref")}`;
        document.getElementById(circleId).setAttribute("id", "active");
    }
    else if (flag) {
        subtopics[this.getAttribute("ref")].completed = false;
        this.nextSibling.style.visibility = 'hidden';
        this.nextSibling.setAttribute("completed", false);
        let circles = document.getElementsByClassName("circle");
        circles[this.getAttribute("ref")].setAttribute("id", `c${this.getAttribute("ref")}`)
    }
}


startDrag(mainTaskPanel, taskMover)

btnMover($("#circleMover"), $("#btnPre"), $("#btnNxt"))

responsiveHeight()

function responsiveHeight () {
    mainTaskPanel.style.height = window.innerHeight - 120 - 58 + "px";
};

document.getElementById('title').innerHTML = topic.title;

window.onresize = function (event) {
    responsiveHeight()
};
