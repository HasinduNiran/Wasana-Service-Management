import mongoose from "mongoose";

// Defining the Applicant Schema
const applicantSchema = mongoose.Schema({


    VacancyID: {
        type: String, 
    },

    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Number: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    JobType: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },
});

// Exporting the Applicant Model
export const Applicant = mongoose.model('Applicant', applicantSchema);
