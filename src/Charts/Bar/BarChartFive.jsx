import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Modal from 'react-modal';

import SVGElement from '../../saveImg/svg_todataurl.js'; // eslint-disable-line no-unused-vars
import ActionBtn from '../../ActionBtn/ActionBtn.js';
import XValAmt from '../XValAmt.jsx';
import In from '../InputChartMenu.jsx';
import CustomStylesFile from '../CustomStyles.jsx';
import ChartHeader from '../ChartHeader.jsx';
import stateData from '../StateData.jsx';

const customStyles = CustomStylesFile;

export default class BarChartFive extends React.Component {

  constructor(props) {
    super(props);

    this.state = stateData;
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  hC(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  exportPng() {
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
          <ChartHeader openModal={this.openModal} />
          <ResponsiveContainer>
            <BarChart  data={data} width={1600} height={1000}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis type="number" dataKey="1000000000000"
                domain={[parseInt(this.state.minNum), parseInt(this.state.maxNum)]} allowDataOverflow={true} />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/><Legend />
              <Bar type="monotone" dataKey="pv" name={this.state.catOne} fill="#8884d8" activeDot={{r: 8}}/>
              <Bar type="monotone" dataKey="uv" name={this.state.catTwo} fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal} style={customStyles}
          contentLabel="Chart Edit Menu">

          <h2>Chart Settings</h2>
          <button onClick={this.closeModal} className="closeChartSettings">
            <i className="material-icons">close</i>
          </button>

          <span className="chartEditorLabel">Categories</span>
          <In val={this.state.catOne} ph="Category" onC={this.hC.bind(this, 'catOne')} />
          <In val={this.state.catTwo} ph="Category" onC={this.hC.bind(this, 'catTwo')} />

          <span className="chartEditorLabel">Min/Max Y Value</span>
          <In val={this.state.minNum} ph="Min" onC={this.hC.bind(this, 'minNum')} />
          <In val={this.state.maxNum} ph="Max" onC={this.hC.bind(this, 'maxNum')} />

          <XValAmt />

          <In val={this.state.y1} ph="X Val 1" onC={this.hC.bind(this, 'y1')} />
          <In val={this.state.y2} ph="X Val 2" onC={this.hC.bind(this, 'y2')} />
          <In val={this.state.y3} ph="X Val 3" onC={this.hC.bind(this, 'y3')} />
          <In val={this.state.y4} ph="X Val 4" onC={this.hC.bind(this, 'y4')} />
          <In val={this.state.y5} ph="X Val 5" onC={this.hC.bind(this, 'y5')} />
          <br />

          <span className="chartEditorLabel">Y Values: <strong>{this.state.catOne}</strong></span>
          <In val={this.state.Cat1Box1} ph="Y Val 1" onC={this.hC.bind(this, 'Cat1Box1')} />
          <In val={this.state.Cat1Box2} ph="Y Val 2" onC={this.hC.bind(this, 'Cat1Box2')} />
          <In val={this.state.Cat1Box3} ph="Y Val 3" onC={this.hC.bind(this, 'Cat1Box3')} />
          <In val={this.state.Cat1Box4} ph="Y Val 4" onC={this.hC.bind(this, 'Cat1Box4')} />
          <In val={this.state.Cat1Box5} ph="Y Val 5" onC={this.hC.bind(this, 'Cat1Box5')} />
          <br />

          <span className="chartEditorLabel">Y Values: <strong>{this.state.catTwo}</strong></span>
          <In val={this.state.Cat2Box1} ph="Y Val 1" onC={this.hC.bind(this, 'Cat2Box1')} />
          <In val={this.state.Cat2Box2} ph="Y Val 2" onC={this.hC.bind(this, 'Cat2Box2')} />
          <In val={this.state.Cat2Box3} ph="Y Val 3" onC={this.hC.bind(this, 'Cat2Box3')} />
          <In val={this.state.Cat2Box4} ph="Y Val 4" onC={this.hC.bind(this, 'Cat2Box4')} />
          <In val={this.state.Cat2Box5} ph="Y Val 5" onC={this.hC.bind(this, 'Cat2Box5')} />
          <br />

          <button onClick={this.exportPng} className="exportPngBtn">Save as PNG</button> <br />
          <img id="fromcanvas" className="exportedPng" />
        </Modal>
      </div>
    )
  }
}
