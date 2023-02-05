import React from 'react'

interface  typeProps{
  edit?:string;
}

export function ArrowDownIcon(props:typeProps) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={props.edit} viewBox="0 0 9.703 5.531">
    <g id="Group_20" data-name="Group 20" transform="translate(0 0)">
      <path id="Path_28" data-name="Path 28" d="M4.852,102.671a.677.677,0,0,1-.48-.2L.2,98.3a.679.679,0,0,1,.961-.961l3.691,3.692L8.543,97.34A.679.679,0,0,1,9.5,98.3l-4.172,4.172A.677.677,0,0,1,4.852,102.671Z" transform="translate(-0.001 -97.141)" fill="#81879c"/>
    </g>
  </svg>
  
    )
  }

  export function ArrowUpIcon(props:typeProps) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.703 5.531" className={props.edit}>
  <g id="Group_21" data-name="Group 21" transform="translate(9.703 5.531) rotate(180)">
    <g id="Group_20" data-name="Group 20" transform="translate(0 0)">
      <path id="Path_28" data-name="Path 28" d="M4.852,102.671a.677.677,0,0,1-.48-.2L.2,98.3a.679.679,0,0,1,.961-.961l3.691,3.692L8.543,97.34A.679.679,0,0,1,9.5,98.3l-4.172,4.172A.677.677,0,0,1,4.852,102.671Z" transform="translate(-0.001 -97.141)"/>
    </g>
  </g>
</svg>

    )
  }

  export function ControllerIcon(props:typeProps) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.861 21.3" className={props.edit} fill='#fff'>
    <g id="Group_39" data-name="Group 39" transform="translate(0 0)">
      <path id="XMLID_948_" d="M30.794,14.212A9.714,9.714,0,0,0,21.3,6H12.664a9.741,9.741,0,0,0-9.6,8.212C2.32,19.224,2,21.464,2,22.317a5.021,5.021,0,0,0,9.491,2.24L13.3,20.93h7.252l1.813,3.626a5.021,5.021,0,0,0,9.491-2.24C31.861,21.57,31.861,22.53,30.794,14.212Zm-1.066,8.105c0,2.986-4.159,4.053-5.439,1.28l-2.133-4.266a1.12,1.12,0,0,0-.96-.533H12.664a1.025,1.025,0,0,0-.96.64L9.572,23.7c-1.28,2.666-5.439,1.6-5.439-1.386L5.2,14.532a7.545,7.545,0,0,1,7.358-6.4H21.2a7.462,7.462,0,0,1,7.358,6.4C28.661,14.638,29.834,22.85,29.728,22.317Z" transform="translate(-2 -6)"/>
      <path id="XMLID_82_" d="M14.4,13.2a1.008,1.008,0,0,1-1.066,1.066H12.266v1.066A1.008,1.008,0,0,1,11.2,16.4a1.008,1.008,0,0,1-1.066-1.066V14.266H9.066a1.066,1.066,0,1,1,0-2.133h1.066V11.066A1.008,1.008,0,0,1,11.2,10a1.008,1.008,0,0,1,1.066,1.066v1.066h1.066A1.008,1.008,0,0,1,14.4,13.2Z" transform="translate(-1.601 -5.734)"/>
      <path id="XMLID_84_" d="M20.133,13.066A1.066,1.066,0,1,1,19.066,12,1.008,1.008,0,0,1,20.133,13.066Z" transform="translate(-0.937 -5.601)"/>
      <path id="XMLID_85_" d="M22.133,15.066A1.066,1.066,0,1,1,21.066,14,1.008,1.008,0,0,1,22.133,15.066Z" transform="translate(-0.804 -5.468)"/>
      <path id="XMLID_86_" d="M24.133,13.066A1.066,1.066,0,1,1,23.066,12,1.008,1.008,0,0,1,24.133,13.066Z" transform="translate(-0.671 -5.601)"/>
      <path id="XMLID_87_" d="M20,11.066a1.066,1.066,0,1,1,2.133,0,1.066,1.066,0,1,1-2.133,0Z" transform="translate(-0.804 -5.734)"/>
    </g>
  </svg>
  
    )
  }

  export function HomeIcon() {
    return (
    <svg id="Group_7" data-name="Group 7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path id="Path_18" data-name="Path 18" d="M33.4,40H6.6A6.7,6.7,0,0,1,0,33.32V18.72a6.557,6.557,0,0,1,2.2-4.88L15.6,1.68a6.6,6.6,0,0,1,8.8,0L37.8,13.84A6.494,6.494,0,0,1,40,18.72v14.6A6.7,6.7,0,0,1,33.4,40ZM20,4.12a3.226,3.226,0,0,0-1.8.6L4.8,16.88A2.352,2.352,0,0,0,4,18.92v14.6a2.683,2.683,0,0,0,2.6,2.64H33.2a2.656,2.656,0,0,0,2.6-2.64V18.92a3.8,3.8,0,0,0-.8-2.04L21.6,4.72a2.271,2.271,0,0,0-1.6-.6Z" transform="translate(0 0)"/>
    </svg>
    )
  }

  export function MessagesIcon() {
    return (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 43 43">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_4" data-name="Rectangle 4" width="43" height="43"/>
      </clipPath>
    </defs>
    <g id="Group_11" data-name="Group 11" transform="translate(-5.508 73.493)">
      <g id="Group_10" data-name="Group 10" transform="translate(5.508 -73.493)">
        <g id="g885">
          <g id="g887">
            <g id="Group_13" data-name="Group 13">
              <g id="Group_12" data-name="Group 12" clipPath="url(#clip-path)">
                <g id="g889" transform="translate(0 0)">
                  <g id="g895">
                    <g id="path897">
                      <path id="Path_19" data-name="Path 19" d="M7.179-30.693A1.671,1.671,0,0,1,6-31.183a1.672,1.672,0,0,1-.409-1.695l2.757-8.562A21.278,21.278,0,0,1,5.507-52.095a21.264,21.264,0,0,1,1.682-8.328,21.326,21.326,0,0,1,4.585-6.8,21.326,21.326,0,0,1,6.8-4.585,21.267,21.267,0,0,1,8.33-1.682,21.268,21.268,0,0,1,8.33,1.682,21.327,21.327,0,0,1,6.8,4.585,21.325,21.325,0,0,1,4.585,6.8,21.267,21.267,0,0,1,1.682,8.33,21.267,21.267,0,0,1-1.682,8.33,21.327,21.327,0,0,1-4.585,6.8,21.327,21.327,0,0,1-6.8,4.585,21.268,21.268,0,0,1-8.33,1.682h-.032a21.273,21.273,0,0,1-10.621-2.838L7.691-30.773A1.67,1.67,0,0,1,7.179-30.693Zm9.284-6.333a1.671,1.671,0,0,1,.887.255,17.941,17.941,0,0,0,9.527,2.735H26.9A18.077,18.077,0,0,0,44.962-52.092,18.076,18.076,0,0,0,26.906-70.148,18.076,18.076,0,0,0,8.85-52.092a17.942,17.942,0,0,0,2.735,9.557,1.672,1.672,0,0,1,.174,1.4l-1.99,6.181,6.181-1.99A1.669,1.669,0,0,1,16.462-37.026Z" transform="translate(-5.507 73.492)"/>
                    </g>
                  </g>
                  <g id="g899" transform="translate(19.31 19.31)">
                    <g id="path901">
                      <path id="Path_20" data-name="Path 20" d="M317.687,236.6a2.09,2.09,0,0,1-2.09,2.09h0a2.09,2.09,0,0,1-2.09-2.09h0a2.09,2.09,0,0,1,2.09-2.09h0a2.09,2.09,0,0,1,2.09,2.09h0" transform="translate(-313.507 -234.507)" />
                    </g>
                  </g>
                  <g id="g903" transform="translate(27.669 19.31)">
                    <g id="path905">
                      <path id="Path_21" data-name="Path 21" d="M451.02,236.6a2.09,2.09,0,0,1-2.09,2.09h0a2.09,2.09,0,0,1-2.09-2.09h0a2.09,2.09,0,0,1,2.09-2.09h0a2.09,2.09,0,0,1,2.09,2.09h0" transform="translate(-446.84 -234.507)"/>
                    </g>
                  </g>
                  <g id="g907" transform="translate(10.951 19.31)">
                    <g id="path909">
                      <path id="Path_22" data-name="Path 22" d="M184.354,236.6a2.09,2.09,0,0,1-2.09,2.09h0a2.09,2.09,0,0,1-2.09-2.09h0a2.09,2.09,0,0,1,2.09-2.09h0a2.09,2.09,0,0,1,2.09,2.09h0" transform="translate(-180.174 -234.507)"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
  
  
    )
  }

  export function SearchIcon(props:typeProps) {
    return (
      <svg  className={"icon " + props.edit} fill='#81879C' id="Group_212" data-name="Group 212" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.534 28.543">
        <g id="layer1">
          <path id="circle2017" d="M13.311,291.161a12.8,12.8,0,1,0,7.972,22.8l5.331,5.328a1.425,1.425,0,0,0,2.017-2.014l-5.331-5.33a12.783,12.783,0,0,0-9.989-20.781Zm0,2.845a9.958,9.958,0,1,1-9.953,9.953,9.929,9.929,0,0,1,9.953-9.953Z" transform="translate(-0.514 -291.161)"/>
        </g>
      </svg>
  
    )
  }

  export function UserIcon() {
    return (
      <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.964 43.107">
    <g id="Group_139" data-name="Group 139" transform="translate(0 0)">
      <path id="Path_45" data-name="Path 45" d="M97.414,20.765a10.047,10.047,0,0,0,7.341-3.042,10.047,10.047,0,0,0,3.041-7.341,10.047,10.047,0,0,0-3.042-7.341,10.38,10.38,0,0,0-14.682,0,10.046,10.046,0,0,0-3.042,7.341,10.047,10.047,0,0,0,3.042,7.341A10.05,10.05,0,0,0,97.414,20.765ZM91.86,4.828a7.854,7.854,0,0,1,11.109,0,7.506,7.506,0,0,1,2.3,5.554,7.506,7.506,0,0,1-2.3,5.555,7.853,7.853,0,0,1-11.109,0,7.5,7.5,0,0,1-2.3-5.555,7.505,7.505,0,0,1,2.3-5.554Zm0,0" transform="translate(-79.704)"/>
      <path id="Path_46" data-name="Path 46" d="M35.877,259.641a25.646,25.646,0,0,0-.349-2.724,21.459,21.459,0,0,0-.67-2.739,13.528,13.528,0,0,0-1.126-2.554,9.628,9.628,0,0,0-1.7-2.212A7.485,7.485,0,0,0,29.6,247.88a8.428,8.428,0,0,0-3.113-.563,3.16,3.16,0,0,0-1.687.716c-.506.33-1.1.711-1.758,1.133a10.073,10.073,0,0,1-2.275,1,8.832,8.832,0,0,1-5.564,0,10.043,10.043,0,0,1-2.273-1c-.654-.418-1.246-.8-1.76-1.134a3.157,3.157,0,0,0-1.687-.716,8.418,8.418,0,0,0-3.113.564,7.479,7.479,0,0,0-2.439,1.532,9.631,9.631,0,0,0-1.7,2.212A13.553,13.553,0,0,0,1.1,254.179a21.513,21.513,0,0,0-.67,2.738,25.471,25.471,0,0,0-.349,2.725c-.057.823-.086,1.68-.086,2.546A7.158,7.158,0,0,0,2.126,267.6a7.652,7.652,0,0,0,5.478,2H28.36a7.653,7.653,0,0,0,5.478-2,7.155,7.155,0,0,0,2.126-5.416c0-.869-.03-1.725-.087-2.546ZM32.1,265.773a5.152,5.152,0,0,1-3.736,1.3H7.6a5.152,5.152,0,0,1-3.736-1.3,4.674,4.674,0,0,1-1.342-3.585c0-.808.027-1.605.08-2.371a22.974,22.974,0,0,1,.316-2.453,18.971,18.971,0,0,1,.589-2.414,11.033,11.033,0,0,1,.916-2.077,7.138,7.138,0,0,1,1.247-1.635A4.965,4.965,0,0,1,7.3,250.229a5.813,5.813,0,0,1,1.989-.384c.088.047.246.137.5.3.519.338,1.118.725,1.78,1.147a12.516,12.516,0,0,0,2.855,1.276,11.357,11.357,0,0,0,7.118,0,12.53,12.53,0,0,0,2.857-1.277c.677-.433,1.259-.808,1.778-1.146.255-.166.413-.256.5-.3a5.817,5.817,0,0,1,1.99.384,4.973,4.973,0,0,1,1.622,1.009,7.118,7.118,0,0,1,1.247,1.635,11,11,0,0,1,.917,2.076,18.929,18.929,0,0,1,.589,2.414,23.166,23.166,0,0,1,.316,2.454h0c.054.763.081,1.56.081,2.37a4.674,4.674,0,0,1-1.342,3.585Zm0,0" transform="translate(0 -226.494)"/>
    </g>
  </svg>
  
    )
  }

  export function PointsIcon(props:typeProps) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.616 2.804" className={props.edit}>
      <g id="Group_97" data-name="Group 97" transform="translate(0 2.804) rotate(-90)">
        <g id="Filled">
          <g id="Group_89" data-name="Group 89" transform="translate(0)">
            <g id="Group_86" data-name="Group 86" transform="translate(0 4.906)">
              <path id="Path_38" data-name="Path 38" d="M0,1.4A1.4,1.4,0,1,1,1.4,2.8,1.4,1.4,0,0,1,0,1.4Z"/>
            </g>
            <g id="Group_87" data-name="Group 87" transform="translate(0 9.813)">
              <path id="Path_39" data-name="Path 39" d="M0,1.4A1.4,1.4,0,1,1,1.4,2.8,1.4,1.4,0,0,1,0,1.4Z"/>
            </g>
            <g id="Group_88" data-name="Group 88">
              <path id="Path_40" data-name="Path 40" d="M0,1.4A1.4,1.4,0,1,1,1.4,2.8,1.4,1.4,0,0,1,0,1.4Z"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  
    )
  }


  export function SendIcon(props:typeProps){
    return(
      <svg id="Group_112" data-name="Group 112" className={props.edit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.575 23.746">
  <g id="Group_111" data-name="Group 111" transform="translate(0 0)">
    <g id="Group_110" data-name="Group 110">
      <path id="Path_44" data-name="Path 44" d="M25.046,27.063,1.3,16.1a.918.918,0,0,0-1.092.256A.908.908,0,0,0,.184,17.48L7.993,27.893.184,38.305A.913.913,0,0,0,1.3,39.682L25.044,28.722a.913.913,0,0,0,0-1.659Z" transform="translate(0 -16.02)"/>
    </g>
  </g>
</svg>

    )
  }

  export function ArrowLeftIcon(props:typeProps){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.04 492" className={props.edit}>
  <g id="Group_546" data-name="Group 546" transform="translate(-101.48)">
    <path id="Path_112" data-name="Path 112" d="M198.608,246.1,382.664,62.04a26.972,26.972,0,0,0,0-38.056L366.536,7.864a26.957,26.957,0,0,0-38.06,0L109.328,227.008a27.161,27.161,0,0,0,0,38.2L328.272,484.136a26.962,26.962,0,0,0,38.064,0l16.124-16.12a26.945,26.945,0,0,0,0-38.06Z"/>
  </g>
</svg>
    )
  }
  
export function PlusIcon(props:typeProps)
{
  return(
    <svg id="Group_147" data-name="Group 147" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.95 22.95" className={props.edit}>
  <g id="Group_14" data-name="Group 14">
    <path id="Path_23" data-name="Path 23" d="M20.932,9.458H13.492V2.017a2.017,2.017,0,1,0-4.034,0V9.458H2.017a2.017,2.017,0,1,0,0,4.034H9.458v7.441a2.017,2.017,0,1,0,4.034,0V13.492h7.441a2.017,2.017,0,1,0,0-4.034Z"/>
  </g>
</svg>

  )
}


export function GroupIcon(props:typeProps)
{
  return(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.75 22.181" className={props.edit}>
  <g id="Group_149" data-name="Group 149" transform="translate(0 -43.729)">
    <g id="Group_150" data-name="Group 150" transform="translate(0 53.444)">
      <g id="Group_149-2" data-name="Group 149" transform="translate(0 0)">
        <path id="Path_48" data-name="Path 48" d="M22.832,231.69H20.213a3.909,3.909,0,0,0-1.03.138,3.922,3.922,0,0,0-3.494-2.148H11.061a3.922,3.922,0,0,0-3.494,2.148,3.909,3.909,0,0,0-1.03-.138H3.919A3.923,3.923,0,0,0,0,235.609v4.186a2.354,2.354,0,0,0,2.351,2.351H24.4a2.354,2.354,0,0,0,2.351-2.351v-4.186A3.923,3.923,0,0,0,22.832,231.69ZM7.142,233.6v6.98H2.351a.785.785,0,0,1-.784-.784v-4.186a2.354,2.354,0,0,1,2.351-2.351H6.537a2.343,2.343,0,0,1,.615.082C7.146,233.425,7.142,233.512,7.142,233.6Zm10.9,6.98H8.71V233.6a2.354,2.354,0,0,1,2.351-2.351H15.69a2.354,2.354,0,0,1,2.351,2.351Zm7.142-.784a.785.785,0,0,1-.784.784H19.608V233.6c0-.087,0-.173-.01-.259a2.346,2.346,0,0,1,.615-.082h2.619a2.354,2.354,0,0,1,2.351,2.351Z" transform="translate(0 -229.68)"/>
      </g>
    </g>
    <g id="Group_152" data-name="Group 152" transform="translate(1.746 48.054)">
      <g id="Group_151" data-name="Group 151">
        <path id="Path_49" data-name="Path 49" d="M36.9,126.5a3.482,3.482,0,1,0,3.482,3.482A3.486,3.486,0,0,0,36.9,126.5Zm0,5.4a1.915,1.915,0,1,1,1.915-1.915A1.917,1.917,0,0,1,36.9,131.9Z" transform="translate(-33.414 -126.504)"/>
      </g>
    </g>
    <g id="Group_154" data-name="Group 154" transform="translate(8.723 43.729)">
      <g id="Group_153" data-name="Group 153" transform="translate(0 0)">
        <path id="Path_50" data-name="Path 50" d="M171.614,43.729a4.652,4.652,0,1,0,4.652,4.652A4.657,4.657,0,0,0,171.614,43.729Zm0,7.737a3.085,3.085,0,1,1,3.085-3.085A3.088,3.088,0,0,1,171.614,51.466Z" transform="translate(-166.962 -43.729)"/>
      </g>
    </g>
    <g id="Group_156" data-name="Group 156" transform="translate(18.041 48.054)">
      <g id="Group_155" data-name="Group 155">
        <path id="Path_51" data-name="Path 51" d="M348.776,126.5a3.482,3.482,0,1,0,3.482,3.482A3.486,3.486,0,0,0,348.776,126.5Zm0,5.4a1.915,1.915,0,1,1,1.915-1.915A1.917,1.917,0,0,1,348.776,131.9Z" transform="translate(-345.294 -126.504)"/>
      </g>
    </g>
  </g>
</svg>
  )
}


export function EyeChannelIcon(props:typeProps)
{
  return(
    <svg id="Group_143" data-name="Group 143" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.486 14.743" className={props.edit}>
  <path id="Path_47" data-name="Path 47" d="M1.354,6.723a1,1,0,0,1,1.384.124,16.691,16.691,0,0,0,13,6.064,16.691,16.691,0,0,0,13-6.064,1,1,0,0,1,1.384-.124.947.947,0,0,1,.126,1.354,20.329,20.329,0,0,1-2.643,2.59.965.965,0,0,1,.146.211l2.621,5.128a.952.952,0,0,1-.439,1.29.993.993,0,0,1-1.319-.43l-2.58-5.048a18.12,18.12,0,0,1-5.925,2.532l1.174,5.744a.962.962,0,0,1-.771,1.131.982.982,0,0,1-1.157-.754l-1.182-5.783a20.177,20.177,0,0,1-2.441.146,20.181,20.181,0,0,1-2.441-.146L12.12,20.47a.982.982,0,0,1-1.157.754.962.962,0,0,1-.771-1.131l1.174-5.744a18.07,18.07,0,0,1-5.036-1.983L2.769,17.012a1,1,0,0,1-1.376.192.948.948,0,0,1-.2-1.346l3.5-4.56A20.133,20.133,0,0,1,1.228,8.077.947.947,0,0,1,1.354,6.723Z" transform="translate(-1 -6.5)" fill-rule="evenodd"/>
</svg>

  )
}

export function SettingsIcon(props:typeProps)
{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 28.406" className={props.edit}>
  <g id="Group_378" data-name="Group 378" transform="translate(-811 -269)">
    <g id="Group_298" data-name="Group 298" transform="translate(779 291.196)">
      <g id="Layer_2" data-name="Layer 2" transform="translate(5 -69)">
        <path id="Path_74" data-name="Path 74" d="M29.21,11.84a3.92,3.92,0,0,1-3.09-5.3,1.84,1.84,0,0,0-.55-2.07,14.75,14.75,0,0,0-4.4-2.55,1.85,1.85,0,0,0-2.09.58,3.91,3.91,0,0,1-6.16,0,1.85,1.85,0,0,0-2.09-.58,14.82,14.82,0,0,0-4.1,2.3,1.86,1.86,0,0,0-.58,2.13A3.9,3.9,0,0,1,2.9,11.71,1.85,1.85,0,0,0,1.28,13.2,14.14,14.14,0,0,0,1,16a14.32,14.32,0,0,0,.19,2.35A1.85,1.85,0,0,0,2.82,19.9,3.9,3.9,0,0,1,6,25.41a1.82,1.82,0,0,0,.51,2.18,14.86,14.86,0,0,0,4.36,2.51,2,2,0,0,0,.63.11,1.84,1.84,0,0,0,1.5-.78,3.87,3.87,0,0,1,3.2-1.68,3.92,3.92,0,0,1,3.14,1.58,1.84,1.84,0,0,0,2.16.61,15,15,0,0,0,4-2.39,1.85,1.85,0,0,0,.54-2.11,3.9,3.9,0,0,1,3.13-5.39,1.85,1.85,0,0,0,1.57-1.52A14.5,14.5,0,0,0,31,16a14.358,14.358,0,0,0-.251-2.673A1.83,1.83,0,0,0,29.21,11.84ZM21,16a5,5,0,1,1-5-5,5,5,0,0,1,5,5Z" transform="translate(26 45)"/>
      </g>
    </g>
  </g>
</svg>
  )
}

export function Trophy(props:typeProps){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.674 69.682" className={props.edit}>
  <g id="Group_234" data-name="Group 234" transform="translate(0 0)">
    <g id="Group_233" data-name="Group 233" transform="translate(0 0)">
      <path id="Path_66" data-name="Path 66" d="M67.665,5.939a7.466,7.466,0,0,0-5.409-2.334H55.766c.026-1.167.044-2.369.044-3.606H13.957c0,1.237.017,2.439.044,3.606H7.468a7.453,7.453,0,0,0-7.43,7.927C1.205,30.99,11.248,43.2,27.171,45.014L24.087,55.745a6.635,6.635,0,0,0-6.637,6.637v7.3H52.326v-7.3a6.635,6.635,0,0,0-6.637-6.637L42.605,45.014c15.888-1.829,25.922-14.032,27.08-33.482A7.531,7.531,0,0,0,67.665,5.939ZM7,11.113a.513.513,0,0,1,.139-.392.439.439,0,0,1,.331-.139h6.864c1.037,13.7,4.059,21.471,6.994,25.861C10.151,31.757,7.485,19.24,7,11.113Zm41.443,25.3c2.935-4.4,5.949-12.159,6.986-25.843h6.838a.429.429,0,0,1,.331.139.513.513,0,0,1,.139.392C62.238,19.231,59.582,31.713,48.441,36.417Z" transform="translate(-0.025 0.001)"/>
    </g>
  </g>
</svg>

  )
}

export function SettingsNavIcon(props:typeProps){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25" className={props.edit}>
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_46" data-name="Rectangle 46" width="25" height="25" transform="translate(0 -0.432)"/>
    </clipPath>
  </defs>
  <g id="Group_363" data-name="Group 363" transform="translate(359.24 278.145)">
    <g id="g117" transform="translate(-359.24 -277.713)">
      <g id="g119" transform="translate(0 0)">
        <g id="Group_362" data-name="Group 362">
          <g id="Group_361" data-name="Group 361" clip-path="url(#clip-path)">
            <g id="g121" transform="translate(0 -0.152)">
              <g id="g127">
                <g id="path129">
                  <path id="Path_76" data-name="Path 76" d="M-346.194-253.328h-1.541a2.263,2.263,0,0,1-2.26-2.26v-.521a9.909,9.909,0,0,1-1.539-.639l-.369.369a2.244,2.244,0,0,1-1.6.662,2.274,2.274,0,0,1-1.6-.663l-1.089-1.089a2.274,2.274,0,0,1-.662-1.6,2.245,2.245,0,0,1,.662-1.6l.369-.369a9.91,9.91,0,0,1-.639-1.539h-.521a2.263,2.263,0,0,1-2.26-2.26v-1.541a2.263,2.263,0,0,1,2.26-2.26h.521a9.913,9.913,0,0,1,.639-1.539l-.369-.369a2.244,2.244,0,0,1-.662-1.6,2.275,2.275,0,0,1,.662-1.6l1.089-1.089a2.274,2.274,0,0,1,1.6-.662,2.245,2.245,0,0,1,1.6.662l.369.369a9.908,9.908,0,0,1,1.539-.639v-.521a2.263,2.263,0,0,1,2.26-2.26h1.541a2.263,2.263,0,0,1,2.26,2.26v.521a9.91,9.91,0,0,1,1.539.639l.369-.369a2.245,2.245,0,0,1,1.6-.662,2.274,2.274,0,0,1,1.6.662l1.089,1.089a2.274,2.274,0,0,1,.662,1.6,2.244,2.244,0,0,1-.663,1.6l-.369.369a9.918,9.918,0,0,1,.639,1.539h.521a2.263,2.263,0,0,1,2.26,2.26v1.541a2.263,2.263,0,0,1-2.26,2.26h-.521a9.913,9.913,0,0,1-.639,1.539l.369.369a2.244,2.244,0,0,1,.662,1.6,2.274,2.274,0,0,1-.663,1.6l-1.089,1.089a2.274,2.274,0,0,1-1.6.662,2.244,2.244,0,0,1-1.6-.662l-.369-.369a9.912,9.912,0,0,1-1.539.639v.521A2.263,2.263,0,0,1-346.194-253.328Zm-5.466-5.031a.717.717,0,0,1,.366.1,8.478,8.478,0,0,0,2.2.912.719.719,0,0,1,.54.7v1.062a.823.823,0,0,0,.822.822h1.541a.823.823,0,0,0,.822-.822v-1.062a.719.719,0,0,1,.54-.7,8.479,8.479,0,0,0,2.2-.912.719.719,0,0,1,.875.111l.752.752a.815.815,0,0,0,.581.241.826.826,0,0,0,.58-.24l1.09-1.09a.826.826,0,0,0,.241-.581.816.816,0,0,0-.24-.581l-.753-.753a.719.719,0,0,1-.11-.875,8.478,8.478,0,0,0,.912-2.2.719.719,0,0,1,.7-.539h1.062a.823.823,0,0,0,.822-.822v-1.541a.823.823,0,0,0-.822-.822h-1.062a.719.719,0,0,1-.7-.54,8.481,8.481,0,0,0-.912-2.2.719.719,0,0,1,.11-.875l.752-.752a.815.815,0,0,0,.241-.581.826.826,0,0,0-.24-.58l-1.09-1.09a.826.826,0,0,0-.581-.241.816.816,0,0,0-.581.241l-.752.753a.719.719,0,0,1-.875.111,8.48,8.48,0,0,0-2.2-.912.719.719,0,0,1-.54-.7v-1.062a.823.823,0,0,0-.822-.822h-1.541a.823.823,0,0,0-.822.822v1.062a.719.719,0,0,1-.539.7,8.48,8.48,0,0,0-2.2.912.719.719,0,0,1-.875-.11l-.752-.752a.816.816,0,0,0-.581-.241.826.826,0,0,0-.58.24l-1.09,1.09a.826.826,0,0,0-.241.581.815.815,0,0,0,.24.581l.753.753a.719.719,0,0,1,.111.875,8.48,8.48,0,0,0-.912,2.2.719.719,0,0,1-.7.54h-1.062a.822.822,0,0,0-.822.822v1.541a.823.823,0,0,0,.822.822h1.062a.719.719,0,0,1,.7.539,8.475,8.475,0,0,0,.912,2.2.719.719,0,0,1-.11.875l-.752.752a.816.816,0,0,0-.241.581.826.826,0,0,0,.241.581l1.09,1.09a.826.826,0,0,0,.581.241.816.816,0,0,0,.581-.24l.753-.753A.719.719,0,0,1-351.659-258.359Z" transform="translate(359.24 277.88)"/>
                </g>
              </g>
              <g id="g131" transform="translate(6.934 6.934)">
                <g id="path133">
                  <path id="Path_77" data-name="Path 77" d="M-209.3-122.6a5.348,5.348,0,0,1-5.342-5.342,5.348,5.348,0,0,1,5.342-5.342,5.348,5.348,0,0,1,5.342,5.342A5.348,5.348,0,0,1-209.3-122.6Zm0-9.245a3.908,3.908,0,0,0-3.9,3.9,3.908,3.908,0,0,0,3.9,3.9,3.908,3.908,0,0,0,3.9-3.9A3.908,3.908,0,0,0-209.3-131.841Z" transform="translate(214.64 133.28)"/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>

  )
}

export function LogoutIcon(props:typeProps){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.028 23" className={props.edit}>
  <g id="Group_366" data-name="Group 366" transform="translate(-33.082)">
    <path id="Path_78" data-name="Path 78" d="M47.918,21.922A1.078,1.078,0,0,1,46.839,23H36.676a3.6,3.6,0,0,1-3.594-3.594V3.594A3.6,3.6,0,0,1,36.676,0H46.839a1.078,1.078,0,0,1,0,2.156H36.676a1.439,1.439,0,0,0-1.437,1.437V19.406a1.439,1.439,0,0,0,1.437,1.437H46.839A1.078,1.078,0,0,1,47.918,21.922Zm4.876-11.184L47.671,5.614a1.078,1.078,0,1,0-1.525,1.525l3.283,3.283H40.941a1.078,1.078,0,1,0,0,2.156h8.487l-3.283,3.283a1.078,1.078,0,0,0,1.525,1.525l5.123-5.123a1.078,1.078,0,0,0,0-1.525Z"/>
  </g>
</svg>
  )
}

export function CloseIcon(props:typeProps){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.432 25.139" className={props.edit}>
  <g id="Group_179" data-name="Group 179" transform="translate(0 -1.844)">
    <g id="Group_178" data-name="Group 178" transform="translate(0.001 1.844)">
      <g id="close1" transform="translate(0 0)">
        <path id="Path_58" data-name="Path 58" d="M2.411,27.547A2.409,2.409,0,0,1,.7,26.969a2.409,2.409,0,0,1,0-3.4L21.152,3.121A2.409,2.409,0,0,1,24.669,6.4L4.1,26.969A2.409,2.409,0,0,1,2.411,27.547Z" transform="translate(-0.001 -2.421)"/>
        <path id="Path_59" data-name="Path 59" d="M24.245,26.97a2.409,2.409,0,0,1-1.686-.7L2.107,5.82a2.409,2.409,0,0,1,3.4-3.4L26.076,22.875a2.409,2.409,0,0,1,.112,3.4q-.054.058-.112.112a2.409,2.409,0,0,1-1.831.578Z" transform="translate(-1.407 -1.844)"/>
      </g>
    </g>
  </g>
</svg>
  )
}

export function EditAvatarIcon(props:typeProps){
  return(
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.025 28" className={props.edit}>
<g id="Group_408" data-name="Group 408" transform="translate(-2 -2)">
  <g id="Group_407" data-name="Group 407">
    <circle id="Ellipse_16" data-name="Ellipse 16" cx="2.5" cy="2.5" r="2.5" transform="translate(8.5 6)"/>
    <path id="Path_79" data-name="Path 79" d="M17.7,11.3a.967.967,0,0,0-1.4,0L11,16.6,8.7,14.3a.967.967,0,0,0-1.4,0L6,15.6V22h5.8l.1-.1,8.2-8.2Z"/>
    <path id="Path_80" data-name="Path 80" d="M4,23V5A1.075,1.075,0,0,1,5,4H23a1.075,1.075,0,0,1,1,1v5.5a6.465,6.465,0,0,1,2-.4V5a2.946,2.946,0,0,0-3-3H5A2.946,2.946,0,0,0,2,5V23a2.946,2.946,0,0,0,3,3h5.5l.4-2H5a.945.945,0,0,1-1-1Z"/>
    <path id="Path_81" data-name="Path 81" d="M28.9,13.1a3.8,3.8,0,0,0-5.4,0l-.5.5L28.4,19l.5-.5A3.8,3.8,0,0,0,28.9,13.1Z"/>
    <path id="Path_82" data-name="Path 82" d="M13.3,23.3a2.186,2.186,0,0,0-.3.5l-1,5a.806.806,0,0,0,.3.9,1.4,1.4,0,0,0,.9.3l5-1a.55.55,0,0,0,.5-.3L27,20.4,21.6,15Z"/>
  </g>
</g>
</svg>
  )
}