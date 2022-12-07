
import {curveMonotoneX, line, scaleLinear, scaleSequential} from 'd3';
import React from 'react';
import { Dimensions, GestureResponderEvent, ScrollView } from 'react-native';
import Svg, {Path, Rect } from 'react-native-svg';
import { dataMedia, DataMediaType, DataPoint } from '../../../App';

interface IChartProps extends React.PropsWithChildren{
    data: DataPoint[]
}
const { width, height } = Dimensions.get("window");
const MARGIN_CHART = 32;
const PADDING_CHART = 8;
const WIDTH_CHART = width - (MARGIN_CHART * 2);
const WIDTH_CHART_CONTENT = (WIDTH_CHART - 16) * 2;
const HEIGHT_BAR_CHART = 240;
const RANGE_X_CHART = WIDTH_CHART_CONTENT-(WIDTH_CHART_CONTENT/6) - 8;
const SAFE_AREA_CHART = 20; //percentual
const RANGE_Y_CHART = HEIGHT_BAR_CHART * (100 - SAFE_AREA_CHART) / 100;
const RANGE_Y_CHART_TOP = HEIGHT_BAR_CHART * SAFE_AREA_CHART / 100;
const QUANT_BAR_DISPLAYED = 6;

const DATE:{[key:string]:number} = {
    janeiro: 1,
    fevereiro: 2,
    marco: 3,
    abril: 4,
    maio: 5,
    junho: 6,
    julho: 7,
    agosto: 8,
    setembro: 9,
    outubro: 10,
    novembro: 11,
    dezembro: 12
}
export default function StackedBarChart({data}: IChartProps){
    const widthChartBar = WIDTH_CHART/QUANT_BAR_DISPLAYED-8;
    const yAxis = HEIGHT_BAR_CHART / 2;
    const max = Math.max(...data.map(val => Math.max(val.profits, val.debts)));
    const min = Math.min(...data.map(val => Math.min(val.profits, val.debts)));
    console.log(max, min)
    const getDate = (d:string)=>{
        console.log(DATE[d.split("-")[1]])   
        return DATE[d.split("-")[1]];
    }
    const y = scaleLinear().domain([0, max]).range([0 , (RANGE_Y_CHART / 2)]);
    const x = scaleSequential()
      .domain([1, 12])
      .range([0, RANGE_X_CHART + 16]);
    const yL = scaleLinear().domain([(max * -1), max]).range([RANGE_Y_CHART, RANGE_Y_CHART_TOP]);
    const xL = scaleSequential()
        .domain([1, 12])
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
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={true} style={{maxWidth: WIDTH_CHART, borderRadius:8, backgroundColor:"#D6DEF1", overflow: "hidden"}}>
            <Svg onTouchEnd={(e) => handleMouseMove(e)} width={WIDTH_CHART_CONTENT} height={HEIGHT_BAR_CHART + (PADDING_CHART * 2)} style={{borderRadius:8}}>
                {/* bars */}
                {dataMedia.map((item, i) => (
                    i > 0 && i < 13 && <Rect
                    key={`background-bar-${i}`}
                    x={x(item.date) + (8*i)}
                    y={8}
                    width={widthChartBar}
                    height={HEIGHT_BAR_CHART}
                    fill={"#ffffff66"}
                    rx={8}
                    />
                ))}
                {data.map((item, i) => (
                    <View key={`group-bar-${i}`}>
                        <Rect
                        key={`profits-bar-${i}`}
                        x={x(getDate(item.date)) + (PADDING_CHART) + PADDING_CHART * (i + 1)}
                        y={yAxis - y(item.profits)}
                        width={widthChartBar - (PADDING_CHART * 2)}
                        height={y(item.profits)}
                        fill={"#E8FFD6"}
                        stroke={"#C7F3A1"}
                        />
                        <Rect
                        key={`debts-bar-${i}`}
                        x={x(getDate(item.date)) + (PADDING_CHART) + (PADDING_CHART * (i + 1))}
                        y={yAxis}
                        width={widthChartBar - (PADDING_CHART * 2)}
                        height={y(item.debts)}
                        fill={"#FFD9F9"}
                        stroke={"#F5A4E8"}
                        />
                    </View>
                ))}
                <Path fill='none' stroke={"#191919"} d={`${curvedLine}`} strokeWidth={2}/>
            </Svg>
        </ScrollView>
     );
}