import React from "react";
import { Svg, Path } from "react-native-svg";

import { SVGPictogramProps } from "../Pictogram";

const PictogramEmailToValidate = ({
  size,
  color,
  ...props
}: SVGPictogramProps) => (
  <Svg fill="none" width={size} height={size} viewBox="0 0 120 120" {...props}>
    <Path
      fill={color}
      d="M98.919 18c11.632 0 21.096 9.422 21.096 21.003 0 10.792-8.218 19.707-18.752 20.872V95.01c0 3.858-3.15 7.001-7.032 7.001H7.032C3.12 102.011 0 98.84 0 95.01V43.67c0-3.887 3.176-7.001 7.032-7.001h70.922C79.124 26.182 88.079 18 98.919 18ZM61.98 70.545 55 75.848a7.029 7.029 0 0 1-4.37 1.528 7.025 7.025 0 0 1-4.376-1.535l-6.179-4.76L8.712 97.343h84.993L61.981 70.545ZM4.688 43.8v50.815l31.596-26.458L4.688 43.8Zm79.295 10.023L65.796 67.646l30.779 26v-33.77a21 21 0 0 1-12.592-6.053ZM36.567 88.01a2.34 2.34 0 0 1 2.344 2.334 2.34 2.34 0 0 1-2.344 2.333 2.34 2.34 0 0 1-2.344-2.333 2.34 2.34 0 0 1 2.344-2.334Zm29.535 0a2.339 2.339 0 0 1 2.344 2.334 2.339 2.339 0 0 1-2.344 2.333H45.943a2.339 2.339 0 0 1-2.344-2.333 2.339 2.339 0 0 1 2.344-2.334h20.16ZM77.96 41.336H9.15a763809.95 763809.95 0 0 1 40.02 30.85c.86.686 2.062.686 2.923 0l.045-.034L81.065 50.17a21.004 21.004 0 0 1-3.106-8.834Zm20.96-18.669c-9.047 0-16.408 7.328-16.408 16.336a16.08 16.08 0 0 0 3.6 10.196 16.368 16.368 0 0 0 12.808 6.14c9.047 0 16.408-7.329 16.408-16.336 0-9.007-7.361-16.336-16.408-16.336Z"
    />
    <Path
      fill={color}
      d="M100.486 50.37a2.443 2.443 0 0 1-1.664.634 2.527 2.527 0 0 1-1.704-.626c-.486-.418-.729-1.002-.729-1.752 0-.666.236-1.226.705-1.68.47-.455 1.045-.682 1.728-.682.672 0 1.237.227 1.697.681.458.455.688 1.015.688 1.68-.001.74-.241 1.322-.721 1.744Zm5.977-14.681a7.238 7.238 0 0 1-1.313 1.752c-.506.491-1.416 1.318-2.729 2.48-.362.328-.653.616-.871.864a3.472 3.472 0 0 0-.488.682c-.108.206-.19.413-.248.619-.059.206-.146.568-.265 1.086-.202 1.1-.837 1.649-1.904 1.649-.555 0-1.02-.18-1.4-.539-.38-.36-.568-.893-.568-1.6 0-.888.14-1.657.417-2.308.275-.65.645-1.22 1.103-1.712.46-.492 1.078-1.076 1.857-1.752a33.292 33.292 0 0 0 1.48-1.34c.304-.301.56-.637.767-1.007.21-.37.312-.77.312-1.204 0-.846-.316-1.559-.952-2.14-.634-.581-1.453-.872-2.456-.872-1.174 0-2.038.293-2.593.88-.555.586-1.023 1.45-1.408 2.591-.363 1.195-1.052 1.792-2.064 1.792a2.042 2.042 0 0 1-1.513-.626c-.41-.417-.615-.868-.615-1.355 0-1.004.325-2.021.975-3.052.651-1.03 1.601-1.884 2.85-2.56C96.083 27.34 97.54 27 99.203 27c1.547 0 2.912.284 4.097.85 1.184.564 2.099 1.333 2.745 2.306a5.63 5.63 0 0 1 .968 3.17c.001.898-.183 1.685-.551 2.362Z"
    />
  </Svg>
);

export default PictogramEmailToValidate;