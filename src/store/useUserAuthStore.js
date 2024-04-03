import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  userInfo: {
    id: 2,
    adminId: "ZX4A98DWAT96KSS9ZDPMEJ3A",
    name: "GLOBALTECH",
    businessName: "",
    birId: "",
    tindId: "",
    address: "",
    userType: "APPUSER",
    isDeleted: 0,
    dateCreated: "2023-10-03",
    dateUpdated: "2023-10-03",
  },
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1SWQiOiJaWDRBOThEV0FUOTZLU1M5WkRQTUVKM0EiLCJpYXQiOjE2OTY5Mzk5MjgsImV4cCI6MTY5NzM3MTkyOH0.GyKYKsk-ZvpzFp8rIzadArIsl5j-Kt5vzEXvy_TXD2UWkHTtzLA9l0AFGBK10T_8PyLzxU8OAxxAiO_2CAAungdqMWrOD83HX3Q1F_EOZmU9ZvcrUhQ2LDDTMkbXBKO-gp-9jT3NMIoxGiElVlnqyXE0BAfUmPrtNR8GKpyccgazH13nDbv9dqnmSjt2VdvjYqYq_uBwrr80yi5CmWJT8rMN-dK1TpNs422W20j7_bX5jSLT0JMUZ3lgFwf0k8wbMl2msQpYk-BE7SLnISi3KpGNQEQ4Bjh4jnPdbdk6FThWc4WmP4F9je3gRsEPPFMuy46c2kzkI_ddFoVmibSQ",
};

export const useUserAuthStore = create(
  persist(
    (set) => ({
      userInfo: null,
      token: null,
      refreshToken: null,
      setUserInfo: (userInfo) => set({ userInfo }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      reset: () => set({ token: null, userInfo: null }),
    }),
    {
      name: "user-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
