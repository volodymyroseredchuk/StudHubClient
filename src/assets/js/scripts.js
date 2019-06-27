function mainPageFunction() {
  class Card{

    constructor(element){
      this.element = element;
      this.elementLocked = false;
      this.delayedClose = false;

      this.init();
    }

    open(){
      this.element.className = "сustom__card is-flipped";
    }

    close(){
      this.element.className = "сustom__card";
    }

    lock(){
      this.elementLocked = true;
    }

    unlock(timeout = null){
      if(timeout){
        setTimeout(()=>{
          this.elementLocked = false;
          this.unlockedEvent();
        }, timeout);
      }else{
        this.elementLocked = false;
        this.unlockedEvent();
      }

    }

    unlockedEvent(){
      if(this.delayedClose){
        this.delayedClose = false;
        this.close();
      }
    }

    isLocked(){
      return this.elementLocked;
    }

    isUnLocked(){
      return !this.isLocked();
    }

    init(){
      var thus = this;

      this.element.addEventListener("mouseover",()=>{
        if(thus.isUnLocked()){
          thus.open();
          thus.lock();
          thus.unlock(1000);
        }else{
          thus.delayedClose = false;
        }
      });

      this.element.addEventListener("mouseleave",()=>{
        if(thus.isUnLocked()){
          thus.close();
        }else{
          thus.delayedClose = true;
        }
      });
    }
  }

var card = document.querySelectorAll('.сustom__card');

for(var i = 0; i< card.length;i++){
  new Card(card[i]);
}
}
