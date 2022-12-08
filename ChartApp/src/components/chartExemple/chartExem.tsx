import { NumberValue } from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import { timeMonth } from 'd3-time';
import * as React from 'react';
import { useState } from 'react';
import { Dimensions, NativeTouchEvent, ScrollView, View } from 'react-native';
import Svg, { Circle, Defs, Path, Rect, Use} from 'react-native-svg';
import { DataPoint, DataType } from '../../../App';

export interface ISChartProps extends React.PropsWithChildren{
  data: DataType[];
}
type netWorthType = {
  x: number,
  date: NumberValue,
  value: number
}
export default function SChart ({data}: ISChartProps) {
  const { width, height } = Dimensions.get("window");
  const marginHorizontal = 32;
  const widthWrapper = width - (marginHorizontal * 2);
  const heightWrapper = 248;
  const widthContentDisplayed = widthWrapper - 16;
  const heightBar = 240;
  const quantBarDisplayed = 6;
  const widthBar = (widthContentDisplayed/ quantBarDisplayed);
  const widthContentChart = widthBar * data.length;
  const yAxis = heightBar / 2;
  const x1Line = widthBar/2 - 4;
  const x2Line = widthContentChart + (widthBar/2-4);
  const safeAreaChart = 20; //percentual
  const heightLine = heightBar -(safeAreaChart * 2) + 16;
  const maxHeightData = (heightBar/2 * (100 - safeAreaChart)) / 100;
  const year = 2022;

  const [selectedBar, setselectedBar] = useState(-1);
  const max = Math.max(...data.map(val => Math.max(val.profits, val.debts)));
  const min = Math.min(...data.map(val => Math.min(val.profits, val.debts)));
  const yScale = scaleLinear().domain([0, max]).range([0 , maxHeightData]);
  const xScale = scaleTime().domain([new Date(year-1-1), new Date(year-12-2)]).range([0, widthContentChart]);
  const xLineScale = scaleTime().domain([new Date(year-1-1), new Date(year-12-2)]).range([x1Line, x2Line]);
  const yLineScale = scaleLinear().domain([(max * -1), max]).range([heightLine, safeAreaChart]);
  const netWorth: netWorthType[] = data.map((item, i) => {return {x: i,date:item.date, value: item.profits - item.debts}});
  netWorth.unshift({x:0-x1Line, date:2022-1-1,value: 0});
  netWorth.push({x: widthContentChart, date: 2022-1-1, value: 0});
  
  const curvedLine = line<netWorthType>()
  .x(d => d.x == 0-x1Line || d.x == widthContentChart? d.x: xLineScale(d.date))
  .y(d => yLineScale(d.value))
  .curve(curveMonotoneX)(netWorth) as string;
  
  const onPress = (x: number)=>{
      const filterArray = data.filter(item => xScale(item.date) < x);
      const itemSelected = filterArray && filterArray.pop()
      setselectedBar(() => data.findIndex((d) => d == itemSelected))
      console.log(itemSelected, data.findIndex((d) => d == itemSelected), selectedBar)
  }
  return (
    <View style={{ width: widthWrapper-8, height: heightWrapper, borderColor:"#D6DEF1", borderWidth: 8, borderRadius:8, backgroundColor:"#D6DEF1"}}>
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={true} style={{maxWidth: widthContentDisplayed, width: widthContentDisplayed, borderRadius:8, overflow: "hidden"}}>
      <View>
      <Svg width={widthContentChart} height={heightBar} style={{borderRadius:8}}>
          <Defs>
            
          </Defs>
          {data.map((item, i) => (
          <View key={`group-bar-${i}`}>
            <Rect
            key={`background-bar-${i}`}
            x={xScale(item.date)}
            y={0}
            width={widthBar - 8}
            height={heightBar}
            fill={"#ffffff66"}
            rx={8}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
          <Rect
            key={`profits-bar-${i}`}
            x={xScale(item.date)+8}
            y={yAxis - yScale(item.profits)}
            width={widthBar - 26}
            height={yScale(item.profits)}
            fill={"#E8FFD6"}
            stroke={"#C7F3A1"}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
          <Rect
            key={`debts-bar-${i}`}
            x={xScale(item.date)+8}
            y={yAxis}
            width={widthBar - 26}
            height={yScale(item.debts)}
            fill={"#FFD9F9"}
            stroke={"#F5A4E8"}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
          />
          <Circle x={selectedBar == -1? 0 :xLineScale(item.date)} y={selectedBar == -1? 0 :yLineScale(item.profits - item.debts)} id={"selected-bar"} cx={0} cy={0} r={5} fill={selectedBar == i?"#000000": "transparent"}/>
          </View>
        ))}
        <Path onPress={(e) => {onPress(e.nativeEvent.locationX)}} fill='none' stroke={"#191919"} d={`${curvedLine}`} strokeWidth={2}/>
      </Svg>
      </View>
    </ScrollView>
    </View>
  );
}
