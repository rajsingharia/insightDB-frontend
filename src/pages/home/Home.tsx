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
        const insights = res.data;
        //for testing adding same insight 2 times
        // insights.push(insights[0]);
        // insights.push(insights[1]);
        setUserInsights(insights);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setTimeout(() => {
          setLoading(false);
        //}, 1000);
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
      {/* 

      Grid Layout
      -------
      |g1|g2|
      -------
      |g3|g4|
      -------

      g1, g2, g3, g4 -> 4 eqaual divs
      11,12 -> Grid 1 (could contain 1 or 2 cards within)
      21,22 -> Grid 2 (could contain 1 or 2 cards within)
      31,32 -> Grid 3 (could contain 1 or 2 cards within)
      41,42 -> Grid 4 (could contain 1 or 2 cards within)
      
      */}
      {
        !loading && userInsights && userInsights.length > 0 &&
        <Grid container spacing={2}>
          {
            userInsights.map((insight) => {
              return (
                <Grid item md={3} key={insight.id}>
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


