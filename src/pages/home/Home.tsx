/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import AuthAxios from "../../utils/AuthAxios";

export const Home = () => {

  const { user } = useContext(AuthContext);
  const authAxios = AuthAxios.getAuthAxios();
  const [userInsights, setUserInsights] = useState<unknown[]>([]);

  useEffect(() => {

    authAxios.get('/insights')
      .then((res) => {
        console.log("Insights: ", res.data);
        setUserInsights(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [])

  return (
    <div className="h-full w-full">
      {
        userInsights && userInsights.length === 0 &&
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-2xl font-bold">No Insights for {user.firstName}</h1>
        </div>
      }
      {
        userInsights && userInsights.length > 0 &&
        userInsights.map((insight: any) => {
          return (
            <div key={insight.id}
              className="flex flex-col justify-start items-start w-full bg-purple-500 p-3 rounded-lg bg-opacity-30 border-2 border-purple-500">
              <h1 className="text-2xl font-bold font-mono">{insight.title}</h1>
              <h1 className="text-lg font-normal font-mono">{insight.description}</h1>
            </div>
          )
        })
      }
    </div>
  )
}
