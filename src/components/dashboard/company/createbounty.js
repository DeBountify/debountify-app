"use client";
import RichTextEditor from "@/components/common/RichTextEditor";
import React, { useEffect, useState } from "react";
import InputForm from "./utils/InputForm";
import { SubmitButton } from "./utils/formButton";
import Loader from "@/components/loader/Loader";
import { formatToDatetring, formatToYMD } from "./utils/formatDate";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessages,
  createBountyProgramAction,
  getAllBountyPrograms,
  updateBountyProgramAction,
} from "@/redux/actions/bountryProgramsAction";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { showAlert } from "@/components/common/Alert";
import { useRouter } from "next/navigation";
import { getRewardAmount } from "./utils/formRewardAmount";

const initialState = {
  errors: null,
};

const createBountySchema = z.object({
  bounty_name: z.string({
    invalid_type_error: "Invalid Bounty Name",
    required_error: "Bounty Name is required",
  }),
  description: z.string({
    invalid_type_error: "Invalid Description",
    required_error: "Description is required",
  }),
  bounty_type: z.string({
    invalid_type_error: "Invalid Bounty Type",
    required_error: "Bounty Type is required",
  }),
  total_bounty: z.number().int().positive({
    invalid_type_error: "Invalid Total Bounty",
    required_error: "Total Bounty is required",
  }),
  critical_bounty: z.string({
    invalid_type_error: "Invalid Critical Bounty",
    required_error: "Critical Bounty Reward is required",
  }),
  high_bounty: z.string({
    invalid_type_error: "Invalid High Bounty",
    required_error: "High Bounty Reward is required",
  }),
  medium_bounty: z.string({
    invalid_type_error: "Invalid Medium Bounty",
    required_error: "Medium Bounty Reward is required",
  }),
  low_bounty: z.string({
    invalid_type_error: "Invalid Low  Bounty",
    required_error: "Low Bounty Reward is required",
  }),
  startDate: z.date({
    invalid_type_error: "Invalid Start Date",
    required_error: "Start Date is required",
  }),
  endDate: z.date({
    invalid_type_error: "Invalid End Date",
    required_error: "End Date is required",
  }),
  program_rule: z.string({
    invalid_type_error: "Invalid Program Rule",
    required_error: "Program Rule is required",
  }),
  program_scope: z.string({
    invalid_type_error: "Invalid Program Scope",
    required_error: "Program Scope is required",
  }),
  tags: z.string({
    invalid_type_error: "Invalid Tags",
    required_error: "Tags is required",
  }),
});

const Createbounty = ({ bountyAddress, isedit }) => {
  const { loading, bountyProgramsState, error, msg } = useSelector(
    (state) => state.bountyPrograms
  );
  const { userState } = useSelector((state) => state.user);
  const [programRule, setPogramRule] = useState("");
  const [description, setDescription] = useState("");
  const [programScope, setProgramScope] = useState("");
  const [state, setState] = useState(initialState);
  const [title, setTitle] = useState("");
  const [bounty_type, setBountyType] = useState("");
  const [total_bounty, setTotalBounty] = useState("");
  const [critical_bounty, setCriticalBounty] = useState("");
  const [high_bounty, setHighBounty] = useState("");
  const [medium_bounty, setMediumBounty] = useState("");
  const [low_bounty, setLowBounty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const submitForm = (e) => {
    e.preventDefault();
    const validatedFields = createBountySchema.safeParse({
      bounty_name: e.target.bounty_name.value,
      description: e.target.description.value,
      bounty_type: e.target.bounty_type.value,
      total_bounty: parseInt(e.target.total_bounty.value),
      critical_bounty: e.target.critical_bounty.value,
      high_bounty: e.target.high_bounty.value,
      medium_bounty: e.target.medium_bounty.value,
      low_bounty: e.target.low_bounty.value,
      startDate: new Date(e.target.startDate.value),
      endDate: new Date(e.target.endDate.value),
      program_rule: e.target.program_rule.value,
      program_scope: e.target.program_scope.value,
      tags: e.target.tags.value,
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return setState({
        errors: validatedFields.error.flatten().fieldErrors,
      });
    }
    const critical = validatedFields.data.critical_bounty?.split("-");
    const high = validatedFields.data.high_bounty?.split("-");
    const medium = validatedFields.data.medium_bounty?.split("-");
    const low = validatedFields.data.low_bounty?.split("-");
    const data = {
      title: validatedFields.data.bounty_name,
      description: validatedFields.data.description,
      scope: validatedFields.data.program_scope,
      programRules: validatedFields.data.program_rule,
      category: validatedFields.data.bounty_type,
      start_date: formatToDatetring(validatedFields.data.startDate),
      end_date: formatToDatetring(validatedFields.data.endDate),
      tags: validatedFields.data.tags,
    };
    if (isedit) {
      data.bountyProgramAddress = bountyAddress;
      dispatch(updateBountyProgramAction(wallet, data));
    } else {
      (data.reward = validatedFields.data.total_bounty),
        (data.critical_ub = parseFloat(critical[1]) * 1000000000),
        (data.critical_lb = parseFloat(critical[0]) * 1000000000),
        (data.high_ub = parseFloat(high[1]) * 1000000000),
        (data.high_lb = parseFloat(high[0]) * 1000000000),
        (data.medium_ub = parseFloat(medium[1]) * 1000000000),
        (data.medium_l = parseFloat(medium[0]) * 1000000000),
        (data.low_ub = parseFloat(low[1]) * 1000000000),
        (data.low_lb = parseFloat(low[0]) * 1000000000),
        dispatch(
          createBountyProgramAction(wallet, userState?.bountyProgramCount, data)
        );
    }
  };

  useEffect(() => {
    if (error) {
      showAlert("error", false, "create-bounty-error");
      dispatch(clearError());
    }
    if (msg) {
      showAlert("success", true, "create-bounty-success");
      dispatch(clearMessages());
      if (wallet?.publicKey) {
        dispatch(getAllBountyPrograms(wallet));
      }
      router.push('/dashboard/company/programs');
    }
  }, [error, msg]);

  useEffect(() => {
    if (isedit) {
      const bountyData = bountyProgramsState.find(
        (program) => program.publicKey.toString() === bountyAddress
      )?.account;
      if (bountyData) {
        setTitle(bountyData.title);
        setDescription(bountyData.description);
        setBountyType(bountyData.category);
        setTotalBounty(getRewardAmount(bountyData.reward));
        setCriticalBounty(
          getRewardAmount(bountyData.rewardRange.criticalLb) +
            "-" +
            getRewardAmount(bountyData.rewardRange.criticalUb)
        );
        setHighBounty(
          getRewardAmount(bountyData.rewardRange.highLb) +
            "-" +
            getRewardAmount(bountyData.rewardRange.highUb)
        );
        setMediumBounty(
          getRewardAmount(bountyData.rewardRange.mediumLb) +
            "-" +
            getRewardAmount(bountyData.rewardRange.mediumUb)
        );
        setLowBounty(
          getRewardAmount(bountyData.rewardRange.lowLb) +
            "-" +
            getRewardAmount(bountyData.rewardRange.lowUb)
        );
        setStartDate(formatToYMD(bountyData.startDate));
        setEndDate(formatToYMD(bountyData.endDate));
        setPogramRule(bountyData.programRules);
        setProgramScope(bountyData.scope);
        setTags(bountyData.tags);
      }
    }
  }, [bountyAddress]);

  return (
    <>
      {loading ? (
        <Loader center={true}/>
      ) : (
        <div>
          <p className="text-center sm:mt-7">
            {isedit ? "Edit Bounty Program" : "Create Bounty Program"}
          </p>
          <div className="relative rounded-xl shadow-md w-11/12 h-auto mt-8 overflow-hidden">
            <div className="absolute inset-0 bg-blur-lg"></div>
            <div className="absolute inset-0 bg-opacity-5 bg-white backdrop-blur-xl"></div>
            <form onSubmit={submitForm}>
              <div className="relative flex flex-col w-full p-4">
                <InputForm
                  type="text"
                  name="bounty_name"
                  title="Bounty Program Name"
                  placeholder="Bounty Program Name"
                  error={state?.errors?.bounty_name}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* description rich text editor */}
                <input name="description" type="hidden" value={description} />
                <RichTextEditor
                  title="Description"
                  initialData={description}
                  onChange={setDescription}
                  error={state?.errors?.description}
                />
                <InputForm
                  type="text"
                  name="bounty_type"
                  title="Bounty Type (Category)"
                  placeholder="Web or Android"
                  error={state?.errors?.bounty_type}
                  value={bounty_type}
                  onChange={(e) => setBountyType(e.target.value)}
                />
                <InputForm
                  type="number"
                  name="total_bounty"
                  title="Total Bounty For Program (All the values are in Sol) "
                  placeholder="5000"
                  error={state?.errors?.total_bounty}
                  value={total_bounty}
                  onChange={(e) => setTotalBounty(e.target.value)}
                  readOnly={isedit}
                />
                {/* {bounty reward according to severity} */}
                <div className="flex flex-col">
                  <label className="block text-white text-sm font-bold mb-2">
                    Bounty Reward According to Severity (All the values are in
                    Sol)
                  </label>
                  <div className="flex flex-col justify-start items-start">
                    <InputForm
                      className="grid grid-cols-2 gap-4"
                      type="string"
                      name="critical_bounty"
                      title="Critical"
                      placeholder="5-10"
                      error={state?.errors?.critical_bounty}
                      value={critical_bounty}
                      onChange={(e) => setCriticalBounty(e.target.value)}
                      readOnly={isedit}
                    />
                    <InputForm
                      className="grid grid-cols-2 gap-4"
                      type="string"
                      name="high_bounty"
                      title="High"
                      placeholder="3-5"
                      error={state?.errors?.high_bounty}
                      value={high_bounty}
                      onChange={(e) => setHighBounty(e.target.value)}
                      readOnly={isedit}
                    />
                    <InputForm
                      className="grid grid-cols-2 gap-4"
                      type="string"
                      name="medium_bounty"
                      title="Medium"
                      placeholder="2-3"
                      error={state?.errors?.medium_bounty}
                      value={medium_bounty}
                      onChange={(e) => setMediumBounty(e.target.value)}
                      readOnly={isedit}
                    />
                    <InputForm
                      className="grid grid-cols-2 gap-4"
                      type="string"
                      name="low_bounty"
                      title="Low"
                      placeholder="0.2-2"
                      error={state?.errors?.low_bounty}
                      value={low_bounty}
                      onChange={(e) => setLowBounty(e.target.value)}
                      readOnly={isedit}
                    />
                  </div>
                </div>

                {/* bounty duration date time picker */}
                <InputForm
                  name="startDate"
                  title="Start Date"
                  type="date"
                  error={state?.errors?.startDate}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  readOnly={isedit}
                />
                <InputForm
                  name="endDate"
                  title="End Date"
                  type="date"
                  error={state?.errors?.endDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {/* program rule rich text editor */}
                <input type="hidden" name="program_rule" value={programRule} />
                <RichTextEditor
                  title="Program Rule"
                  initialData={programRule}
                  onChange={setPogramRule}
                  error={state?.errors?.program_rule}
                />
                {/* {program scope rich text editor} */}
                <input
                  type="hidden"
                  name="program_scope"
                  value={programScope}
                />
                <RichTextEditor
                  title="Program Scope"
                  initialData={programScope}
                  onChange={setProgramScope}
                  error={state?.errors?.program_scope}
                />
                <InputForm
                  name="tags"
                  title="Tags"
                  type="string"
                  error={state?.errors?.tags}
                  placeholder="Web, Android, Security"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <SubmitButton isedit={isedit} disabled={loading} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Createbounty;
