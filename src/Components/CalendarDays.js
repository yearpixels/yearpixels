import React, { Component } from 'react'
import {Layer, Rect, Stage, Text} from 'react-konva';
import { range } from 'lodash'
import { feelingsColors, months } from '../utils'

class Pixel extends Component {
  state = {}

  handleHover = (color) => {
    this.setState({ color: color });
  }

  getColor(collection, index){
    if(collection && collection.has(index)){
      for(var [key, value] of collection.get(index)){
        if(value){ 
          return feelingsColors.get(key)
        }
      }
    }
    return 'white'
  }

  render() {
      const { index, size, select, days } = this.props
      const y = size + size * Math.floor(index / 12)
      const x = size + size * (index % 12)
      const { color } = this.state
      return (
        <Rect
          x={x} y={y} width={size} height={size}
          fill={color == null? this.getColor(days, index): color}
          onMouseEnter={() => this.handleHover('#e0e0e0')}
          onMouseLeave={() => this.handleHover(null)}
          onClick={() => select(index)}
        />
      );
  }
}

export default class CalendarDays extends Component {
  
  render() {
    const { days, select } = this.props
    const pixelSize = Math.round((window.innerHeight - 20) / 32)
    const fontSpace = pixelSize * 0.3
    const fontSize = pixelSize * 0.6
    const foreground = "#6e6e6e"
    return (
      <Stage width={13 * pixelSize} height={32 * pixelSize} style={{zIndex: 3}}>
        <Layer>
          {range(32).map(i => (
            <Text key={i}
              fontFamily="AmaticaSC, Roboto"
              y={pixelSize * i + fontSpace} 
              fontSize={fontSize}
              fill={foreground}
              text={i}
            />
          ))}
        </Layer>
        <Layer>
          {range(31*12).map(i => (
            <Pixel key={i} 
              size={pixelSize} 
              index={i} 
              days={days} 
              select={select}
            />
          ))}
        </Layer>
        <Layer>
          {months.map((m, i) => (
            <Text key={i}
              x={pixelSize * i + fontSpace + pixelSize}
              fontFamily="AmaticaSC, Roboto"
              fontSize={fontSize} 
              fill={foreground} 
              text={m[0]}
            />
          ))}
        </Layer>
      </Stage>
    )
  }
}