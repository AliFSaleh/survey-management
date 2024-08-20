/**
 * Error messages
 */
const ERROR = {
    ID_DOES_NOT_EXISTS: "Id doesn't exist",
    EMAIL_ALREADY_EXIST: "Email is already exist",
    INVALID_CREDENTIALS: "Invalid credentials",
    UNAUTHORIZED: "Unauthorized request",
    EXPIRED_ACCESS_TOKEN: "Access token has expired",
    INVALID_JWT_TOKEN_PAYLOAD: "Invalid authorization request",
    INVALID_JWT_TOKEN: "Invalid token",
    NAME_ALREADY_EXIST: "Name is already exist"
  };
  
  /**
   * Success messages
   */
  const SUCCESS = {
    SUCCESS: "Success",
    USER_CREATED: "User has been created successfully"
  };
  
  const MESSAGES = {
    ERROR,
    SUCCESS
  };
  
  export default MESSAGES;
  