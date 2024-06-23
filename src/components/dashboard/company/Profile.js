"use client";
import { pinFileToIPFS } from "@/actions/pinata";
import IconTemplate from "@/components/icons/IconTemplate";
import { showAlert } from "@/components/common/Alert";
import GradientButton from "@/components/common/GradientButton";
import InputBox from "@/components/common/InputBox";
import Loader from "@/components/loader/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  clearError,
  clearMessages,
  getUserProfileDetails,
  updateUserProfile,
} from "@/redux/actions/userActions";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const [addSkillModal, setAddSkillModal] = useState(false);
  const { userState, loading, error, msg } = useSelector((state) => state.user);
  const [userSkills, setUserSkills] = useState(userState?.skills);
  const [imageUploading, setImageUploading] = useState(false);
  const [newSkills, setNewSkills] = useState("");

  const dispatch = useDispatch();
  const wallet = useAnchorWallet();

  const handleFileChange = async (e) => {
    e.preventDefault();
    let data;
    try {
      setImageUploading(true);
      data = await pinFileToIPFS(e.target.files[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setImageUploading(false);
    }
    const updatedUser = {
      user_name: userState?.userName,
      user_image: data.IpfsHash,
      skills: userState?.skills,
    };
    updateProfileFunction(updatedUser);
    // You can also trigger the file upload process here if needed
  };
  const handleEditClick = () => {
    if (imageUploading) return;
    // Trigger file input click when edit icon is clicked
    document.getElementById("fileInput").click();
  };

  const saveSkillChange = async (e) => {
    e.preventDefault();
    const newSelectedSkills = `${userSkills}${
      userSkills !== "" ? "," : ""
    }${newSkills}`;
    setUserSkills(newSelectedSkills);
    const updatedUser = {
      user_name: userState?.userName,
      user_image: userState?.userImage,
      skills: newSelectedSkills,
    };
    updateProfileFunction(updatedUser);
    setAddSkillModal(false);
  };

  const removeSkill = async (skill) => {
    if (userSkills === "" || loading) return;
    const selectedSkills = userSkills
      ?.split(",")
      ?.filter((s) => s !== skill)
      ?.toString();
    setUserSkills(selectedSkills);
    const updatedUser = {
      user_name: userState?.userName,
      user_image: userState?.userImage,
      skills: selectedSkills,
    };
    updateProfileFunction(updatedUser);
  };

  const updateProfileFunction = async (data) => {
    dispatch(updateUserProfile(wallet, data));
  };

  useEffect(() => {
    if (error) {
      showAlert(error, false, "error");
      dispatch(clearError());
    }
    if (msg) {
      showAlert(msg, true, "success");
      dispatch(clearMessages());
      if (wallet?.publicKey) {
        dispatch(getUserProfileDetails(wallet));
      }
    }
  }, [error, msg]);

  return (
    <div className="sm:p-16 p-4 mt-12 sm:mt-4">
      {loading ? (
        <Loader center={true} />
      ) : (
        <div
          className="p-8 bg-opacity-10 flex-col rounded-lg bg-blue-600 mt-4"
          style={{
            borderRadius: "1.25rem",
            border: "1px solid #F8F9FA",
            boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-base text-center order-last md:order-first mt-20 md:mt-0">
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-white-700  ">
                  {userState?.userType === "Company"
                    ? userState?.bountyProgramCount
                    : userState?.bugReportSubmissionCount}
                </p>
                <p className="text-white-400">
                  {userState?.userType === "Company"
                    ? "Total Programs"
                    : "Total Bug Submitted"}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  className="rounded-full shadow-2xl"
                  height={150}
                  width={150}
                  src={`${process.env.PINATA_VIEW_API}${userState?.userImage}`}
                ></img>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div title="Change user image" onClick={handleEditClick}>
                  <IconTemplate
                    icon={`${
                      loading || imageUploading
                        ? "fa-solid:spinner"
                        : "ic:twotone-edit"
                    }`}
                    className={`absolute bottom-5 right-2  text-white ${
                      loading || imageUploading
                        ? "animate-spin"
                        : "cursor-pointer"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="space-x-8 flex justify-between text-base mt-32 md:mt-0 md:justify-center">
              {userState?.userType === "Hacker" && (
                <div className="flex flex-col justify-end items-center">
                  <p className="font-bold text-white-700">
                    {userState?.hitPoints}
                  </p>
                  <p className="text-white-400">Points</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-white-700">
              {userState?.userName}
            </h1>
            <div>
              <div className="mt-6 ">
                <p className="my-2 text-base">Add your skills</p>
                <div className="text-lg text-white-500 flex justify-center items-center gap-3">
                  {userSkills?.split(",")?.map((skill, i) => {
                    if (skill === "") return null;
                    return (
                      <Badge
                        className="flex flex-row gap-2 justify-center items-center"
                        key={i}
                        variant={"destructive"}
                      >
                        <p className="text-base">{skill}</p>
                        <div onClick={() => removeSkill(skill)}>
                          <IconTemplate
                            icon="basil:cross-outline"
                            className="text-3xl cursor-pointer"
                          />
                        </div>
                      </Badge>
                    );
                  })}

                  <div title="Add new skills">
                    <AlertDialog open={addSkillModal}>
                      <AlertDialogTrigger asChild>
                        <span onClick={() => setAddSkillModal(true)}>
                          <IconTemplate
                            icon={`${loading ? "fa-solid:spinner" : "gg:add"}`}
                            className={` text-white text-2xl ${
                              loading ? "animate-spin" : "cursor-pointer"
                            }`}
                          />
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            Add Skills
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          <InputBox
                            setFunction={(e) => setNewSkills(e.target.value)}
                            label="Add Skill"
                            labelClassname="text-white text-lg"
                            placeholder="Python, Java, C++"
                          />
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setAddSkillModal(false)}
                            className="bg-gray-500 text-white hover:bg-gray-400 hover:text-black transition-all rounded-lg p-2"
                          >
                            Close
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={saveSkillChange}
                            className="bg-indigo-600 text-white hover:border hover:bg-indigo-500 transition-all hover:text-black rounded-lg p-2"
                            disabled={loading}
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
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-white-600 text-lg text-center font-light lg:px-16">
              {userState?.userDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
