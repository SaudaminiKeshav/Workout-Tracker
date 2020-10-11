init();

async function init() {
  console.log('location.search.split("=")[1]: ', location.search.split("=")[1]);

  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    console.log("Last workout (index.js): ", workout);

    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}
