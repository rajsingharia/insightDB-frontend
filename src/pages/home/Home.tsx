/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import AuthAxios from "../../utils/AuthAxios";
import IUserInsights from "../../interfaces/IUserInsights";
import { CircularProgress, Grid } from "@mui/material";
import { UserInsightCard } from "../../components/userInsightCard/UserInsightCard";


export const Home = () => {

  const { user } = useContext(AuthContext);
  const [userInsights, setUserInsights] = useState<IUserInsights[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authAxios = AuthAxios.getAuthAxios();
    authAxios.get('/insights')
      .then((res) => {
        console.log("Insights: ", res.data);
        setUserInsights(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [])

  return (
    <div className="h-full w-full">
      {
        loading &&
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-2xl font-bold">🔍 Gathering Insights for {user.firstName}...</h1>
          <CircularProgress
            size={40}
            className="mt-5"
            thickness={5} />
        </div>
      }
      {
        !loading && userInsights && userInsights.length === 0 &&
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-2xl font-bold">No Insights for {user.firstName}</h1>
        </div>
      }
      {
        !loading && userInsights && userInsights.length > 0 &&
        <Grid container spacing={2}>
          {
            userInsights.map((insight) => {
              return (
                <Grid item xs={10} lg={4} key={insight.id}>
                  <UserInsightCard
                    insight={insight}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      }
    </div>
  )
}


