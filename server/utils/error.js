const errorHandler = (statusCode, message) => {
  const error = new Error();
  // console.log(error.message);
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export default errorHandler;
