import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import DoctorService from "./service";

export default class DoctorController {
    static async getDoctor(req: Request, res: Response) {
        try {
            const doctorId = req.params.id;
            const doctor = await DoctorService.getDoctorById(doctorId);

            const response = apiResponse(true, doctor);
            res.status(HTTP_STATUS.OK).json(response);
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }
}
