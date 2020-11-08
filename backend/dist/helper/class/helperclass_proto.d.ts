import { Helper_interface, ResultObj_Response_Interface } from "../helper";
declare abstract class Helper_Proto implements Helper_interface {
    abstract generatemessage(status: number, message: string, data: any): ResultObj_Response_Interface;
    abstract nullishcoalesce(data: any): any;
}
export default Helper_Proto;
//# sourceMappingURL=helperclass_proto.d.ts.map