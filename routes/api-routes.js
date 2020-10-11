const db = require("../models");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

module.exports = (app) => {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(dbWorkout => {
                console.log("All dbWorkouts: ", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                console.log("Error GET /api/workouts: ", err);
                res.json(err);
            });

    app.put('/api/workouts/:id', (req, res) => {
        console.log("Incoming request /api/workouts/:id: ", req.body);
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
            });
    });

    app.post('/api/workouts', ({ body }, res) => {
        db.Workout.create(body)
            .then(dbWorkout => {
                console.log("New workout created: ", dbWorkout);

                res.json(dbWorkout);
            })
            .catch(({ message }) => {
                console.log("Error POST /api/workouts", message);
            });
    });

    app.get('/api/workouts/range', (req, res) => {

    });
});
}; 