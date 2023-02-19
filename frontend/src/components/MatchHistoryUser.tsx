interface typeProps{
    data:any
}

export default function MatchHistoryUser({data}:typeProps){

    
    return(
        <tr>
        <td className="flex items-center gap-3 pt-5">
          <img
            src={data.pictureLink}
            alt="Player"
            className="h-10 w-10 rounded-full"
          />
          <span className="w-32 overflow-hidden text-ellipsis text-sm text-primaryText">
            {data.username.charAt(0).toUpperCase() + data.username.slice(1)}
          </span>
        </td>
        <td className="pt-5 text-center text-sm text-primaryText">{data.score}</td>
        <td className="pt-5 text-center">
            {
                (data.state === "WIN")?(
                    <span className="w-full rounded-sm bg-winBadge px-2  text-sm text-textWinBadge sm:px-8">
                    WIN
                  </span>
                ):(
                    <span className="w-full rounded-sm bg-loseBadge px-2  text-sm text-textLoseBadge sm:px-8">
                    LOSE
                  </span>
                )
            }
        </td>
      </tr>
    )
}