import React from "react";
import MatchHistoryUser from "../MatchHistoryUser";

interface typeProps{
  matchHistory:any
}
export default function MatchHistory({matchHistory}:typeProps) {

  
  
  return (
    <div className="content-profile flex pt-10 lg:pb-10">
      <table className="table w-full ">
        <thead>
          <tr className="rounded-xl bg-body font-medium text-primaryText shadow">
            <th className="rounded-xl p-4 text-left">Players</th>
            <th className="p-4">Score</th>
            <th className="rounded-xl p-4">Stat</th>
          </tr>
        </thead>
        <tbody>

          {
            (matchHistory?.length)?(
              matchHistory.map((e:any,index:number)=>{
                return <MatchHistoryUser data={e} key={index}/>
                
              })
            ):null
          }
        </tbody>
      </table>
    </div>
  );
}
