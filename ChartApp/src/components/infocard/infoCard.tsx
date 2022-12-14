import * as React from 'react';
import { G, GProps, Rect, Text, TSpan } from 'react-native-svg';

export interface IInfoCardProps extends GProps{
    xWrapper: number,
    xCard: number,
    widthWrapper: number,
    heightWrapper: number
}

export default function InfoCard ({xWrapper, xCard, widthWrapper, heightWrapper, ...props}: IInfoCardProps) {
    const y = heightWrapper/4;
    const width = widthWrapper - 40 - 24;
    const height = heightWrapper/2;
    const textX = xCard + ((widthWrapper - 40 - 24)/2);
    const textY = heightWrapper/2;
    const spanX = xCard + ((widthWrapper - 40 - 24)/2);
    const spanY = heightWrapper/2;
  return (
        <G>
            <Rect
              x={xWrapper}
              y={0}
              width={widthWrapper - 16}
              height={heightWrapper}
              fill={"transparent"}
              />
            <Rect
              x={xCard}
              y={y}
              rx={8}
              width={width}
              height={height}
              fill={"#FFFFFF"}
              />
              <Text
                fill="#191919"
                fontSize="12"
                fontWeight="bold"
                x={textX}
                y={textY}
                textAnchor="middle">
                  Em Breve
                  <TSpan fontWeight="400" x={spanX} y={textY + 20}>Você terá disponível para consultas</TSpan>
                  <TSpan fontWeight="400" x={spanX} y={textY + 34}>os ultimos 24 meses</TSpan>
            </Text>
        </G>
  );
}
