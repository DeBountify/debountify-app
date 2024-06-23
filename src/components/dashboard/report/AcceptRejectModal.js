import IconTemplate from "@/components/icons/IconTemplate";
import InputBox from "@/components/common/InputBox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

const AcceptRejectModal = ({
  isOpen,
  openFunction,
  forAccept,
  loading,
  setValue,
  handleSubmit,
}) => {
  return (
    <div>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {forAccept ? "Accept Bug Report" : "Reject Bug Report"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <InputBox
              label={forAccept ? "Payable Amount" : "Reject Reason"}
              labelClassname="text-white text-lg"
              placeholder={forAccept ? "Enter payable amount" : "Enter reason"}
              setFunction={setValue}
            />
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => openFunction(false)}
              className="bg-gray-500 text-white hover:bg-gray-400 hover:text-black transition-all rounded-lg p-2"
            >
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-indigo-600 text-white hover:border hover:bg-indigo-500 transition-all hover:text-black rounded-lg p-2"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <IconTemplate
                  icon={"fa-solid:spinner"}
                  className="text-white text-2xl animate-spin"
                />
              ) : (
                "Save"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AcceptRejectModal;
