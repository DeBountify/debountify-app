import React, { useState } from "react";
import GradientButton from "../common/GradientButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import InputBox from "../common/InputBox";
import { useWallet } from "@solana/wallet-adapter-react";
import { pinFileToIPFS } from "@/actions/pinata";
import { Button } from "../ui/button";
import { showAlert } from "../common/Alert";

const RegisterInput = ({
  walletAddress,
  handleRegister,
  isRegister,
  setIsRegister,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
    setIsRegister(true);
  };
  return (
    <div>
      <h2 className="text-center mb-4">Don't have an account?</h2>
      <AlertDialog open={!isRegister || isOpen}>
        <AlertDialogTrigger asChild>
          <GradientButton
            className="w-full text-white bg-gradient-to-r from-btn_purple_l to-btn_purple_r"
            title="Register Now"
            onClick={(e) => setIsOpen(true)}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Join us and help securing the world!
            </AlertDialogTitle>
            <AlertDialogDescription>
              <RegisterDailog
                walletAddress={walletAddress}
                handleRegister={handleRegister}
                setIsOpen={close}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const RegisterDailog = ({ handleRegister, setIsOpen }) => {
  const wallet = useWallet();
  const [fileURL, setFileURL] = useState("");
  const [userImageURL, setUserImageURL] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const initialFormData = {
    user_name: "",
    user_image: "",
    user_type: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const onInputFunction = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [id]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.user_image = userImageURL;
    if (userImageURL === "") return alert("Please upload file");
    const newFormErrors = {};

    // Validate inputs
    if (!formData.user_image) {
      newFormErrors.user_image = "Please select user image";
    }
    if (!formData.user_type) {
      newFormErrors.user_type = "Please select user type";
    }

    // If any errors, set the formErrors state
    if (Object.keys(newFormErrors).length > 0) {
      return setError(newFormErrors);
    }
    
    handleRegister(formData);
  };

  const UploadFile = async (e) => {
    e.preventDefault();
    try {
      setUploadingImage(true);
      if (!fileURL) return alert("Please select a file");
      const data = await pinFileToIPFS(fileURL);
      setUserImageURL(data.IpfsHash);
      showAlert("File uploaded successfully", true, "img_upload_success");
    } catch (e) {
      console.log(e);
    } finally {
      setUploadingImage(false);
    }
  };
  return (
    <div>
      <InputBox
        labelClassname="text-white text-2xl"
        error={error?.user_name}
        name="user_name"
        id="user_name"
        value={formData.user_name}
        setFunction={onInputFunction}
        label="Full Name"
        type="text"
        className="w-[40%]"
        placeholder="Enter Full Name"
      />
      <div className="flex flex-row gap-3 items-center justify-between">
        <InputBox
         labelClassname="text-white text-2xl"
          type="file"
          title="User Image"
          label="Upload User Image"
          error={error?.user_image}
          required={true}
          onChange={(e) => setFileURL(e.target.files[0])}
        />
        <Button
          className="bg-purple-500 hover:bg-purple-300 transition-all mt-5"
          onClick={UploadFile}
          disabled={uploadingImage}
        >
          {uploadingImage ? "Uploading..." : "Upload File"}
        </Button>
      </div>
      <InputBox
        labelClassname="text-white text-2xl"
        name="wallet"
        id="wallet"
        value={wallet.publicKey?.toBase58()}
        label="Wallet Address"
        type="text"
        className="w-[40%]"
        disabled
      />
      <div className="mb-4 flex flex-col">
        <label className="text-white text-2xl marck">User type</label>
        <select
          className="rounded-md bg-gray-800 text-white p-3"
          name="user_type"
          id="user_type"
          value={formData.user_type}
          onChange={onInputFunction}
        >
          <option value="">Select type</option>
          <option value="Hacker">User</option>
          <option value="Company">Company</option>
        </select>
        {error?.user_type && (
          <p className="text-red-500 text-sm">{error?.user_type}</p>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={setIsOpen}
          className="bg-gray-500 text-white hover:bg-gray-400 hover:text-black transition-all"
        >
          Close
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleSubmit}
          className="bg-indigo-600 text-white hover:border hover:bg-indigo-500 transition-all hover:text-black"
          disabled={userImageURL === ""}
 
        >
          Register
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );
};

export default RegisterInput;
