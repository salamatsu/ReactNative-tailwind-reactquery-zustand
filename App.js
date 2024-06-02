import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { paperTheme } from './src/constants/theme';
import Screen from './src/screens/Screen';


const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ActionSheetProvider>
            <PaperProvider theme={paperTheme}>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar />
                <Screen />
              </SafeAreaView>
            </PaperProvider>
          </ActionSheetProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}