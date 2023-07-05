import { Text, View } from "react-native";
import Toast, { BaseToast, ErrorToast, InfoToast, SuccessToast } from "react-native-toast-message";

const CustomToast = () => {
  const toastConfig = {
    success: (props: any) =>
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 15,
          fontWeight: "400"
        }} />,
    error: (props: any) =>
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }} />,
    info: (props: any) =>
      <InfoToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }} />
  };
  return <Toast config={toastConfig} />;
};
export default CustomToast;
