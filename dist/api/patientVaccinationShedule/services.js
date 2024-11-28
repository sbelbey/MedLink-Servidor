"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatientFields_1 = require("../../constants/PatientFields");
const service_1 = __importDefault(require("../patient/service"));
const dao_1 = __importDefault(require("./dao"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
class PatientVaccinationSheduleService {
    static createOrUpdatePatientVaccinationShedule(user, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PatientVaccinationShedulePayload = Object.assign({ patientId: user.id }, fields);
                const patientVaccinationSheduleSaved = yield dao_1.default.createOrUpdate(PatientVaccinationShedulePayload);
                const patientUpdated = yield service_1.default.addMedicalInformation(user, patientVaccinationSheduleSaved._id, PatientFields_1.PatientFields.VACCINATION_SHEDULE);
                return patientUpdated;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
}
exports.default = PatientVaccinationSheduleService;
