import { scaleLinear, scaleTime } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View, Text as TextButton } from 'react-native';
import Svg, { Circle, Path, Rect, Text} from 'react-native-svg';
import { DataType } from '../../../App';

export interface ISChartProps extends React.PropsWithChildren{
  data: DataType[];
}
type netWorthType = {
  x: number,
  date: number,
  value: number
}
const LABEL:{[key:number]:string} = {
  1: "jan",
  2: "fev",
  3: "mar",
  4: "abr",
  5: "mai",
  6: "jun",
  7: "jul",
  8: "ago",
  9: "set",
  10: "out",
  11: "nov",
  12: "dez"
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
  const x2Line = widthContentChart - (widthBar/2 + 4);
  const safeAreaChart = 20; //percentual
  const heightLine = heightBar -(safeAreaChart * 2) + 16;
  const maxHeightData = (heightBar/2 * (100 - safeAreaChart)) / 100;
  const year = 2022;

  const [selectedBar, setselectedBar] = useState(-1);

  const max = Math.max(...data.map(val => Math.max(val.profits, val.debts)));
  const min = Math.min(...data.map(val => Math.min(val.profits, val.debts)));
  const getMonth = (date:string) => {
    const d = date.split("/", 3);
    return parseInt(d[1]);
  }
  const yScale = scaleLinear().domain([0, max]).range([0 , maxHeightData]);
  const xScale = scaleLinear().domain([1, 12]).range([0, widthContentChart - widthBar]);
  const xLineScale = scaleLinear().domain([1, 12]).range([x1Line, x2Line]);
  const yLineScale = scaleLinear().domain([(max * -1), max]).range([heightLine, safeAreaChart]);
  const netWorth: netWorthType[] = data.map((item, i) => {return {x:i, date:getMonth(item.date), value:item.profits - item.debts}});
  netWorth.unshift({x:0-x1Line, date:2022-1-1,value: 0});
  netWorth.push({x: widthContentChart, date: 2022-1-1, value: 0});
  
  const curvedLine = line<netWorthType>()
  .x(d => d.x == 0-x1Line || d.x == widthContentChart? d.x: xLineScale(d.date))
  .y(d => yLineScale(d.value))
  .curve(curveMonotoneX)(netWorth) as string;
  
  const onPress=(x: number)=>{
    const filterArray = data.filter(item => xScale(getMonth(item.date)) < x);
    console.log("filter")
    const itemSelected = filterArray && filterArray.pop()
    console.log("pop")
    setselectedBar(getMonth(itemSelected!.date) - 1)
    console.log(itemSelected)
  }
  return (
    <View style={{ width: widthWrapper-8, borderColor:"#D6DEF1", borderWidth: 8, borderRadius:8, backgroundColor:"#D6DEF1"}}>
    <ScrollView snapToInterval={widthWrapper} decelerationRate={"fast"} showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={true} style={{maxWidth: widthContentDisplayed, width: widthContentDisplayed, borderRadius:8, overflow: "hidden"}}>
      <View>
      <Svg width={widthContentChart} height={heightBar + 24} style={{borderRadius:8}}>
          {data.map((item, i) => (
          <View key={`group-bar-${i}`}>
            <Rect
            key={`background-bar-${i}`}
            x={xScale(getMonth(item.date))}
            y={0}
            width={widthBar - 8}
            height={heightBar + 24}
            fill={selectedBar == i?"#FFFFFF":"#ffffff66"}
            rx={8}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
            <Rect
            key={`border-bar-${i}`}
            x={xScale(getMonth(item.date)) + 8}
            y={8}
            width={widthBar - 26}
            height={heightBar - 16}
            fill={"transparent"}
            rx={4}
            stroke={"#ffffff66"}
            strokeWidth={2}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
          <Rect
            key={`profits-bar-${i}`}
            x={xScale(getMonth(item.date))+8}
            y={yAxis - yScale(item.profits)}
            width={widthBar - 26}
            height={yScale(item.profits)}
            fill={"#E8FFD6"}
            stroke={"#C7F3A1"}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
          <Rect
            key={`debts-bar-${i}`}
            x={xScale(getMonth(item.date))+8}
            y={yAxis}
            width={widthBar - 26}
            height={yScale(item.debts)}
            fill={"#FFD9F9"}
            stroke={"#F5A4E8"}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
          />
          <Text
            key={`label-${i}`}
            fill="#191919"
            fontSize="12"
            fontWeight="400"
            x={`${xScale(getMonth(item.date))+18}`}
            y="250"
            textAnchor="middle"
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}>
               {LABEL[getMonth(item.date)].toLocaleUpperCase()}
               </Text>
          </View>
        ))}
        <Path onPress={(e) => {onPress(e.nativeEvent.locationX)}} fill='none' stroke={"#191919"} d={`${curvedLine}`} strokeWidth={2}/>
        {data.map((item, i) => {
          return(
          <View key={`mark-${i}`}>
            <Circle x={selectedBar == -1? 0 :xLineScale(getMonth(item.date))} y={selectedBar == -1? 0 :yLineScale(item.profits - item.debts)} id={"selected-bar"} cx={0} cy={0} r={10} fill={selectedBar == i?"#1919194d": "transparent"}/>
            <Circle x={selectedBar == -1? 0 :xLineScale(getMonth(item.date))} y={selectedBar == -1? 0 :yLineScale(item.profits - item.debts)} id={"selected-bar"} cx={0} cy={0} r={4} fill={selectedBar == i?"#FFFFFF": "transparent"} stroke={selectedBar == i?"#000000": "transparent"} strokeWidth={2}/>
          </View>
        )})}
      </Svg>
      </View>
    </ScrollView>
    <TouchableOpacity style={{backgroundColor: "#FFFFFF", alignItems:"center", borderRadius:4, marginTop:8}}>
      <TextButton style={{fontSize: 12, fontWeight:"400", color:"#191919"}}>
        2022
      </TextButton>
    </TouchableOpacity>
    </View>
  );
}
