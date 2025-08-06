import e from "cors";
import ApiError from "../../utils/AppError";
import sendEmail from "../../utils/sendEmail";
import { Student } from "../students/student.model";
import { Mail } from "./mails.model";
import httpStatus from "http-status";

const getAllMails = async () => {
  const result = await Mail.find().sort({ createdAt: -1 });
  return result;
};

const createMail = async (subject: string, message: string) => {
  const students = await Student.find({}, "email").lean();
  const emails = students.map((s) => s.email).filter(Boolean);
  console.log("email ->", emails, "emails.length ->", emails.length);

  if (emails.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No student email addresses found to send"
    );
  }

  const accepted: string[] = [];
  for (const email of emails) {
    const info = await sendEmail(email, subject, message);
    console.log("info", info);
    if (info.accepted) {
      const acceptedAddresses = Array.isArray(info.accepted)
        ? info.accepted
        : [info.accepted];
      accepted.push(
        ...acceptedAddresses.filter(
          (addr): addr is string => typeof addr === "string"
        )
      );
    }
  }
  if (accepted.length === emails.length) {
    await Mail.create({ subject, message });
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Some emails were not sent successfully. Try again"
    );
  }
  console.log(accepted);
  return {
    ...accepted,
  };
};

export const MailServices = {
  getAllMails,
  createMail,
};
