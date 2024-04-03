import { StyleSheet } from "react-native";
import React from "react";
import { Card, IconButton, Text, useTheme } from "react-native-paper";

const ErrorCard = ({ visible, message, onClose = () => {} }) => {
  const theme = useTheme();
  return visible ? (
    <Card style={ { marginTop: 10, borderRadius: 0, marginBottom: 10, backgroundColor: theme.colors.errorContainer } }>
      <Card.Content>
        <IconButton
          style={ { position: "absolute", right: -24, top: -24 } }
          iconColor={ theme.colors.error }
          size={ 28 }
          icon="close-circle"
          onPress={ onClose }
        />
        <Text>{ message }</Text>
      </Card.Content>
    </Card>
  ) : null;
};

export default ErrorCard;

const styles = StyleSheet.create({});
