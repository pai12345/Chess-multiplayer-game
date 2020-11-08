import Helper_Proto from "../class/helperclass_proto";
import { Helper_interface } from "../helper";
declare class Helper extends Helper_Proto implements Helper_interface {
    constructor();
    generatemessage(status: number, message: string, data: any): {
        status: number;
        message: string;
        data: any;
    };
    nullishcoalesce(data: any): any;
}
declare const helper: Helper;
export default helper;
//# sourceMappingURL=helperclass.d.ts.map