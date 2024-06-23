
export const walletNullErr = () => {
  throw "Wallet not connected";
};
export const profileNotFoundErr = () => {
  throw `Profile not found`;
};
export const allProfilesErr = () => {
  throw "Failed to fetch all profiles";
};
