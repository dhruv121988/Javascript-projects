let timer=document.querySelector('.timer');
let playbtn=document.querySelector('.play');
let stpbtn=document.querySelector('.stop');
let resbtn=document.querySelector('.res');

let msec= 0;
let sec= 0;
let min= 0;

let timerId=null;



playbtn.addEventListener('click',function(){
    if (timerId!==null) return ;
    timerId=setInterval(startTimer,10);
});
stpbtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerId = null;
});

resbtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerId = null;
    msec = sec = min = 0;
    timer.innerHTML = "00:00:00";
});

function startTimer(){
    msec++;
    if(msec==100){
        msec=0;
        sec++;
        if(sec==60){
            sec=0;
            min++;
        }
    }


     timer.textContent =
        `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}:${String(msec).padStart(2,"0")}`;



}