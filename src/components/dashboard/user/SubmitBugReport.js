"use client";
import React, { useEffect, useState } from "react";
import InputForm from "../company/utils/InputForm";
import { SubmitButton } from "../company/utils/formButton";
import RichTextEditor from "@/components/common/RichTextEditor";
import { z } from "zod";
import { pinFileToIPFS } from "@/actions/pinata";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  clearError,
  clearMessages,
  createBugReportAction,
} from "@/redux/actions/bugReportsActions";
import { showAlert } from "@/components/common/Alert";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";

const createBugReportSchema = z.object({
  bugTitle: z.string({
    invalid_type_error: "Invalid Bug Title",
    required_error: "Bug Title is required",
  }),
  bugDescription: z.string({
    invalid_type_error: "Invalid Bug Description",
    required_error: "Bug Description is required",
  }),
  bugValidationSteps: z.string({
    invalid_type_error: "Invalid Bug ValidationSteps",
    required_error: "Bug ValidationSteps is required",
  }),
  bugScopeTarget: z.string({
    invalid_type_error: "Invalid Bug Scope Target",
    required_error: "Bug Scope Target is required",
  }),
  bugCategory: z.string({
    invalid_type_error: "Invalid Bug Category",
    required_error: "Bug Category is required",
  }),
  bugSeverity: z.string({
    invalid_type_error: "Invalid Bug Severity",
    required_error: "Bug Severity is required",
  }),
  bugFileURL: z.string({
    invalid_type_error: "Invalid POC File URL. Must be a valid URL",
    required_error: "POC File URL is required",
  }),
});

const initialState = {
  errors: null,
};

const SubmitBugReport = ({ id }) => {
  const {
    loading: actionLoading,
    error,
    msg,
  } = useSelector((state) => state.reports);
  const { userState } = useSelector((state) => state.user);
  const [bugValidationSteps, setBugValidationSteps] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [state, setState] = useState(initialState);
  const [fileURL, setFileURL] = useState("");
  const [bugFileURL, setBugFileURL] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validatedFields = createBugReportSchema.safeParse({
      bugTitle: e.target.bugTitle.value,
      bugDescription: bugDescription,
      bugValidationSteps: bugValidationSteps,
      bugScopeTarget: e.target.bugScopeTarget.value,
      bugCategory: e.target.bugCategory.value,
      bugSeverity: e.target.bugSeverity.value,
      bugFileURL: bugFileURL,
    });
    if (!validatedFields.success) {
      return setState({
        errors: validatedFields.error.flatten().fieldErrors,
      });
    }
    const data = {
      bountyProgramAddress: id,
      bugTitle: validatedFields.data.bugTitle,
      bugDescription: validatedFields.data.bugDescription,
      bugValidationSteps: validatedFields.data.bugValidationSteps,
      bugScopeTarget: validatedFields.data.bugScopeTarget,
      bugCategory: validatedFields.data.bugCategory,
      bugSeverity: validatedFields.data.bugSeverity,
      bugFileURL: validatedFields.data.bugFileURL,
    };

    dispatch(
      createBugReportAction(wallet, userState.bugReportSubmissionCount, data)
    );
  };
  const UploadFile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!fileURL) return alert("Please select a file");
      const data = await pinFileToIPFS(fileURL);
      setBugFileURL(data.IpfsHash);
      showAlert("File uploaded successfully", true, "file-upload-success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      showAlert(error, false, "bug-report-fail");
      dispatch(clearError());
    }
    if (msg) {
      showAlert(msg, true, "bug-report-success");
      dispatch(clearMessages());
      navigate.back();
    }
  }, [error, msg]);
  return (
    <>
      {actionLoading ? (
        <Loader center={true}/>
      ) : (
        <div>
          <p className="text-center sm:mt-7">Submit Bug Report</p>
          <div className="relative rounded-xl shadow-md w-11/12 h-auto mt-8 overflow-hidden">
            <div className="absolute inset-0 bg-blur-lg"></div>
            <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
            <form onSubmit={handleSubmit}>
              <div className="relative flex flex-col w-full p-4">
                <InputForm
                  type="text"
                  name="bugTitle"
                  title="Bug Title"
                  placeholder="Bug Title"
                  error={state?.errors?.bugTitle}
                  required={true}
                />

                {/* bug description rich text editor */}
                <RichTextEditor
                  title="Bug Description"
                  value={bugDescription}
                  onChange={setBugDescription}
                  error={state?.errors?.bugDescription}
                  required={true}
                />
                {/* bug validation step rich text editor */}
                <RichTextEditor
                  title="Bug Validation Steps"
                  value={bugValidationSteps}
                  onChange={setBugValidationSteps}
                  error={state?.errors?.bugValidationSteps}
                  required={true}
                />
                <InputForm
                  type="text"
                  name="bugScopeTarget"
                  title="Scope of the bug"
                  placeholder="Enter the scope of the bug"
                  error={state?.errors?.bugScopeTarget}
                  required={true}
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col justify-center items-start">
                    <label className="block text-white text-sm font-bold mb-2">
                      Bug Category:
                      <sup className="text-red-500 text-lg">*</sup>
                    </label>
                    <select
                      name="bugCategory"
                      className="text-black text-base rounded-md w-full p-2"
                      required={true}
                    >
                      <option value="">Select Bug Category</option>
                      <option value="Web">Web</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Desktop">Desktop</option>
                    </select>
                    {state?.errors?.bugCategory && (
                      <p className="text-red-500 text-sm my-2 italic">
                        {state?.errors?.bugCategory}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <label className="block text-white text-sm font-bold mb-2">
                      Bug Severity:
                      <sup className="text-red-500 text-lg">*</sup>
                    </label>
                    <select
                      name="bugSeverity"
                      className="text-black text-base rounded-md w-full p-2"
                      required={true}
                    >
                      <option value="">Select Severity</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    {state?.errors?.bugSeverity && (
                      <p className="text-red-500 text-sm my-2 italic">
                        {state?.errors?.bugSeverity}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <InputForm
                    type="file"
                    title="Bug POC File"
                    error={state?.errors?.bugFileURL}
                    onChange={(e) => setFileURL(e.target.files[0])}
                  />
                  <Button
                    className="bg-purple-500 hover:bg-purple-300 transition-all mt-5"
                    onClick={UploadFile}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
                <SubmitButton disabled={bugFileURL === ""} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitBugReport;
