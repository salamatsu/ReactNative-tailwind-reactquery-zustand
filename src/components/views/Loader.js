import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Loader = ({ title = "", message }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {title && (
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          {title}
        </Text>
      )}
      {message && <Text variant="bodyMedium">{message}</Text>}
    </View>
  );
};

export default Loader;
