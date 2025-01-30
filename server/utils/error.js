const errorHander = (statusCode, message) => {
  const error = new Error();
  // console.log(error);
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export default errorHander;
