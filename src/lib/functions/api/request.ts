const API_URL = "https://localhost:7099/api/";

export async function sendRequest<Return, T>(
    url: string, 
    method: string, 
    data: T | null = null
): Promise<Return> {
    
    url = `${API_URL}${url}`;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : null,
    };

    if (typeof window === "undefined") {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
  
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.statusText === "Not Found") {
                throw new Error("Not Found");
            }

            throw new Error(`Request failed with status ${response.status}, ${response.statusText}`);
        }
  
        const responseData = await response.json();
        return responseData as Return;
    } catch (error) {
        throw new Error(`Request error: ${(error as Error).message}, ${(error as Error).cause}`);
    }
}