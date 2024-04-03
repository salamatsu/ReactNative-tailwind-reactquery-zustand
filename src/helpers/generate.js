import moment from "moment";
import uuid from "react-native-uuid";

export const generateReferenceNumber = () => {
  const id = uuid.v4().replace("-", "").substr(0, 8).toUpperCase();
  return moment().year() + id + moment().format("MMDD");
};
