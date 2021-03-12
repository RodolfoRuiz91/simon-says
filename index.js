const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnStart = document.getElementById("btnStart");
const LAST_LEVEL = 10;

class Game {
  constructor() {
    this.Initialize();
    this.GenerateSequence();
      setTimeout(() => {
        this.NextLevel();
      }, 500);
  }

  Initialize() {
    this.PickColor = this.PickColor.bind(this);
    this.ToogleBtnStart();
    this.level = 1;
    this.colors = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  ToogleBtnStart(){
      if(btnStart.classList.contains('hide')){
        btnStart.classList.remove("hide");
      }
      else{
        btnStart.classList.add("hide");
      }
  }

  GenerateSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  NextLevel() {
    this.subLevel = 0;
    this.IlluminateSequence();
    this.AddClickEvents();
  }

  NumberToColor(number) {
    switch (number) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  ColorToNumber(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  IlluminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.NumberToColor(this.sequence[i]);
      setTimeout(() => this.IlluminateColor(color), 1000 * i);
    }
  }

  IlluminateColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.TurnOffColor(color), 350);
  }

  TurnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  AddClickEvents() {
    this.colors.celeste.addEventListener("click", this.PickColor);
    this.colors.violeta.addEventListener("click", this.PickColor);
    this.colors.naranja.addEventListener("click", this.PickColor);
    this.colors.verde.addEventListener("click", this.PickColor);
  }

  RemoveClickEvents(){
    this.colors.celeste.removeEventListener("click", this.PickColor);
    this.colors.violeta.removeEventListener("click", this.PickColor);
    this.colors.naranja.removeEventListener("click", this.PickColor);
    this.colors.verde.removeEventListener("click", this.PickColor);
  }

  PickColor(event) {
    const colorName = event.target.dataset.color;
    const colorNumber = this.ColorToNumber(colorName);
    this.IlluminateColor(colorName);

    if(colorNumber === this.sequence[this.subLevel]){
        this.subLevel++;
        if(this.subLevel === this.level) {
            this.level++;
            this.RemoveClickEvents();
            if(this.level === (LAST_LEVEL+1)){
                // Win
                this.WinGame();
            }
            else {
                setTimeout(() => this.NextLevel(), 1500);
            }
        }
    }
    else {
        // Lose
        this.LoseGame();
    }
  }

  WinGame(){
      swal('Simon Says','You Win!!!', 'success')
      .then(() => this.Initialize());
  }

  LoseGame(){
    swal('Simon Says','You Lose!!!', 'error')
    .then(() => {
        this.RemoveClickEvents();
        this.Initialize();
    });
}
}

function StartGame() {
  window.game = new Game();
}
