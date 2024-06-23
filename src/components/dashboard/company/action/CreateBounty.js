"use server";
import { z } from 'zod'
 
const createBountySchema = z.object({
  "bounty_name": z.string({
    invalid_type_error: 'Invalid Bounty Name',
    required_error: 'Bounty Name is required',
  }),
  description: z.string({
    invalid_type_error: 'Invalid Description',
    required_error: 'Description is required',
  }),
  // "bounty_type": z.string({
  //   invalid_type_error: 'Invalid Bounty Type',
  //   required_error: 'Bounty Type is required',
  // }),
  "total_bounty": z.number().int().positive({
    invalid_type_error: 'Invalid Total Bounty',
    required_error: 'Total Bounty is required',
  }),
  "critical_bounty": z.number().int().positive({
    invalid_type_error: 'Invalid Critical Bounty',
    required_error: 'Critical Bounty Reward is required',
  }), 
  "high_bounty": z.number().int().positive({
    invalid_type_error: 'Invalid High Bounty',
    required_error: 'High Bounty Reward is required',
  }),
  "medium_bounty": z.number().int().positive({
    invalid_type_error: 'Invalid Medium Bounty',
    required_error: 'Medium Bounty Reward is required',
  }),
  "low_bounty": z.number().int().positive({
    invalid_type_error: 'Invalid Low  Bounty',
    required_error: 'Low Bounty Reward is required',
  }),
  "bounty_duration": z.string().datetime({
    invalid_type_error: 'Invalid Bounty Duration',
    required_error: 'Bounty Duration is required',
  }),
  "program_rule": z.string({
    invalid_type_error: 'Invalid Program Rule',
    required_error: 'Program Rule is required',
  }),
  "program_scope": z.string({
    invalid_type_error: 'Invalid Program Scope',
    required_error: 'Program Scope is required',
  }),
})


export async function onSubmit(prevState, formData) {

  const validatedFields = createBountySchema.safeParse({
    bounty_name: formData.get('bounty_name'),
    description: formData.get('description'),
    // bounty_type: formData.get('bounty_type'),
    total_bounty: parseInt(formData.get('total_bounty')),
    critical_bounty: parseInt(formData.get('critical_bounty')),
    high_bounty: parseInt(formData.get('high_bounty')),
    medium_bounty: parseInt(formData.get('medium_bounty')),
    low_bounty: parseInt(formData.get('low_bounty')),
    bounty_duration: new Date(formData.get('bounty_duration')).toISOString(),
    program_rule: formData.get('program_rule'),
    program_scope: formData.get('program_scope'),

  })
 
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  console.log(validatedFields.data);
 
}
