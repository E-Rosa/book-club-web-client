import { FunctionComponent } from "react";
import './numberStatistics.css'

interface NumberStatisticProps {
  label: string;
  value: number;
}
const NumberStatistic: FunctionComponent<NumberStatisticProps> = (props) => {
  return (
      <div className="statistics-number-container">
        <span className="blue-button">{props.label}</span>
        <span className="statistic-number">{props.value}</span>
      </div>
  );
};

export default NumberStatistic