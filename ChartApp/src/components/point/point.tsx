import * as React from 'react';
import { Circle, G, GProps } from 'react-native-svg';

export interface IPointProps extends GProps{
  selected:number,
  x:number,
  y:number,
  pointId: number
}

export default function Point ({selected, x, y, pointId, ...props}: IPointProps) {
  return (
    <G {...props}>
      <Circle x={selected == -1? 0 :x} y={selected == -1? 0 :y} cx={0} cy={0} r={10} fill={selected == pointId?"#1919194d": "transparent"}/>
      <Circle x={selected == -1? 0 :x} y={selected == -1? 0 :y} cx={0} cy={0} r={4} fill={selected == pointId?"#FFFFFF": "transparent"} stroke={selected == pointId?"#000000": "transparent"} strokeWidth={2}/>
    </G>
  );
}
