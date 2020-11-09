import { Helper_interface, ResultObj_Response_Interface } from "../util/helper";

/**
 * Template - Helper Class Prototype
 * @description
 * Abstract Class for Helper Class
 */
abstract class Helper_Proto implements Helper_interface {
  abstract generatemessage(
    status: number,
    message: string,
    data: any
  ): ResultObj_Response_Interface;
  abstract nullishcoalesce(data: any): any;
}

export default Helper_Proto;
