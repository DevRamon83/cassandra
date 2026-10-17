const createTokenConfigs = (username: string, id: string) => {
  const access = Bun.env.ACCESS_TOKEN;
  const refresh = Bun.env.REFRESH_TOKEN;

  if (!access || !refresh) return { accessConfig: null, refreshConfig: null };

  const accessConfig = {
    username,
    id,
    expiresIn: "5m",
    maxAge: null,
    tokenName: access,
  };

  const refreshConfig = {
    username,
    id,
    expiresIn: "255m",
    maxAge: null,
    tokenName: refresh,
  };

  return { accessConfig, refreshConfig };
};

export default createTokenConfigs;
