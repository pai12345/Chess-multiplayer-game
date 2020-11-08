import Helper_Proto from "../class/helperclass_proto";
import { Status, Helper_interface } from "../helper";

/**
 * Helper Class
 * @description
 * Helper Class contains Attributes and Methods for Application.
 */
class Helper extends Helper_Proto implements Helper_interface {
  constructor() {
    super();
  }
  generatemessage(status: number, message: string, data: any) {
    const result = {
      status: status,
      message: message,
      data: data,
    };
    return result;
  }
  /**
   * Function for Nullish Coalescing
   * @description
   * Function to check if value is null | undefined
   */
  nullishcoalesce(data: any) {
    const validate = data ?? Status.NotResponding;
    return validate;
  }
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
const helper = new Helper();
export default helper;
