export default defineEventHandler(async (event) => {
  try {
    const { getFbVideoInfo } = await import("fb-downloader-scrapper");
    // Get the URL from query parameters
    const query = getQuery(event);
    const url = query.url;

    if (!url) {
      return {
        status: "error",
        message: "No URL provided",
      };
    }

    const result = await getFbVideoInfo(url);
    return {
      status: "success",
      data: result,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
});
