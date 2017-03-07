import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import SVGElement from '../../saveImg/svg_todataurl.js'; // eslint-disable-line no-unused-vars
import ActionBtn from '../../ActionBtn/ActionBtn.js';
import logoUrl from '../../HeaderChart/logo.svg';
import { Link } from 'react-router';
import Modal from 'react-modal';

const customStyles = {
  content: {
    position: 'absolute',
      top: 0,
      left: 'auto',
      right: 0,
      bottom: 'auto',
      border: 'none',
      background: 'rgba(251,76,78,1)',
      color: '#F9F7FB',
      overflow: 'auto',
      borderRadius: 0,
      outline: 'none',
      padding: '30px',
      marginRight: 'auto',
      transform: 'none',
      width: '100%',
      maxWidth: '300px',
      height: '100%',
  },
  overlay: {
    backgroundColor: 'transparent',
    overflow: 'auto',
    zIndex: 3,
  },
};

export default class LineChartFive extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Cat1Box1: 1,
      Cat1Box2: 2,
      Cat1Box3: 4,
      Cat1Box4: 7,
      Cat1Box5: 5,
      Cat2Box1: 3,
      Cat2Box2: 1,
      Cat2Box3: 0,
      Cat2Box4: 8,
      Cat2Box5: 4,
      y1: '2015',
      y2: '2016',
      y3: '2017',
      y4: '2018',
      y5: '2019',
      theDataMin: 0,
      theDataMax: 8,
      categoryOne: 'Bikes',
      categoryTwo: 'Skateboards',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  doButterfly() {

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "#fromcanvas { display: block !important; }";
    document.body.appendChild(css);
    document.querySelector('svg.recharts-surface').id = 'svg';

    var svg = document.getElementById("svg");
    var img = document.getElementById("fromcanvas");

    svg.toDataURL("image/png", {
      callback: function(data) {
        img.setAttribute("src", data);
      }
    })
  }
  openModal() {
    this.setState({modalIsOpen: true});
    document.body.style.overflow = 'hidden';
  }
  afterOpenModal() {}
  closeModal() {
    this.setState({modalIsOpen: false});
    document.body.style.overflow = 'auto';
  }

  render() {

    var DataMin = this.state.theDataMin;
    var DataMax = this.state.theDataMax;

    let data = [
      {name: this.state.y1, uv: this.state.Cat2Box1, pv: this.state.Cat1Box1},
      {name: this.state.y2, uv: this.state.Cat2Box2, pv: this.state.Cat1Box2},
      {name: this.state.y3, uv: this.state.Cat2Box3, pv: this.state.Cat1Box3},
      {name: this.state.y4, uv: this.state.Cat2Box4, pv: this.state.Cat1Box4},
      {name: this.state.y5, uv: this.state.Cat2Box5, pv: this.state.Cat1Box5},
    ];

    return (
      <div>
        <ActionBtn />
        <div className="chartWrap">
          <Link className="brand" to="/">
            <img src={logoUrl} width="340" height="75" alt="Chart Suite" />
          </Link>

          <button onClick={this.openModal} className="chartSettingsBtn">
            <i className="material-icons settingsIcon">settings</i>
          </button>
          <ResponsiveContainer>
            <LineChart  data={data} width={1600} height={1000}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis type="number" dataKey="1000000000000" domain={[parseInt(DataMin), parseInt(DataMax)]} allowDataOverflow={true} />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="pv" name={this.state.categoryOne} stroke="#8884d8" activeDot={{r: 8}}/>
              <Line type="monotone" dataKey="uv" name={this.state.categoryTwo} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Chart Edit Menu"
        >
          <h2>Chart Settings</h2>
          <button onClick={this.closeModal} className="closeChartSettings">
            <i className="material-icons">close</i>
          </button>

          <span className="chartEditorLabel">Categories</span>
          <input type="text" value={this.state.categoryOne} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'categoryOne')} placeholder="Category One" />
          <input type="text" value={this.state.categoryTwo} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'categoryTwo')} placeholder="Category Two" />
          <span className="chartEditorLabel">Min/Max Y Value</span>
          <input type="text" value={this.state.theDataMin} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'theDataMin')} placeholder="Minimum Y Value"/>
          <input type="text" value={this.state.theDataMax} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'theDataMax')} placeholder="Minimum X Value" />
          <span className="chartEditorLabel">X Values</span>
          <div className="amountWrap">
            <a href="/line/2"><button>2</button></a>
            <a href="/line/3"><button>3</button></a>
            <a href="/line/4"><button>4</button></a>
            <a href="/line/5"><button className="activeXAmount">5</button></a>
            <a href="/line/6"><button>6</button></a>
          </div>

          <input type="text" value={this.state.y1} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'y1')} placeholder="X Value 1"/>
          <input type="text" value={this.state.y2} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'y2')} placeholder="X Value 2" />
          <input type="text" value={this.state.y3} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'y3')} placeholder="X Value 3" />
          <input type="text" value={this.state.y4} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'y4')} placeholder="X Value 4" />
          <input type="text" value={this.state.y5} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'y5')} placeholder="X Value 5" /><br />
          <span className="chartEditorLabel">Y Values: <strong>{this.state.categoryOne}</strong></span>
          <input type="text" value={this.state.Cat1Box1} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'Cat1Box1')} placeholder="Y Value 1"/>
          <input type="text" value={this.state.Cat1Box2} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'Cat1Box2')} placeholder="Y Value 2" />
          <input type="text" value={this.state.Cat1Box3} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'Cat1Box3')} placeholder="Y Value 3" />
          <input type="text" value={this.state.Cat1Box4} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'Cat1Box4')} placeholder="Y Value 4" />
          <input type="text" value={this.state.Cat1Box5} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'Cat1Box5')} placeholder="Y Value 5" /><br />

          <span className="chartEditorLabel">Y Values: <strong>{this.state.categoryTwo}</strong></span>
          <input type="text" value={this.state.Cat2Box1} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'Cat2Box1')} placeholder="Y Value 1"/>
          <input type="text" value={this.state.Cat2Box2} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'Cat2Box2')} placeholder="Y Value 2" />
          <input type="text" value={this.state.Cat2Box3} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'Cat2Box3')} placeholder="Y Value 3" />
          <input type="text" value={this.state.Cat2Box4} className="chartEditorInput chartEditorInputRight"
            onChange={this.handleChange.bind(this, 'Cat2Box4')} placeholder="Y Value 4" />
          <input type="text" value={this.state.Cat2Box5} className="chartEditorInput chartEditorInputLeft"
            onChange={this.handleChange.bind(this, 'Cat2Box5')} placeholder="Y Value 5" /><br />

          <button onClick={this.doButterfly} className="exportPngBtn">Save as PNG</button><br />
          <img id="fromcanvas" className="exportedPng" />
        </Modal>
      </div>
    )
  }
}
