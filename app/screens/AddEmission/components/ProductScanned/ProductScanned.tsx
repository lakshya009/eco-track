import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import Slider from "@react-native-community/slider";
import { FormattedNumber } from "react-native-globalize";

import { Text } from "components";
import { userPreferences } from "ducks";
import { t, calculation } from "utils";
import { Colors } from "style";

import styles from "./ProductScanned.styles";

const MIN_SLIDER_VALUE = 1;
const MAX_SLIDER_VALUE = 10;

interface Props {
  productCarbonFootprint: number;
  defaultValueSlider:number;
  setProductScannedQuantity: (arg0: number) => void;
}

const ProductScanned: React.FC<Props> = ({ setProductScannedQuantity, defaultValueSlider, productCarbonFootprint }) => {
  const [sliderValue, setSliderValue] = useState(defaultValueSlider);

  const emissionAmount = Math.round(sliderValue) * productCarbonFootprint
  
  const onSliderValueChange = (value: number) => {
    setSliderValue(value);
    setProductScannedQuantity(Math.round(value));
  };

  const useMetricUnits = useSelector(userPreferences.selectors.getUseMetricUnits);
  const getDisplayUnitsValue = calculation.getDisplayUnitsValue;
  const getDisplayUnits = calculation.getDisplayUnits;

  if (!productCarbonFootprint) {
    return;
  }

  return (
    <>
      <View style={styles.container}>
        <Text.H3 style={styles.header}>{t("ADD_EMISSION_SCREEN_QUANTITY_OF_EMISSION")}</Text.H3>
        <View style={{ flexDirection: "row" }}>
          <Text.H2 darkGray>
            {Math.round(sliderValue) + " "}
            <Text.Primary>{t("ADD_EMISSION_SCREEN_ITEMS") + " - "}</Text.Primary>
          </Text.H2>
          <Text.H2 darkGray>
            <FormattedNumber
              value={getDisplayUnitsValue(emissionAmount, useMetricUnits)}
              maximumFractionDigits={1}
            />{" "}
            <Text.Primary>{getDisplayUnits(emissionAmount, useMetricUnits) + "CO2eq"}</Text.Primary>
          </Text.H2>
        </View>
      </View>
      <Slider
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.grey}
        thumbTintColor={Colors.primary}
        style={styles.slider}
        maximumValue={MAX_SLIDER_VALUE}
        minimumValue={MIN_SLIDER_VALUE}
        value={sliderValue}
        onSlidingComplete={onSliderValueChange}
      />
    </>
  );
};

export default ProductScanned;