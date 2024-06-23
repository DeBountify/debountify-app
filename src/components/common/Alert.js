import { toast } from "react-toastify";

export function showAlert(error, isMsg = false, customId=1) {
  if (!isMsg) {
    if (typeof error !== "string") {
      Object.keys(error)?.map((key) => {
        return toast.error('Error: ' + error[key][0], {
          toastId: customId
        });
      });
    } else {
      toast.error(error, {
        toastId: customId
      });
    }
  } else {
    toast.success(error, {
      toastId: customId
    });
  }
}