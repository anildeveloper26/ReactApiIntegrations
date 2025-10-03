export default async function GetApi (page : number) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/company-document-responses-v2?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
