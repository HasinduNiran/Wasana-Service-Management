import mongoose from "mongoose";

// Defining the vacency Schema
const vacencySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        
    },
    
    Description: {
        type: String,
        required: true,
    },
   
});


// Exporting the vacency Model
export const Vacency = mongoose.model('Vacency', vacencySchema);

