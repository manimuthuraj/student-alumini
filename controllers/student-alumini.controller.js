const express = require("express")
const fuser = require("../models/user")
const scheduling = require("../models/scheduling")

const student = async function (req, res) {
  try {
    let getExistSlots = await scheduling.find({ user: req.user._id });
    let otherUserSlot = await scheduling.find({ user: {$ne : req.user._id} })
    let allSlots = await scheduling.find({})

    let oneWeekData = [];
    let nextWeekDate;
    let data;
    let slots = { 1: "1PM-2PM", 2: "4PM-5PM", 3: "6PM-7PM" };

    for (let i = 7; i < 14; i++) {
      let date = new Date();
      //getting date after 7 days
      date.setDate(date.getDate() + i);
      nextWeekDate = date.toLocaleString("en-US", {
        timeZone: "asia/kolkata",
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      });
      for (let j = 1; j <= 3; j++) {
        let data1;
        data = {
          selectedDate: nextWeekDate,
          slot: slots[j],
          status: "Available",
          aluminiStatus: "Pending",
        };

        if(getExistSlots && getExistSlots.length){
        data1 = getExistSlots.map((obj) =>
          obj.selectedDate == data.selectedDate && obj.slot == data.slot ? obj : data
        );
        }else{
            data1 = [data]
        }
        oneWeekData.push(...data1);
      }
    }

    for (e of otherUserSlot) {
      oneWeekData.find((x) => {
        if (x.selectedDate == e.selectedDate && x.slot == e.slot) {
          x.status = "Not Available";
        }
      });
    }

    //checking whether pending slot is there to approve or reject by alumini
    let pendingSlot = allSlots.filter(x => x.status == 'Pending')

    //checking how many slots booked by the current user
    let bookedSlot = getExistSlots.filter(x => x.status == 'Booked')

    let slotBookingCondition = {
        pendingSlot: pendingSlot.length,
        bookedSlot: bookedSlot.length
    }

    res.render("student/student", { student: oneWeekData , createdSlot:getExistSlots, slotBookingCondition:slotBookingCondition});
    
  } catch (e) {
    console.log(e);
    req.flash("error", "Some thing went wrong");
    res.redirect("/student")
  }
};

//creating slot
const createSlot = async function (req, res) {
  try {
    console.log(req.body)

    //checking pending slot to approve by admin
    if(req.body.pendingSlot > 0) {
        req.flash("error", "Till the alumni confirms pending slot can't book another slot");
        res.redirect("/student");
    } else {

        if(req.body.bookedSlot >= 2) {
            req.flash("error", "The maximum number of slots a student can book is 2.");
            res.redirect("/student");
        } else {


    //checking slot already exist
    let findSlotExistOrNot = await scheduling.findOne({
      selectedDate: req.body.selectedDate,
      slot: req.body.slot,
      user:req.user._id
    });

    if (findSlotExistOrNot) {
      req.flash("error", "Slot already exist");
      res.redirect("/student");
    } else {
    let createSlot = new scheduling(req.body);
    createSlot.user = req.user._id;
    await createSlot.save();

    req.flash("error", "Slot created Admin Reviewing");
    res.redirect("/student");
    }
}
}
  } catch (e) {
    console.log(e);
    req.flash("error", "Some thing went wrong");
    res.redirect("/student");
  }
};

//get alumini table data
const getAlumini = async function(req, res) {
    try {
        //getting all slots created by students
        let getAllSlots = await scheduling.aggregate([
            {
                $lookup:
                {
                  from: "fusers",
                  localField: "user",
                  foreignField: "_id",
                  as: "userDetails"
                }
            }
        ])

        res.render("student/alumini", { student: getAllSlots })
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/login")
    }
}

//approve slot
const approveSlot = async function(req, res) {
    try {
        const updateSlot = await scheduling.findByIdAndUpdate(req.params.id, {status:"Booked",aluminiStatus:"Approved"})
        res.redirect("/alumini")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/alumini")
    }
}

//reject slot
const rejectSlot = async function(req, res) {
    try {
        const updateSlot = await scheduling.findByIdAndUpdate(req.params.id, {status:"rejected",aluminiStatus:"rejected"})
        res.redirect("/alumini")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/alumini")
    }
}



module.exports = { student, createSlot, getAlumini, approveSlot, rejectSlot }