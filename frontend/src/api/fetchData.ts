interface fetchInterface {
  <T>(
    apiUrl: string,
    method: string,
    credentials: RequestCredentials,
    myData: any,
    options?: RequestInit,
  ): Promise<T>;
}

export const fetchData: fetchInterface = async (
  apiUrl,
  method,
  credentials,
  myData,
  options = {},
) => {
  const dataBody = myData !== undefined ? { ...myData } : {};
  const isFormData = myData instanceof FormData;

  let body: string | null | FormData =
    method !== "GET" ? JSON.stringify(dataBody) : null;

  if (isFormData) {
    body = myData;
  }

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: isFormData
        ? undefined
        : {
            "Content-Type": "application/json",
          },
      credentials,
      body,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        error: true,
        errorMessage:
          errorData?.message || `Errore HTTP! Status: ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();

    return data;
  } catch (err: any) {
    return err.name === "AbortError"
      ? { error: true, aborted: true }
      : {
          error: true,
          errorMessage: err.message,
          status: err.response?.status || 500,
        };
  }
};
