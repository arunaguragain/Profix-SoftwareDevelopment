const express = require("express");
const { bookAppointment, getAppointments, editAppointment, deleteAppointment } = require("../controller/appointmentController");

const router = express.Router();

router.post("/book", bookAppointment); 
router.get("/", getAppointments);
router.put("/:id" , editAppointment ); 
router.delete ("/:id",deleteAppointment );

module.exports = router;
