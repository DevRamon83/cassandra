export const errorCodes: Record<string, string> = {
  tooShort: "Must be at least 3 characters long",
  tooLong: "Maximum 20 characters allowed",
  invalidChars:
    "Username can only contain letters, numbers, and underscores (_)",
  AtLeastLowercase: "Must include at least one lowercase letter",
  AtLeastUppercase: "Must include at least one uppercase letter",
  AtLeastNum: "Must include at least one number",
  AtLeastSpecial:
    "Must include at least one special character (e.g., ?, !, $, £)",
};
