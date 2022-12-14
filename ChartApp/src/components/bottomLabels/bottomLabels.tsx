import * as React from 'react';
import { G, GProps, Rect, Text } from 'react-native-svg';
import { quantBarDisplayed, widthBar } from '../mathChart';

export interface IBottomLabelsProps extends GProps{
    bars: number,
    x: number,
    year:number
}

export default function BottomLabels ({bars, x, year, ...props}: IBottomLabelsProps) {
    if(bars > quantBarDisplayed){
        return (
          <G {...props}>
            <Rect
            x={x}
            y={250}
            rx={4}
            width={(widthBar * (bars - quantBarDisplayed) - 8)}
            height={16}
            fill={"#ffffff66"}
            />
            <Text
              fill="#191919"
              fontSize="12"
              fontWeight="400"
              x={x + ((widthBar * (bars - quantBarDisplayed) - 8))/2}
              y={262}
              textAnchor="middle">
                {year}
              </Text>
            <Rect
            x={x + ((bars - quantBarDisplayed) * widthBar) + 8}
            y={250}
            rx={4}
            width={(widthBar * quantBarDisplayed - 16)}
            height={16}
            fill={"#ffffff66"}
            />
            <Text
              fill="#191919"
              fontSize="12"
              fontWeight="400"
              x={(x + ((bars - quantBarDisplayed) * widthBar) + 8) + ((widthBar * quantBarDisplayed - 16)/2)}
              y={262}
              textAnchor="middle">
                {year}
              </Text>
          </G>
        )
      }
      return (
        <G {...props}>
            <Rect
            x={x}
            y={250}
            rx={4}
            width={(widthBar * bars - 8)}
            height={16}
            fill={"#ffffff66"}
            />
            <Text
              fill="#191919"
              fontSize="12"
              fontWeight="400"
              x={x + ((widthBar * bars - 8))/2}
              y={262}
              textAnchor="middle">
                {year}
              </Text>
          </G>
      )
}
