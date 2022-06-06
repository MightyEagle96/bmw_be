export const ErrorHandler = (error, res, type) => {
  if (error.code === 11000) {
    return res.status(409).json({
      message:
        type === "auth"
          ? "Email address or Phone Number already exists"
          : "The data you are trying to save already exists",
      title: "Duplicate data found",
    });
  } else {
    res.status(500).json({
      message:
        "Something really bad happened on the server. Please try again later",
      title: "Oops !!! happened",
    });
  }
};
