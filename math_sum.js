'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      score_bad: 0,
      stats: [],
      example: 0,
      answer: 0,
      value: 0,
    };
    //if (Cookies.get('math-stats')) {
    //  this.state.stats = Cookies.get('math-stats');
    //}
    //if (Cookies.get('math-score')) {
    //  this.state.stats = Cookies.get('math-score');
    //}
  }

  // Create board with two random coordinate numbers
  initBoard() {
    let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    this.state.start = new Date();
    this.state.a = Math.floor(Math.random() * 10);
    this.state.b = Math.floor(Math.random() * 10);
    this.state.value = 0;
    this.setState(this.state);
  }

  // Moves board depending on direction and checks for game over
  move(action) {
      let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      if (keys.includes(action)) {
          this.state.value = this.state.value * 10 + parseInt(action);
      } else if (action == '⌫') {
          this.state.value = Math.floor(this.state.value / 10);
      } else if (action == '✔') {
          this.goOn();
      }
    this.setState(this.state);
  }

  goOn() {
    let good = (this.state.value === (this.state.a + this.state.b));
    let now = new Date();
    this.state.score += good;
    this.state.score_bad += (1 - good);
    this.state.stats.push([good, this.state.a, this.state.b, now, (now - this.state.start) / 1000]);
    this.initBoard();
  }

  componentWillMount() {
    this.initBoard();
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      this.move((e.keyCode - 48).toString());
    }
    if (e.keyCode >= 96 && e.keyCode <= 105) {
      this.move((e.keyCode - 96).toString());
    }
    if (e.keyCode === 8) {
      this.move('⌫');
    }
    if (e.keyCode === 13) {
      this.move('✔');
    }
  }

  render() {
    return (
      <div>
        <div className="score">Правильно: {this.state.score} Неравильно: {this.state.score_bad}</div>

        <p>{this.state.stats.slice(-4).map((stats, i) => (<Row key={i} stats={stats} />))}</p>
        <p>{this.state.a} + {this.state.b} ?= {this.state.value}</p>
        <p>&nbsp;</p>

        <div className="buttons">
          <div className="button" onClick={() => {this.move('1')}}>1</div>
          <div className="button" onClick={() => {this.move('2')}}>2</div>
          <div className="button" onClick={() => {this.move('3')}}>3</div>
        </div>
        <div className="buttons">
          <div className="button" onClick={() => {this.move('4')}}>4</div>
          <div className="button" onClick={() => {this.move('5')}}>5</div>
          <div className="button" onClick={() => {this.move('6')}}>6</div>
        </div>
        <div className="buttons">
          <div className="button" onClick={() => {this.move('7')}}>7</div>
          <div className="button" onClick={() => {this.move('8')}}>8</div>
          <div className="button" onClick={() => {this.move('9')}}>9</div>
        </div>
        <div className="buttons">
          <div className="button" onClick={() => {this.move('⌫')}}>⌫</div>
          <div className="button" onClick={() => {this.move('0')}}>0</div>
          <div className="button" onClick={() => {this.move('✔')}}>✔</div>
        </div>
      </div>
    );
  }
};

const Row = ({ stats }) => {
  let a, b, good, from, lat;
  [good, a, b, from, lat] = stats;
  let hl_answer = good ? "color-1024" : "color-256";
  let hl_lat = lat < 5 ? "color-1024" : "color-256";
  return (
    <p>
      <span className={hl_answer}> {a} + {b} = {a + b}</span>&nbsp;
      <span className={hl_lat}> {lat} </span>
    </p>
  )
};


// 🎂
// 🍰
// 🍭
// 🍬
ReactDOM.render(<App />, document.getElementById('main'));