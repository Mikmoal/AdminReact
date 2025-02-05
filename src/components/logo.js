import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = "#FF2819";

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 120.000000 120.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,120.000000) scale(0.100000,-0.100000)"
        fill={fillColor}
        stroke="none"
      >
        <path
          d="M460 1156 c-69 -20 -114 -41 -177 -84 -71 -49 -110 -90 -155 -162
-68 -111 -91 -190 -90 -315 1 -240 159 -457 390 -537 96 -33 249 -32 345 1
220 75 372 270 392 501 23 265 -163 525 -425 595 -66 18 -218 18 -280 1z m419
-293 c22 -15 23 -20 17 -87 -9 -107 -22 -144 -59 -166 -18 -11 -42 -20 -54
-20 -28 0 -29 -10 -4 -41 35 -46 194 -274 198 -287 4 -9 -17 -12 -85 -12 l-90
0 -122 165 -122 165 -88 0 -88 0 -11 -50 c-6 -27 -14 -68 -17 -90 l-7 -40 -73
0 c-65 0 -74 2 -74 18 0 16 32 170 55 269 5 23 6 23 243 25 223 3 237 4 240
22 2 10 -2 22 -10 27 -7 5 -111 9 -232 9 l-218 0 6 26 c4 15 10 39 13 55 l6
29 276 0 c241 0 280 -2 300 -17z"
fill={fillColor}
        />
        <path d="M1128 203 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" 
        fill={fillColor}/>
        <path
          d="M1171 180 c14 -31 19 -36 19 -24 0 6 -7 19 -16 30 -14 18 -14 18 -3
-6z"
fill={fillColor}
        />
        <path
          d="M1140 171 c0 -5 -8 -11 -17 -13 -15 -3 -14 -5 5 -10 17 -5 22 -2 22
13 0 10 -2 19 -5 19 -3 0 -5 -4 -5 -9z"
fill={fillColor}
        />
        <path
          d="M1081 162 c-1 -20 18 -52 32 -52 9 0 9 2 0 8 -7 4 -16 19 -22 32 -5
14 -10 19 -10 12z"
fill={fillColor}
        />
      </g>
    </svg>
    // <svg
    //   fill="none"
    //   height="100%"
    //   viewBox="0 0 24 24"
    //   width="100%"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     opacity={0.16}
    //     d="M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z"
    //     fill={fillColor}
    //   />
    //   <path
    //     d="M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z"
    //     fill={fillColor}
    //   />
    // </svg>
  );
};
