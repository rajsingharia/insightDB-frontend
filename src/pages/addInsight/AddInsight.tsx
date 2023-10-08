import { useEffect, useState } from "react";
import AuthAxios from "../../utils/AuthAxios";
import { SelectChangeEvent, Snackbar } from "@mui/material";
import { SupportedCharList } from "../../components/supportedChartsList/SupportedCharList";
import { InsightChart } from "../../components/charts/InsightChart";
import { QueryFields } from "../../components/query/QueryFields";
import { ICharts } from "../../interfaces/ICharts";
import { ChartSettings } from "../../components/chartSettings/ChartSettings";
import { useNavigate } from "react-router-dom";
import { ChartColors } from "../../types/ChartColors";
import { GraphData } from "../../types/GraphData";

export type userIntegrationResponse = {
  id: string;
  name: string;
  type: string;
  credentials: JSON;
  user: string;
  createdAt: string;
  updatedAt: string;
}

type saveInsightRequest = {
  title: string;
  description: string;
  integrationId: string;
  graphData: JSON;
  parameters: JSON;
  refreshRate?: number;
}

export type FetchDataResponse = {
  countOfFields: number;
  fields: string[];
  timeField?: string;
  data: unknown[];
}


export const AddInsight = () => {

  const navigate = useNavigate();

  const [userIntegrations, setUserIntegrations] = useState<userIntegrationResponse[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<userIntegrationResponse | undefined>(undefined);
  const [insightData, setInsightData] = useState<FetchDataResponse | undefined>(undefined);
  const [selectedChart, setSelectedChart] = useState<ICharts>({} as ICharts);
  const [selectedChartColors, setSelectedChartColors] = useState<ChartColors | undefined>(undefined);
  const [refreshRate, setRefreshRate] = useState<number>(0);
  const [supportedChartsList, setSupportedChartsList] = useState<ICharts[]>([]);
  const [insightTitle, setInsightTitle] = useState<string>('');
  const [insightDescription, setInsightDescription] = useState<string>('');
  const [insightParameters, setInsightParameters] = useState<JSON>({} as JSON);
  const [snackBar, setSnackBar] = useState<{ open: boolean, message: string }>({ open: false, message: '' });


  const changeRefreshRate = (refreshRate: number) => {
    setRefreshRate(refreshRate);
  }


  useEffect(() => {
    const authAxios = AuthAxios.getAuthAxios();
    authAxios.get('/integrations')
      .then((res) => {
        console.log(`User Integrations: `, res.data)
        setUserIntegrations(res.data)
      })
      .catch((err) => {
        console.log(err);
        setSnackBar({ open: true, message: "Error Fetching Integrations" });
      });

    authAxios.get('/charts/supported-charts')
      .then((res) => {
        console.log(`Supported Charts: `, res.data)
        setSupportedChartsList(res.data.supportedCharts);
        setSelectedChart(res.data.defaultChart);
      })
      .catch((err) => {
        console.log(err);
        setSnackBar({ open: true, message: "Error Fetching Supported Charts" });
      });

  }, []);

  const handelSelectedIntegrationChange = (event: SelectChangeEvent<unknown>) => {
    const selectedIntegrationId = event.target.value as string;
    const selectedIntegration = userIntegrations.find((integration) => integration.id === selectedIntegrationId);
    if (selectedIntegration) setSelectedIntegration(selectedIntegration);
  };

  const saveInsight = () => {

    const authAxios = AuthAxios.getAuthAxios();

    if (!selectedIntegration) {
      setSnackBar({ open: true, message: "No Integration Selected" });
      return;
    }
    else if (!insightTitle) {
      setSnackBar({ open: true, message: "No Title" });
      return;
    }
    else if (!insightParameters) {
      setSnackBar({ open: true, message: "No Parameters" });
      return;
    }
    else if (!selectedChartColors) {
      setSnackBar({ open: true, message: "No Chart Colors" });
      return;
    }

    //insightGraphData -> should contain chartType and chartData(color, labels)

    const graphData: GraphData = {
      chartType: selectedChart.value,
      chartColors: selectedChartColors
    }

    const insightGraphData = JSON.stringify(graphData);

    const saveInsightRequest: saveInsightRequest = {
      title: insightTitle,
      description: insightDescription,
      integrationId: selectedIntegration?.id || '',
      graphData: JSON.parse(insightGraphData),
      parameters: insightParameters,
      refreshRate: refreshRate
    }

    const body = {
      insight: saveInsightRequest
    }

    authAxios.post('/insights', body)
      .then((res) => {
        console.log(`Insight Saved: `, res.data)
        setSnackBar({ open: true, message: "Insight Saved Successfully ✅🔒" });
        navigate('/',{ replace: true });
      })
      .catch((err) => {
        console.log(err)
      });
  }


  return (
    <div className="flex flex-row justify-center items-center h-full w-full gap-5">
      <div className="flex flex-col justify-start items-center h-full w-3/4 gap-5">
        <div className="flex justify-center items-center bg-black h-1/2 w-full p-5 rounded-lg">
          {
            // TODO: Explore lazy loading of chart component
            insightData && insightData.data.length > 0 && selectedChartColors &&
            <InsightChart
              insightData={insightData}
              chartType={selectedChart}
              chartColors={selectedChartColors}
            />
          }
        </div>
        <div className="flex flex-col justify-start items-end bg-black h-1/2 w-full p-5 rounded-lg gap-4">          
          {
            selectedIntegration &&
            <QueryFields
              integrationId={selectedIntegration.id}
              setInsightData={setInsightData}
              setSelectedChartColors={setSelectedChartColors}
              chartType={selectedChart}
              setInsightParameters={setInsightParameters}
              saveInsight={saveInsight}
              changeRefreshRate={changeRefreshRate}
            />
          }
        </div>
      </div>
      <div className="flex flex-col justify-start items-center bg-black h-full w-1/4 rounded-lg">
        <div className="flex flex-col justify-start items-center h-full w-full p-5">
          Settings
          {
            <ChartSettings
              selectedIntegration={selectedIntegration}
              handelSelectedIntegrationChange={handelSelectedIntegrationChange}
              userIntegrations={userIntegrations}
              insightTitle={insightTitle}
              setInsightTitle={setInsightTitle}
              insightDescription={insightDescription}
              setInsightDescription={setInsightDescription}
            />
          }
          <div className="flex flex-col justify-start items-start w-full mt-4 pr-4 overflow-y-scroll rounded">
            <SupportedCharList
              SupportedCharts={supportedChartsList}
              selectedChart={selectedChart}
              setSelectedChart={setSelectedChart}
            />
          </div>
        </div>
      </div>
      {
        snackBar.open &&
        <Snackbar
          open={snackBar.open}
          onClose={() => setSnackBar({ open: false, message: '' })}
          message={snackBar.message}
        />
      }
    </div>
  )
}
