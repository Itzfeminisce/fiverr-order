import { NextFunction, Request, Response } from "express";
import DeviceDetector from "node-device-detector";
import DeviceHelper from "node-device-detector/helper";


const isMobile = (allowMobile: boolean = true) => (req: Request, res: Response, next: NextFunction) => {
    const detector = new DeviceDetector();
    const result = detector.detect(req.headers['user-agent'] as string);
    const isMobile = DeviceHelper.isMobile(result)

    if(!isMobile && allowMobile) {
        const error = new Error("Kaboom!!")
        // @ts-ignore
        error.status = 404;
        next(error)
    }

    next()
}
export { isMobile }