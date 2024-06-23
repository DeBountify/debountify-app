"use server";
import { z } from "zod";

const createBugReportSchema = z.object({
  bugTitle: z.string({
    invalid_type_error: "Invalid Bug Title",
    required_error: "Bug Title is required",
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
    invalid_type_error: "Invalid POC File URL",
    required_error: "POC File URL is required",
  }),
});

export async function submitBug(prevState, formData) {
  const validatedFields = createBugReportSchema.safeParse({
    bugTitle: formData.get("bugTitle"),
    bugValidationSteps: formData.get("bugValidationSteps"),
    bugScopeTarget: formData.get("bugScopeTarget"),
    bugCategory: formData.get("bugCategory"),
    bugSeverity: formData.get("bugSeverity"),
    bugFileURL: formData.get("bugFileURL"),
  });

  // Check if any required field is missing
  const requiredFields = [
    "bugTitle",
    "bugValidationSteps",
    "bugScopeTarget",
    "bugCategory",
    "bugSeverity",
    "bugFileURL",
  ];
  const missingFields = requiredFields.filter((field) => !formData.has(field));

  // Return early if any required field is missing
  if (missingFields.length > 0 || !validatedFields.success) {
    const errors = {
      ...validatedFields.error.flatten().fieldErrors,
      missingFields: missingFields.reduce((acc, field) => {
        acc[field] = "This field is required";
        return acc;
      }, {}),
    };
    return {
      errors,
    };
  }
return validatedFields.data;
}
