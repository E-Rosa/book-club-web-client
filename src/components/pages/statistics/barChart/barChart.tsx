import { FunctionComponent } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Bar
} from "recharts";
import "./barChart.css";

interface BarChartProps {
  label: string;
  data: any[];
  xAxisLabel?: string;
}
const CustomBarChart: FunctionComponent<BarChartProps> = (props) => {
  //responsibility: query the statistics data and use it to display
  //pie charts with labels
  return (
    <>
      <div className="pie-container">
        <span className="blue-button g-font">{props.label}</span>

        <ResponsiveContainer
          width={"100%"}
          minHeight={props.data ? props.data.length * 45 : 300}
        >
          <BarChart
            data={props.data as any}
            layout="vertical"
            margin={{
              top: 5,
              right: 20,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid> </CartesianGrid>
            <Tooltip />
            <XAxis hide axisLine={false} type="number"></XAxis>
            <YAxis axisLine={false} dataKey="name" type="category">
              {" "}
            </YAxis>
            <Bar dataKey={"value"} fill="#4d51b4" barSize={30} label={{ fill: 'white', fontSize: 16 }}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CustomBarChart;
