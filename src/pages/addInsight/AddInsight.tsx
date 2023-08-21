import { useEffect, useState } from "react";
import AuthAxios from "../../utils/AuthAxios";
import { SelectChangeEvent, Snackbar } from "@mui/material";
import { SupportedCharList } from "../../components/supportedChartsList/SupportedCharList";
import { InsightChart } from "../../components/charts/InsightChart";
import { QueryFields } from "../../components/query/QueryFields";
import { ICharts } from "../../interfaces/ICharts";
import { ChartSettings } from "../../components/chartSettings/ChartSettings";
import { Save } from "lucide-react";

type userIntegrationResponse = {
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
}

export type FetchDataResponse = {
  countOfFields: number;
  fields: string[];
  countOfData: number;
  data: unknown[];
}


export const AddInsight = () => {

  const [userIntegrations, setUserIntegrations] = useState<userIntegrationResponse[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<userIntegrationResponse | null>(null);
  const [insightData, setInsightData] = useState<FetchDataResponse | undefined>(undefined);
  const [selectedChart, setSelectedChart] = useState<ICharts>({} as ICharts);
  const [supportedChartsList, setSupportedChartsList] = useState<ICharts[]>([]);
  const [insightTitle, setInsightTitle] = useState<string>('');
  const [insightDescription, setInsightDescription] = useState<string>('');
  const [insightParameters, setInsightParameters] = useState<JSON>({} as JSON);
  const [snackBar, setSnackBar] = useState<{ open: boolean, message: string }>({ open: false, message: '' });


  useEffect(() => {
    const authAxios = AuthAxios.getAuthAxios();
    authAxios.get('/integrations')
      .then((res) => {
        console.log(`User Integrations: `, res.data)
        setUserIntegrations(res.data)
      })
      .catch((err) => {
        console.log(err)
      });

    authAxios.get('/charts/supported-charts')
      .then((res) => {
        console.log(`Supported Charts: `, res.data)
        setSupportedChartsList(res.data.supportedCharts);
        setSelectedChart(res.data.defaultChart);
      })
      .catch((err) => {
        console.log(err)
      });

  }, []);

  const handelSelectedIntegrationChange = (event: SelectChangeEvent) => {
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

    //insightGraphData -> should contain chartType and chartData(color, labels, datasets)

    const graphData = {
      chartType: selectedChart.value,
      chartData: insightData
    }

    const insightGraphData = JSON.stringify(graphData);

    const saveInsightRequest: saveInsightRequest = {
      title: insightTitle,
      description: insightDescription,
      integrationId: selectedIntegration?.id || '',
      graphData: JSON.parse(insightGraphData),
      parameters: insightParameters
    }

    const body = {
      insight: saveInsightRequest
    }

    authAxios.post('/insights', body)
      .then((res) => {
        console.log(`Insight Saved: `, res.data)
        alert("Insight Saved");
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
            insightData && insightData.data.length > 0 &&
            <InsightChart
            insightData={insightData}
              chartType={selectedChart}
            />
          }
        </div>
        <div className="flex flex-col justify-start items-end bg-black h-1/2 w-full p-5 rounded-lg gap-4">
          {
            <div className="border-2 border-purple-500 rounded px-4 py-1 bg-purple-500 cursor-pointer bg-opacity-30"
              onClick={saveInsight}>
              <Save color="white" />
            </div>
          }
          {
            selectedIntegration &&
            <QueryFields
              integrationId={selectedIntegration.id}
              setInsightData={setInsightData}
              chartType={selectedChart}
              setInsightParameters={setInsightParameters}
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


/*
model Insight {
  id            String       @id @default(uuid())
  title         String
  description   String?
  integration   Integration? @relation(fields: [inetgrationId], references: [id])
  inetgrationId String
  creator       User?        @relation(fields: [creatorId], references: [id])
  creatorId     String
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  graphData     Json
  parameters    Json
}
*/