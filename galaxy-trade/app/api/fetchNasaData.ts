// Fetching data from NASA API

const NASA_API_BASE_URL = "https://api.nasa.gov/planetary/apod";
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY ?? "";

if (!NASA_API_KEY) {
  throw new Error("NASA_API_KEY is not defined. Please check your environment variables.");
}

export interface NasaImage {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
}

export async function fetchNasaData(
// Number of random images to retrieve
count: number = 5
): Promise<NasaImage[]> {
    try {
    const url = new URL(NASA_API_BASE_URL);
    url.searchParams.append("api_key", NASA_API_KEY);
    url.searchParams.append("count", count.toString());
    // url.searchParams.append("start_date", "2024-01-01");

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    const images: NasaImage[] = data
      .filter((item: any) => item.media_type === "image")
      .map((item: any) => ({
        title: item.title,
        explanation: item.explanation,
        url: item.hdurl,
        media_type: item.media_type,
      }));

    return images;
  } catch (error) {
    console.error("Error in fetchNasaData:", error);
    throw error;
  }
}