const createTokenConfigs = (username: string) => {
  const access = Deno.env.get("ACCESS_TOKEN");
  const refresh = Deno.env.get("REFRESH_TOKEN");

  if (!access || !refresh) return { accessConfig: null, refreshConfig: null };

  const accessConfig = {
    username,
    expiresIn: "5m",
    maxAge: null,
    tokenName: access,
  };

  const refreshConfig = {
    username,
    expiresIn: "255m",
    maxAge: null,
    tokenName: refresh,
  };

  return { accessConfig, refreshConfig };
};

export default createTokenConfigs;
