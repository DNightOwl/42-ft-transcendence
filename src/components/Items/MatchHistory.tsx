import React from 'react'

export default function MatchHistory() {
  return (
    <div className='flex pt-10 content-profile lg:pb-10'>
        <table className='table w-full '>
            <tr className='bg-body rounded-xl shadow text-primaryText font-medium'>
                <th className='p-4 text-left rounded-xl'>Players</th>
                <th className='p-4'>Score</th>
                <th className='p-4'>Date</th>
                <th className='p-4 rounded-xl'>Stat</th>
            </tr>
            <tr >
                <td className='pt-5 flex items-center gap-3'>
                  <img src="https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg" alt="Player" className='w-10 h-10 rounded-full'/>
                  <span className='text-primaryText text-sm w-32 overflow-hidden text-ellipsis'>{"mouassit".charAt(0).toUpperCase() + "mouassit".slice(1)}</span>
                </td>
                <td className='text-center pt-5 text-sm text-primaryText'>5 - 0</td>
                <td className='text-center pt-5 text-primaryText'>20/01/2023</td>
                <td className='text-center pt-5'><span className='text-textWinBadge text-sm bg-winBadge w-full  px-2 sm:px-8 rounded-sm'>WIN</span></td>
            </tr>
            
        </table>
    </div>
  )
}
