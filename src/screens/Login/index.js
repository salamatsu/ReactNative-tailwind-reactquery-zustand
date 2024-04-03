import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Portal, Text, TextInput, useTheme } from "react-native-paper";
import AppVersion from "../../components/views/AppVersion";
import ErrorCard from "../../components/views/ErrorCard";
import Loader from "../../components/views/Loader";

import { generateReferenceNumber } from "../../helpers/generate";
import { useOnlineManager } from "../../hooks/onlineManager";
import { useWindowDimensions } from "../../hooks/useWindowDimension";
import { useLogin } from "../../services/queries/useAuth";
import { useUserAuthStore } from "../../store/useUserAuthStore";

const Login = () => {
  generateReferenceNumber();
  const theme = useTheme();
  const { isConnected } = useOnlineManager();
  const [isShownPassword, setisShownPassword] = useState(true);
  const { setUserInfo, setToken, setRefreshToken } = useUserAuthStore();

  const { isTablet } = useWindowDimensions();

  const handleTogglePassword = () => {
    setisShownPassword((prevState) => !prevState);
  };

  const { isLoading, mutate, isError, error, reset } = useLogin({
    onSuccess: (data) => {
      setUserInfo(data?.data?.data);
      setToken(data?.data?.accessToken);
      setRefreshToken(data?.data?.refreshToken);
    },
  });

  const containerFlexDirection = isTablet ? "row" : "column";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "banawecashier1@gmail.com",
      password: "Pelayo2023@!",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: containerFlexDirection,
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          padding: 16,
          justifyContent: isTablet ? "center" : "flex-end",
          ...(isTablet && { paddingRight: 50, flex: 1 }),
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <ErrorCard
            visible={isError}
            message={error?.response?.data?.message}
            onClose={reset}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ marginBottom: 10 }}>
              <Controller
                control={control}
                rules={{
                  required: "This field is required",
                  // validate: {
                  //   // maxLength: (v) => v.length <= 50 || "The email should have at most 50 characters",
                  //   matchPattern: (v) =>
                  //     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  //     "Email address must be a valid address",
                  // },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      name="username"
                      onChangeText={onChange}
                      placeholder="Email"
                      size="small"
                      autoCapitalize="none"
                      label="Email Address"
                      mode="outlined"
                      keyboardType="default"
                      onBlur={onBlur}
                      activeOutlineColor={theme.colors.primary}
                      value={value}
                      error={!!errors.email}
                    />

                    {Boolean(errors?.email) && (
                      <Text style={{ color: theme.colors.error }}>
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
                name="username"
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <Controller
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Password"
                      autoCapitalize="none"
                      label="Password"
                      mode="outlined"
                      activeOutlineColor={theme.colors.primary}
                      secureTextEntry={isShownPassword}
                      right={
                        <TextInput.Icon
                          onPress={handleTogglePassword}
                          icon={isShownPassword ? "eye-off" : "eye"}
                        />
                      }
                      value={value}
                      error={errors.password}
                      //   disabled={isLoading}
                    />
                    {Boolean(errors?.password) && (
                      <Text style={{ color: theme.colors.error }}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
                name="password"
              />
            </View>
          </KeyboardAvoidingView>

          <View style={styles.buttonContainer}>
            <Button
              labelStyle={{ fontSize: 16 }}
              buttonColor={theme.colors.primary}
              // icon="login"
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              //   loading={isLoading}
              disabled={isConnected ? false : true}
            >
              Sign In
            </Button>
            {isConnected ? null : (
              <Text style={{ color: "red", textAlign: "center" }}>
                Internet is required to proceed.
              </Text>
            )}
          </View>
        </View>

        {/* FOOTER */}
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <AppVersion textStyles={{ fontSize: 12 }} />
          </View>
        </View>
      </View>
      <Portal>
        {isLoading ? (
          <View style={{ flex: 1, backgroundColor: "#abababa6" }}>
            <Loader title="Logging in." message="Please wait..." />
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonContainer: {
    paddingTop: 10,
  },
});
