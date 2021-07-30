//creating the loop of the pads 
class Drumkit {
    constructor (){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "sounds/kick-classic.wav";
        this.currentSnare = "sounds/kick-classic.wav";
        this.currentHihat = "sounds/kick-classic.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150; //high beats per minute
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
    }
    activePad(){
        // console.log(this); //cu this apesi pe fiecare
        this.classList.toggle('active'); 
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`); //we are looping all over this tree
        //Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation =`playTrack 0.3s alternate ease-in-out 2`;
        //check if pads are active
            if(bar.classList.contains("active")){
             //Check each sound
             if(bar.classList.contains("kick-pad")){
                this.kickAudio.currentTime = 0;
                this.kickAudio.play();
             }
             if(bar.classList.contains("snare-pad")){
                this.snareAudio.currentTime = 0;
                this.snareAudio.play();
             }
             if(bar.classList.contains("hihat-pad")){
                this.hihatAudio.currentTime = 0;
                this.hihatAudio.play();
             }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60 / this.bpm) * 1000;
        //Check if it's playling
        //porneste de la NULL - deci pleaca cu premiza ca nu e adevarata, astfel ruleaza if
        if (this.isPlaying) {
            //clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;    
        } else{
            this.isPlaying = setInterval ( () => {
                this.repeat();
            }, interval);
        }
    }
    updateBtn(){
        //NULL
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) { 
            case "kick-select": 
            this.kickAudio.src = selectionValue;
            break;
            case "snare-select": 
            this.snareAudio.src = selectionValue;
            break;
            case "hihat-select": 
            this.hihatAudio.src = selectionValue;
            break;
        }   
    }
}

const drumKit = new Drumkit();

//Add Event Listeners

drumKit.pads.forEach(pad =>{
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation ="";
    });
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.updateBtn();
    drumKit.start();
}); // added to a call back 
    
drumKit.selects.forEach(select => {
    select.addEventListener("change", function(e){
        drumKit.changeSound(e);
    });
});