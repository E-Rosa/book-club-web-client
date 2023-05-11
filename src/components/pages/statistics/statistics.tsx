import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CustomBarChart from "./barChart/barChart";
import "./statistics.css";
import BookRepo from "../../../api/repository/bookRepo";
import { BookStatistics } from "../../../api/interfaces/interfaces";
import NumberStatistic from "./numberStatistics/numberStatistics";

interface StatisticsPageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}
const StatisticsPage: FunctionComponent<StatisticsPageProps> = (props) => {
  //responsibility: query the statistics data and use it to display
  //pie charts with labels
  const [statisticsData, setStatisticsData] = useState<BookStatistics>();
  useEffect(() => {
    BookRepo.getBookStatistics(props.loadingSetter).then((data) => {
      setStatisticsData(data);
    });
  }, []);
  return (
    <>
      <div className="statistics-numbers-container">
        <NumberStatistic label="Livros lidos" value={statisticsData?.totalBooks as number} />
        <NumberStatistic label="Paginas lidas" value={statisticsData?.totalPagesRead as number} />
        <NumberStatistic label="Paginas por livro" value={statisticsData?.avaragePagesPerBook as number} />
      </div>
      <div className="pies-container">
        <CustomBarChart
          data={statisticsData?.bookCountByCentury as []}
          label="por século"
          xAxisLabel="século"
        />
        <CustomBarChart
          data={statisticsData?.bookCountByTag as []}
          label="por gênero literário"
        />
        <CustomBarChart
          data={statisticsData?.bookCountByGender as []}
          label="por gênero"
        />
        <CustomBarChart
          data={statisticsData?.bookCountByAuthorNationality as []}
          label="por nacionalidade"
        />
      </div>
    </>
  );
};

export default StatisticsPage;
