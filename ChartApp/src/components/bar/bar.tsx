import * as React from 'react';
import { G, GProps, Rect, Text } from 'react-native-svg';
import { heightBar, widthBar, yAxis, textBarHeight, LABEL, getMonth, heightContentBar } from '../mathChart';

export interface IBarProps extends GProps{
    selected: number,
    x: number,
    yPositive:number,
    yNegative: number,
    barId: number, 
    label: string
}

export default function Bar ({selected, x, yPositive, yNegative, barId,label, ...props}: IBarProps) {
  return (
    <G {...props}>
        <Rect
        x={x}
        y={0}
        width={widthBar - 8}
        height={heightBar}
        fill={selected == barId?"#FFFFFF":"#ffffff66"}
        rx={8}
        />
        <Rect
        x={x + 8}
        y={8}
        width={widthBar - 26}
        height={heightContentBar}
        fill={"transparent"}
        rx={4}
        stroke={"#ffffff66"}
        strokeWidth={2}
        />
        <Rect
          x={x+8}
          y={yAxis - yPositive}
          width={widthBar - 26}
          height={yPositive}
          fill={"#E8FFD6"}
          stroke={"#C7F3A1"}
          />
        <Rect
          x={x+8}
          y={yAxis}
          width={widthBar - 26}
          height={yNegative}
          fill={"#FFD9F9"}
          stroke={"#F5A4E8"}
        />
        <Text
          fill="#191919"
          fontSize="12"
          fontWeight="400"
          x={x+19}
          y={textBarHeight}
          textAnchor="middle">
             {label.toLocaleUpperCase()}
        </Text>
    </G>
  );
}
