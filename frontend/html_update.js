
class HtmlUpdate{
  constructor(game){
    this.game = game;
    this.info = document.createElement('div');
    this.setup(game);
  }

  setup(game){
    let diff = game.difficulty;
    this.info.id = 'info';
    this.moveHeader = document.createElement('h2');
    this.moveText = document.createTextNode(game.movesMade + '/' + game.totalMoves + ' moves left');
    this.moveHeader.id='moveHeader';
    this.body = document.getElementsByTagName('body')[0];
    this.body.appendChild(this.info);
    this.info.appendChild(this.moveHeader);
    this.moveHeader.appendChild(this.moveText);

    // colors
    this.colors = game.colorsDown;
    this.colorHeader = document.createElement('div');
    this.colorHeader.id = 'colorHeader';
    let colorP;
    Object.keys(this.colors).forEach(color =>{
      colorP = document.createTextNode(color+': '+this.colors[color]+'/'+game.count);
      this.colorHeader.appendChild(colorP);
      this.colorHeader.appendChild(document.createElement('br'));
    });
    this.body.appendChild(this.colorHeader);
  }

  update(){
    document.getElementById('moveHeader').innerHTML = this.game.movesMade + '/' + this.game.totalMoves + ' moves left';
    let colorP;
    let colorHeader = document.getElementById('colorHeader');
    colorHeader.innerHTML='';
    Object.keys(this.colors).forEach(color =>{
      colorP = document.createTextNode(color+': '+this.colors[color]+'/'+this.game.count);
      colorHeader.appendChild(colorP);
      colorHeader.appendChild(document.createElement('br'));
    });
  }

  displayWin(){
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML = 'You Win!';
  }

  displayLose(){
    let h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML = 'You Lose!';
  }
}

module.exports = HtmlUpdate;
