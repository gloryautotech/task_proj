const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('../utils/common-helper')
const constants = require('../constants')
const logger = require('../utils/logger')
// const assignTaskUserList = mongoose.model('assignTaskUserList')

let createMeetingLink = (req, res1) => {

  console.log("req.body.startDate", req.body.startDate)
  console.log("req.body.endDate", req.body.endDate)
  console.log("req.body.email", req.body.email)
  console.log("req.body.summary", req.body.summary)
  console.log("req.body.location", req.body.location)
  console.log("req.body.description", req.body.description)


  // Require google from googleapis package.
  const { google } = require('googleapis')

  // Require oAuth2 from our google instance.
  const { OAuth2 } = google.auth

  // Create a new instance of oAuth and set our Client ID & Client Secret.
  const oAuth2Client = new OAuth2(
    '97406478627-8qeomaklcn85patn40lc74g7iinhe7ic.apps.googleusercontent.com',
    'H9TgAkqklkiyKNfUvd9mAtD5'
  )
  // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
  oAuth2Client.setCredentials({
    refresh_token: '1//04KCmey9QpRbfCgYIARAAGAQSNwF-L9IrUi6aq3pGGt1_NOyK1CZiX-5ijDqqM_5CDLPmsIaA9nIhzRCOBFS5PudSjsnCxsLYLfs',
  })

  // Create a new calender instance.
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  // Create a new event start date instance for temp uses in our calendar.
  const eventStartTime = new Date()//req.body.startDate
  eventStartTime.setDate(eventStartTime.getDay() + 2)

  // Create a new event end date instance for temp uses in our calendar.
  const eventEndTime = new Date()//req.body.endDate
   eventEndTime.setDate(eventEndTime.getDay() + 4)
   eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

  // Create a dummy event for temp uses in our calendar
  const event = {
    conferenceData: {
      createRequest: {
        requestId: shortid.generate(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    attendees: [
      { 'email': req.body.email }
    ],
    summary: req.body.summary,
    location: req.body.location,
    description: req.body.description,
    colorId: 1,
    start: {
      dateTime: eventStartTime,
      timeZone: 'Asia/Jakarta',
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'Asia/Jakarta',
    },
  }

  // Check if we a busy and have an event on our calendar for the same time.
  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'Asia/Jakarta',
        items: [{ id: 'primary' }],
      },
    },
    (err, res) => {
      // Check for errors in our query and log them if they exist.
      if (err) {
        console.error('Free Busy Query Error: ', err)
        let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
        res1.send(apiResponse)
      }

      // Create an array of all events on our calendar during that time.
      const eventArr = res.data.calendars.primary.busy

      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0)
        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: 'primary', resource: event, conferenceDataVersion: 1 },
          err => {
            // Check for errors and log them if they exist.
            if (err) {
              console.error('Error Creating Calender Event:', err)
              let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
              res1.send(apiResponse)
            }
            // Else log that the event was created.
            else {
              console.log('Calendar event successfully created.', res)
              let apiResponse = response.respons(true, constants.messages.SUCCESS, constants.constants.HTTP_SUCCESS, res)
              res1.send(apiResponse)
            }
          }
        )

      // If event array is not empty log that we are busy.
      console.log(`Sorry I'm busy...`)
      let apiResponse = response.respons(false, constants.messages.INTERNAL500 + err, constants.constants.HTTP_SERVER_ERROR, null)
      res1.send(apiResponse)
    }
  )
}

module.exports = {
  createMeetingLink
}