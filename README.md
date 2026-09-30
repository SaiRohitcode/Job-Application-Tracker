# Job Application Tracker

A web application for managing and tracking job applications in one place. It allows users to add, edit, delete, search, and filter applications while also tracking interview rounds and receiving alerts for upcoming and overdue interviews.

## Features

* Add new job applications
* Edit existing applications
* Delete applications
* Search applications by company or position
* Filter applications by status
* Track application status
* Add multiple interview rounds
* Add interview round name and date
* Update interview round status
* Alerts for interviews happening today or within the next 2 days
* Alerts for overdue interviews
* Mark overdue interviews as Completed or Not Attempted

## Technologies Used

* HTML
* CSS
* JavaScript
* React

## Application Status

The tracker supports:

* Applied
* Interview
* Selected
* Rejected

## Interview Tracking

Each job application can contain multiple interview rounds. For every round, users can specify:

* Round name
* Interview date
* Round status

Round statuses include:

* Upcoming
* Completed
* Not Attempted

The application automatically displays alerts for upcoming and overdue interview rounds.

## Data Storage

The application uses the browser's **localStorage** to store job application data. This allows the data to remain available after refreshing or reopening the application in the same browser.