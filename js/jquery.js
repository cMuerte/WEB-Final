const trainingData = [
  { day: "Monday", exercises: ["Push-ups", "Jumping Jacks", "Squats"], calories: 300 },
  { day: "Tuesday", exercises: ["Planks", "Lunges", "Running"], calories: 320 },
  { day: "Wednesday", exercises: ["Burpees", "Cycling", "Sit-ups"], calories: 280 },
  { day: "Thursday", exercises: ["Yoga", "Stretching", "Walking"], calories: 200 },
  { day: "Friday", exercises: ["Deadlifts", "Pull-ups", "Treadmill"], calories: 350 },
  { day: "Saturday", exercises: ["Hiking", "Boxing", "HIIT"], calories: 400 },
  { day: "Sunday", exercises: ["Rest or Light Yoga"], calories: 100 }
];

let totalCalories = 0;

function updateCalories() {
  totalCalories = 0;
  $("input.exercise-check").each(function(index) {
    if ($(this).is(":checked")) {
      totalCalories += trainingData[index].calories;
      $(this).closest(".card").addClass("completed");
    } else {
      $(this).closest(".card").removeClass("completed");
    }
  });
  $("#totalCalories").text(totalCalories);
}

$(document).ready(function () {
  const container = $("#training-week");

  trainingData.forEach((dayData, index) => {
    const exercisesList = dayData.exercises.map(ex => `<li>${ex}</li>`).join("");
    const dayHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="form-check">
              <input class="form-check-input exercise-check" type="checkbox" id="day-${index}">
              <label class="form-check-label h5" for="day-${index}">
                ${dayData.day}
              </label>
            </div>
            <ul class="mt-2">${exercisesList}</ul>
            <p class="text-muted">Calories: ${dayData.calories} kcal</p>
          </div>
        </div>
      </div>
    `;
    container.append(dayHTML);
  });

  const clickSound = new Audio("audio/Ping sound effect.mp3");

  $(".exercise-check").change(function () {
    if (this.checked) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    updateCalories();
  });  
});
