import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const PLATFORM_DIMENSIONS = {
  mobile: 480,
  tablet: 1500,
};

export const useWindowDimensions = () => {
  const getDimensions = (curr, min, max) => !!(curr > min && curr <= max);

  const [dimensions, setDimensions] = useState({
    isMobile: getDimensions(
      Dimensions.get("window").width,
      0,
      PLATFORM_DIMENSIONS.mobile
    ),
    isTablet: getDimensions(
      Dimensions.get("window").width,
      PLATFORM_DIMENSIONS.mobile,
      PLATFORM_DIMENSIONS.tablet
    ),
    rawW: Dimensions.get("window").width,
    rawH: Dimensions.get("window").height,
  });

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(() => ({
        isMobile: getDimensions(window.width, PLATFORM_DIMENSIONS.mobile),
        isTablet: getDimensions(window.width, PLATFORM_DIMENSIONS.tablet),
      }));
    });

    return () => sub?.remove();
  }, []);

  return { ...dimensions };
};
