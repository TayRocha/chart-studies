import { scaleLinear, scaleTime } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View, Text as TextButton } from 'react-native';
import Svg, { Circle, G, Path, Rect, Text, TSpan} from 'react-native-svg';
import { DataType } from '../../../App';

export interface ISChartProps extends React.PropsWithChildren{
  data: DataType[];
}
type netWorthType = {
  month: number,
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
  const { width } = Dimensions.get("window");
  const marginHorizontal = 32;
  const widthWrapper = width - (marginHorizontal * 2);
  const widthContentDisplayed = widthWrapper - 16;
  const heightBar = 240;
  const heightContentBar = 200;
  const quantBarDisplayed = 6;
  const widthBar = (widthContentDisplayed/ quantBarDisplayed);
  const widthContentChart = widthBar * data.length;
  const yAxis = heightContentBar / 2;
  const x1Line = widthBar/2 - 4;
  const x2Line = widthContentChart - (widthBar/2 + 4);
  const safeAreaChart = 20; //percentual
  const heightLine = heightContentBar -(safeAreaChart * 2) + 16;
  const maxHeightData = (heightContentBar/2 * (100 - safeAreaChart)) / 100;
  const textBarHeight = heightContentBar + 28;
  const [selectedBar, setselectedBar] = useState(-1);
  const [lastYearDataAvailable] = useState(false)
  const getYear = (date:string) => {
    const d = date.split("/", 3);
    return parseInt(d[0]);
  }
  const years = new Set(data.map(item => getYear(item.date)))
  const yearsLabels = () => {
    let points: number[] = []
    let year: number[] = []
    years.forEach((y) => {
      year.push(y)
      points.push(data.findIndex((d) => getYear(d.date) == y))
    })
    return points.map((p, i) => i+1 < points.length? 
    {year:year[i], bars:points[i+1] - p, x:p} : 
    {year: year[i], bars:data.length - p, x:p});
  }
  console.log(yearsLabels())
  
  const max = Math.max(...data.map(val => Math.max(val.profits, val.debts)));
  const min = Math.min(...data.map(val => Math.min(val.profits, val.debts)));
  const getMonth = (date:string) => {
    const d = date.split("/", 3);
    return parseInt(d[1]);
  }
  const yScale = scaleLinear().domain([0, max]).range([0 , maxHeightData]);
  const xScale = scaleLinear().domain([1, 24]).range([0, widthContentChart - widthBar]);
  const xLineScale = scaleLinear().domain([1, 24]).range([x1Line, x2Line]);
  const yLineScale = scaleLinear().domain([(max * -1), max]).range([heightLine, safeAreaChart]);
  const netWorth: netWorthType[] = data.map((item, i) => {return {month:i + 1, value:item.profits - item.debts}});
  netWorth.unshift({month:0,value: 0});
  netWorth.push({month: widthContentChart, value: 0});
  
  const curvedLine = line<netWorthType>()
  .x((d, i) => i == 0 || i == 25 ? d.month : xLineScale(d.month))
  .y(d => yLineScale(d.value))
  .curve(curveMonotoneX)(netWorth) as string;
  
  const onPress=(x: number)=>{
    const filterArray = data.filter((item, i) => xScale(i + 1) < x);
    console.log("filter")
    const itemSelected = filterArray && filterArray.pop()
    console.log("pop")
    setselectedBar(data.indexOf(itemSelected!))
    console.log(itemSelected)
  }
  return (
    <View style={{ width: widthWrapper-8, borderColor:"#D6DEF1", borderWidth: 8, borderRadius:8, backgroundColor:"#D6DEF1"}}>
    <ScrollView contentOffset={{x:(widthWrapper - 16)*2, y: 0}} snapToInterval={widthWrapper - 16} decelerationRate={"fast"} showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={true} style={{maxWidth: widthContentDisplayed, width: widthContentDisplayed, borderRadius:8, overflow: "hidden"}}>
      <Svg width={widthContentChart} height={heightBar + 26} style={{borderRadius:8}}>
          {data.map((item, i) => (
          <G key={`group-bar-${i}`}>
            <Rect
            key={`background-bar-${i}`}
            x={xScale(i + 1)}
            y={0}
            width={widthBar - 8}
            height={heightBar}
            fill={selectedBar == i?"#FFFFFF":"#ffffff66"}
            rx={8}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
            <Rect
            key={`border-bar-${i}`}
            x={xScale(i + 1) + 8}
            y={8}
            width={widthBar - 26}
            height={heightContentBar}
            fill={"transparent"}
            rx={4}
            stroke={"#ffffff66"}
            strokeWidth={2}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
          <Rect
            key={`profits-bar-${i}`}
            x={xScale(i + 1)+8}
            y={yAxis - yScale(item.profits)}
            width={widthBar - 26}
            height={yScale(item.profits)}
            fill={"#E8FFD6"}
            stroke={"#C7F3A1"}
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}
            />
          <Rect
            key={`debts-bar-${i}`}
            x={xScale(i + 1)+8}
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
            x={`${xScale(i + 1)+19}`}
            y={textBarHeight}
            textAnchor="middle"
            onPress={(e) => {onPress(e.nativeEvent.locationX)}}>
               {LABEL[getMonth(item.date)].toLocaleUpperCase()}
               </Text>
          </G>
        ))}
        <Path onPress={(e) => {onPress(e.nativeEvent.locationX)}} fill='none' stroke={"#191919"} d={`${curvedLine}`} strokeWidth={2}/>
        {data.map((item, i) => {
          return(
          <G key={`mark-${i}`}>
            <Circle x={selectedBar == -1? 0 :xLineScale(i + 1)} y={selectedBar == -1? 0 :yLineScale(item.profits - item.debts)} id={"selected-bar"} cx={0} cy={0} r={10} fill={selectedBar == i?"#1919194d": "transparent"}/>
            <Circle x={selectedBar == -1? 0 :xLineScale(i + 1)} y={selectedBar == -1? 0 :yLineScale(item.profits - item.debts)} id={"selected-bar"} cx={0} cy={0} r={4} fill={selectedBar == i?"#FFFFFF": "transparent"} stroke={selectedBar == i?"#000000": "transparent"} strokeWidth={2}/>
          </G>
        )})}
        {yearsLabels().map((label, i) => {
            if(label.bars > quantBarDisplayed){
              return (
                <G key={`label-year-${i}`}>
                  <Rect
                  x={xScale(label.x + 1)}
                  y={250}
                  rx={4}
                  width={(widthBar * (label.bars - quantBarDisplayed) - 8)}
                  height={16}
                  fill={"#ffffff66"}
                  />
                  <Text
                    fill="#191919"
                    fontSize="12"
                    fontWeight="400"
                    x={xScale(label.x + 1) + ((widthBar * (label.bars - quantBarDisplayed) - 8))/2}
                    y={262}
                    textAnchor="middle">
                      {label.year}
                    </Text>
                  <Rect
                  x={xScale(label.x + 1) + ((label.bars - quantBarDisplayed) * widthBar) + 8}
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
                    x={(xScale(label.x + 1) + ((label.bars - quantBarDisplayed) * widthBar) + 8) + ((widthBar * quantBarDisplayed - 16)/2)}
                    y={262}
                    textAnchor="middle">
                      {label.year}
                    </Text>
                </G>
              )
            }
            return (
              <G key={`label-year-${i}`}>
                  <Rect
                  x={xScale(label.x + 1)}
                  y={250}
                  rx={4}
                  width={(widthBar * label.bars - 8)}
                  height={16}
                  fill={"#ffffff66"}
                  />
                  <Text
                    fill="#191919"
                    fontSize="12"
                    fontWeight="400"
                    x={xScale(label.x + 1) + ((widthBar * label.bars - 8))/2}
                    y={262}
                    textAnchor="middle">
                      {label.year}
                    </Text>
                </G>
            )
            
        })}
        {
          !lastYearDataAvailable && 
          <>
            <Rect
              x={0}
              y={0}
              width={widthWrapper - 16}
              height={heightBar}
              fill={"transparent"}
              />
            <Rect
              x={20}
              y={heightBar/4}
              rx={8}
              width={widthWrapper - 40 - 24}
              height={heightBar/2}
              fill={"#FFFFFF"}
              />
              <Text
                fill="#191919"
                fontSize="12"
                fontWeight="bold"
                x={20 + ((widthWrapper - 40 - 24)/2)}
                y={(heightBar/2)}
                textAnchor="middle">
                  Em Breve
                  <TSpan fontWeight="400" x={20 + ((widthWrapper - 40 - 24)/2)} y={(heightBar/2) + 20}>Você terá disponível para consultas</TSpan>
                  <TSpan fontWeight="400" x={20 + ((widthWrapper - 40 - 24)/2)} y={(heightBar/2) + 34}>os ultimos 24 meses</TSpan>
                </Text>
            <Rect
              x={widthWrapper - 16}
              y={0}
              width={widthWrapper - 24}
              height={heightBar}
              fill={"transparent"}
              />
            <Rect
              x={widthWrapper - 16 + 20}
              y={heightBar/4}
              rx={8}
              width={widthWrapper - 40 - 24}
              height={heightBar/2}
              fill={"#FFFFFF"}
              />
            <Text
                fill="#191919"
                fontSize="12"
                fontWeight="bold"
                x={widthWrapper - 16 + 20 + ((widthWrapper - 40 - 24)/2)}
                y={(heightBar/2)}
                textAnchor="middle">
                   Em Breve
                  <TSpan fontWeight="400" x={widthWrapper - 16 + 20 + ((widthWrapper - 40 - 24)/2)} y={(heightBar/2) + 20}>Você terá disponível para consultas</TSpan>
                  <TSpan fontWeight="400" x={widthWrapper - 16 + 20 + ((widthWrapper - 40 - 24)/2)} y={(heightBar/2) + 34}>os ultimos 24 meses</TSpan>
                </Text>
          </>
        }
      </Svg>
    </ScrollView>
    </View>
  );
}
