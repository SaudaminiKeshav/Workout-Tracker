const db = require("../models");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

module.exports = (app) => {

    /** Get All Workouts **/
    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post('/api/workouts', ({ body }, res) => {
        console.log("Incoming request /api/workouts: ", body);
        db.Workout.create(body)
            .then(dbWorkout => {
                console.log("New workout created: ", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(({ message }) => {
                console.log("Error POST /api/workouts", message);
            });
    });

    app.put('/api/workouts/:id', (req, res) => {

        db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            function (err, result) {
                if (err) {
                    console.log("Error: ", err);
                    res.send(err);
                } else {
                    console.log("Updated dbWorkout: ", result);
                    res.send(result);
                }
            }
        );
    });
};