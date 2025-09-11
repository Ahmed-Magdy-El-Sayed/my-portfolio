const myName = document.querySelector(".landing-page .left-content .name");
const job = document.querySelector(".landing-page .left-content .job");
const links = document.querySelector(".landing-page .left-content .contact-links");
const frontSkills = document.querySelector(".landing-page .right-content .front");
const backSkills = document.querySelector(".landing-page .right-content .back");
const loader = document.querySelector(".loader");

window.onload= ()=>{
    loader.style.display = "none";
    myName.style = job.style = links.style = "transform: translateX(0)";
    frontSkills.style = "transform: scale(1); opacity: 1;";
    backSkills.style = "left: 0; opacity: 1;";
    [...document.querySelectorAll(".project .active")].forEach((ele) => {
        ele.parentElement.style.height = ele.height+"px";
        ele.onload = null;
    })
};
window.onresize = ()=>{
    if(window.innerWidth > 700){
        navMenu.classList.remove("open");
    }
    setTimeout(()=>{
        [...document.querySelectorAll(".project .active")].forEach((ele) => {
            ele.parentElement.style.height = ele.height+"px";
        })
    }, 1000)
}

const leftBtn = document.querySelector(".move-left");
const rightBtn = document.querySelector(".move-right");
const topBtn = document.querySelector(".move-top");
const bottomBtn = document.querySelector(".move-bottom");
const cube = document.querySelector(".cube");

const navMenu = document.querySelector(".nav-menu");
const navBtn = document.querySelector(".nav-menu span");

let YDeg = 0;
let XDeg = 0;
rightBtn.onclick = leftBtn.onclick = e => {
    XDeg = 0;
    const change = e.currentTarget.className === "move move-right" ? -90 : 90;
    
    cube.style.transform = `scale(0.5) rotateY(${YDeg}deg)`;
    
    if((YDeg === 270 && change > 0) || (YDeg === -270 && change < 0)) YDeg = 0;
    else YDeg += change;

    navMenu.querySelector(".active").classList.remove("active");
    if(YDeg === -90 || YDeg === 270)
        navMenu.querySelector(".right").classList.add("active");
    else if(Math.abs(YDeg) === 180)
        navMenu.querySelector(".back").classList.add("active");
    else if(YDeg === 90 || YDeg === -270)
        navMenu.querySelector(".left").classList.add("active");
    else
        navMenu.querySelector(".front").classList.add("active");

    setTimeout(() => {
        cube.style.transform = `scale(0.5) rotateY(${YDeg}deg)`
    }, 500);
    setTimeout(() => {
        cube.style.transform = `rotateY(${YDeg}deg)`
    }, 1000)
}
topBtn.onclick = bottomBtn.onclick = e => {
    YDeg = 0;

    const change = e.currentTarget.className === "move move-top" ? -90 : 90;
    
    cube.style.transform = `scale(0.5) rotateX(${XDeg}deg)`;
    
    if((XDeg === 270 && change > 0) || (XDeg === -270 && change < 0)) XDeg = 0;
    else XDeg += change;
    
    navMenu.querySelector(".active").classList.remove("active");
    if(XDeg === -90 || XDeg === 270)
        navMenu.querySelector(".top").classList.add("active");
    else if(Math.abs(XDeg) === 180)
        navMenu.querySelector(".bottom").classList.add("active");
    else if(XDeg === 90 || XDeg === -270)
        navMenu.querySelector(".bottom").classList.add("active");
    else
        navMenu.querySelector(".front").classList.add("active");

    setTimeout(() => {
        cube.style.transform = `scale(0.5) rotateX(${XDeg}deg)`
    }, 500);
    setTimeout(() => {
        cube.style.transform = `rotateX(${XDeg}deg)`
    }, 1000)
}

let touchStart = [0,0];
document.body.ontouchstart = e=>{touchStart = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]}
document.body.ontouchend = e=>{
    const moveX = e.changedTouches[0].clientX -touchStart[0];
    const moveXAbs = Math.abs(moveX);

    const moveY = e.changedTouches[0].clientY -touchStart[1];
    const moveYAbs = Math.abs(moveY);

    if (moveXAbs < window.innerWidth/2 && moveYAbs < window.innerHeight/2) return null 
    moveXAbs > moveYAbs?
        moveX > 0? leftBtn.click() : rightBtn.click()
    :   moveY > 0? topBtn.click() : bottomBtn.click()
};

const navBtns = document.querySelectorAll(".nav-menu span");
[...navBtns].forEach(btn=>{
    btn.onclick = ()=>{
        if(btn.classList.contains("active")) return null;

        if(btn.className === "front"){
            YDeg=-90;
            leftBtn.click();
        }else if(btn.className === "left"){
            YDeg=0;
            leftBtn.click();
        }else if(btn.className === "back"){
            YDeg=-90;
            rightBtn.click();
        }else if(btn.className === "right"){
            YDeg=0;
            rightBtn.click();
        }else if(btn.className === "top"){
            XDeg=0;
            topBtn.click();
        }else{
            XDeg=0;
            bottomBtn.click();
        }
        navMenu.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
    }
})
const navIcon = document.querySelector(".nav .nav-icon");
navIcon.onclick = ()=>{
    navMenu.classList.toggle("open");
}

let that;
const certificates = document.querySelectorAll(".certificates-grid img")
const closeBtn = document.querySelector(".certificates .close");

closeBtn.onclick = ()=>{
    that.classList.remove("img-click", "clicked");
    that.parentElement.style.opacity = 0;
    closeBtn.style.display = null;
    setTimeout(()=>{
        that.parentElement.style.opacity = null;
    },300)
}

for (let i = 0; i < certificates.length; i++) {
    certificates[i].addEventListener("click", function() {
        that = this;
        this.parentElement.style.opacity = 0;
        setTimeout(()=>{
            this.classList.add("clicked", "img-click");
            closeBtn.style.display = "block";
            this.parentElement.style.opacity = 1;
        },300)
    });
}

const projectImgs = document.querySelectorAll(".project img");

for (let i = 0; i < projectImgs.length; i++) {
    projectImgs[i].addEventListener("click", function() {
        [...projectImgs[i].parentElement.children].forEach((ele) => {
            ele.classList.remove("active");
        });
        projectImgs[i].classList.add("active");
        setTimeout(() => {
            projectImgs[i].parentElement.style.height = projectImgs[i].height+"px";
        },1000);
    });
}
// handle touch scrolling manually
const scrollContainer = [document.querySelector('.certificates-grid'), document.querySelector('.projects-container')];
let isDragging = false;
let prevY;
scrollContainer.forEach(container => {
    container.ontouchstart = (e) => {
        isDragging = true;
        prevY = e.touches[0].clientY;
    };

    container.ontouchmove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const deltaY = prevY - e.touches[0].clientY;
        prevY = e.touches[0].clientY;

        e.currentTarget.scrollTop += deltaY;
    };

    container.ontouchend = () => {
        isDragging = false;
    };
})