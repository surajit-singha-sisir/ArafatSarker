import { defineEventHandler, getQuery } from 'h3';

// Define response types for better type safety
interface SuccessResponse {
  status: 'success';
  data: any; // Replace 'any' with a specific type if you know the shape of getFbVideoInfo's result
}

interface ErrorResponse {
  status: 'error';
  message: string;
}

export default defineEventHandler(async (event): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const { getFbVideoInfo } = await import('fb-downloader-scrapper');
    const query = getQuery(event);
    const url = query.url as string | undefined;

    if (!url) {
      return {
        status: 'error',
        message: 'No URL provided',
      };
    }

    const result = await getFbVideoInfo(url);
    return {
      status: 'success',
      data: result,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});