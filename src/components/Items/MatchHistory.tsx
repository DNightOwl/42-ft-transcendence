import React from "react";

export default function MatchHistory() {
  return (
    <div className="content-profile flex pt-10 lg:pb-10">
      <table className="table w-full ">
        <thead>
          <tr className="rounded-xl bg-body font-medium text-primaryText shadow">
            <th className="rounded-xl p-4 text-left">Players</th>
            <th className="p-4">Score</th>
            <th className="p-4">Date</th>
            <th className="rounded-xl p-4">Stat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex items-center gap-3 pt-5">
              <img
                src="https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg"
                alt="Player"
                className="h-10 w-10 rounded-full"
              />
              <span className="w-32 overflow-hidden text-ellipsis text-sm text-primaryText">
                {"mouassit".charAt(0).toUpperCase() + "mouassit".slice(1)}
              </span>
            </td>
            <td className="pt-5 text-center text-sm text-primaryText">5 - 0</td>
            <td className="pt-5 text-center text-primaryText">20/01/2023</td>
            <td className="pt-5 text-center">
              <span className="w-full rounded-sm bg-winBadge px-2  text-sm text-textWinBadge sm:px-8">
                WIN
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
