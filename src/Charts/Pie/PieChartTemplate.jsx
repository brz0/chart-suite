import React from 'react';
import { PieChart, Tooltip, Legend, Pie, ResponsiveContainer } from 'recharts';
import domtoimage from 'dom-to-image';
import {Link} from 'react-router';
var Menu = require('react-burger-menu').stack;

import ActionBtn from '../../ActionBtn/ActionBtn.js';
import In from '../InputChartMenu.jsx';
import stateData from '../StateData.jsx';
import logoUrl from '../../../img/logo.svg';
import chartMenuIcon from '../../../img/gear.svg';

export default class BarChartTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = stateData;
  }

  hC(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  exportPng() {
    var node = document.querySelector('.recharts-responsive-container');
    domtoimage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.getElementById('canvasexport').appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  render() {

    let data = [
      {name: this.state.y0, uv: this.state.Cat2Box0, pv: this.state.Cat1Box0},
      {name: this.state.y1, uv: this.state.Cat2Box1, pv: this.state.Cat1Box1},
      {name: this.state.y2, uv: this.state.Cat2Box2, pv: this.state.Cat1Box2},
      {name: this.state.y3, uv: this.state.Cat2Box3, pv: this.state.Cat1Box3},
      {name: this.state.y4, uv: this.state.Cat2Box4, pv: this.state.Cat1Box4},
      {name: this.state.y5, uv: this.state.Cat2Box5, pv: this.state.Cat1Box5},
    ];

    data.length = this.state.arrayX;

    var isMenuOpen = function(state) {
      if (state.isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    };

    const LegendWithValues = () =>
        <div>
          <span>{this.state.catOne}</span>
          <span>{this.state.catTwo}</span>
        </div>

    return (
      <div>
        <ActionBtn />
        <Link to="/" className="chartBrand">
          <img src={logoUrl} width="220" alt="Chart Suite" />
        </Link>

        <div className="chartWrap chartWrapPie">
          <ResponsiveContainer>
            <PieChart>
              <Legend content={LegendWithValues} />
              <Tooltip />
              <Pie data={data} nameKey="name" innerRadius="25%" valueKey="uv" outerRadius="80%" fill="#5a67f4"/>
              <Pie data={data} nameKey="name" valueKey="pv" innerRadius="55%" fill="#98ca29" outerRadius="80%"/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <Menu right onStateChange={ isMenuOpen } customBurgerIcon={ <img src={chartMenuIcon} /> } >
          <h2>Chart Settings</h2>

          <span className="chartEditorLabel">Categories</span>
          <In val={this.state.catOne} ph="Category" onC={this.hC.bind(this, 'catOne')} />
          <In val={this.state.catTwo} ph="Category" onC={this.hC.bind(this, 'catTwo')} />

          <span className="chartEditorLabel">X Values</span>
          <div className="amountWrap">
          {Array.apply(null, Array(5)).map(function(item, i){
            return ( <a key={'arrayVal' + i} onClick={()=> this.setState({arrayX: i + 2})}><button>{i + 2}</button></a> );
          }, this)}
          </div>

          {Array.apply(null, Array(this.state.arrayX)).map(function(item, i){
            return ( <In val={eval('this.state.y' + i)} key={'xVal' + i} ph={'X Val ' + i } onC={this.hC.bind(this, "y" + i)} /> );
          }, this)}
          <br />

          <span className="chartEditorLabel">Y Values: <strong>{this.state.catOne}</strong></span>
          {Array.apply(null, Array(this.state.arrayX)).map(function(item, i){
            return ( <In val={eval('this.state.Cat1Box' + i)} key={'Y1Val' + i} ph={'Y Val ' + i } onC={this.hC.bind(this, "Cat1Box" + i)} /> );
          }, this)}
          <br />

          <span className="chartEditorLabel">Y Values: <strong>{this.state.catTwo}</strong></span>
          {Array.apply(null, Array(this.state.arrayX)).map(function(item, i){
            return ( <In val={eval('this.state.Cat2Box' + i)} key={'Y2Val' + i} ph={'Y Val ' + i } onC={this.hC.bind(this, "Cat2Box" + i)} /> );
          }, this)}
          <br />

          <button onClick={this.exportPng} className="exportPngBtn">Save as PNG</button><br />
          <div id="canvasexport" className="exportedPng"></div>
        </Menu>
      </div>
    )
  }
}
