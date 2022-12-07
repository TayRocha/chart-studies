
import { curveBasis, curveCardinal, curveLinear, curveMonotoneX, curveNatural, line, pointer, pointers, quadtree, scaleLinear, scaleOrdinal, scaleSequential, scaleTime, select, stack } from 'd3';
import React, { useRef } from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import Svg, { G, Line, Path, Rect } from 'react-native-svg';
import { dataMedia, DataMediaType, DataPoint } from '../../../App';

interface IChartProps extends React.PropsWithChildren{
    data: DataPoint[]
}
const { width, height } = Dimensions.get("window");
const MARGIN_CHART = 32;
const PADDING_CHART = 8;
const WIDTH_CHART = width - (MARGIN_CHART * 2);
const WIDTH_CHART_CONTENT = (WIDTH_CHART - 16);
const HEIGHT_BAR_CHART = 240;
const RANGE_X_CHART = WIDTH_CHART_CONTENT-(WIDTH_CHART_CONTENT/6) - 8;
const SAFE_AREA_CHART = 20; //percentual
const RANGE_Y_CHART = HEIGHT_BAR_CHART * (100 - SAFE_AREA_CHART) / 100;

export default function StackedBarChart({data}: IChartProps){
    const widthChartBar = WIDTH_CHART/dataMedia.length - 8;
    const yAxis = HEIGHT_BAR_CHART / 2;
    const max = Math.max(...data.map(val => val.value));
    const min = Math.min(...data.map(val => val.value));
    const y = scaleLinear().domain([0, max]).range([0 , (RANGE_Y_CHART / 2)]);
    const x = scaleSequential()
      .domain([1, 6])
      .range([0, RANGE_X_CHART]);
    const yL = scaleLinear().domain([(max * -1), max]).range([RANGE_Y_CHART, PADDING_CHART]);
    const xL = scaleSequential()
        .domain([1, 6])
        .range([widthChartBar/2 + 8, WIDTH_CHART_CONTENT - widthChartBar/2 - 8]);
    const curvedLine = line<DataMediaType>()
        .x(d => xL(d.date))
        .y(d => yL(d.value))
        .curve(curveMonotoneX)(dataMedia) as string;
    const handleMouseMove = (t:GestureResponderEvent): void => {
        const tt = t.target;
        const measures = tt.measure((fx, fy, width, height, px, py) => {

            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
        })
    }

     return(
        <View>
            <Svg onTouchEnd={(e) => handleMouseMove(e)} width={WIDTH_CHART_CONTENT} height={HEIGHT_BAR_CHART + (PADDING_CHART * 2)} style={{backgroundColor:"#D6DEF1", borderRadius:8}}>
                {/* bars */}
                {dataMedia.map((item, i) => (
                    <Rect
                    key={`background-bar-${i}`}
                    x={x(item.date) + PADDING_CHART}
                    y={8}
                    width={widthChartBar}
                    height={HEIGHT_BAR_CHART}
                    fill={"#ffffff66"}
                    rx={8}
                    />
                ))}
                {data.map((item, i) => (
                    <Rect
                    key={`bar-${i}`}
                    x={x(item.date) + (PADDING_CHART * 2)}
                    y={ item.categ == 'assets'? yAxis - y(item.value): yAxis}
                    width={widthChartBar - (PADDING_CHART * 2)}
                    height={y(item.value)}
                    fill={item.categ == 'assets'?"#E8FFD6":"#FFD9F9"}
                    stroke={item.categ == 'assets'?"#C7F3A1":"#F5A4E8"}
                    />
                ))}
                <Path fill='none' stroke={"#191919"} d={`${curvedLine}`} strokeWidth={2}/>
            </Svg>
        </View>
     );
}