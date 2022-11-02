const car_type = document.querySelector('#input select[name="car_type"]');
const date = document.querySelector('#input input[name="date"]');
const time = document.querySelector('#input input[name="time"]');
const penumpang = document.querySelector('#input input[name="penumpang"]');

// combine date and time
const combineDateAndTime = (date, time) => {
  const dateArr = date.split("-");
  const timeArr = time.split(":");

  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];

  const hour = timeArr[0];
  const minute = timeArr[1];

  return new Date(year, month, day, hour, minute);
};

updateValue();

const submit = document.querySelector("#input button[type='submit']");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  updateValue();
});

function updateValue() {
  const output = document.getElementById("output");
  const datetime = combineDateAndTime(date.value, time.value);

  // clear output
  output.innerHTML = "";
  function filtererFactory(
    car_type = undefined,
    datetime = undefined,
    penumpang = undefined
  ) {
    let functionBody = ``;
    if (car_type) {
      functionBody += `if (car.available !== ${
        car_type === "1" ? true : false
      }) return false;`;
    }

    if (datetime) {
      functionBody += `if (car.availableAt >= '${datetime}') return false;`;
    }

    if (penumpang) {
      functionBody += `if (car.capacity < ${penumpang}) return false;`;
    }

    functionBody += `return true;`;

    return new Function("car", functionBody);
  }

  const filterer = filtererFactory(
    car_type.value,
    datetime.value,
    penumpang.value
  );

  console.log(filterer);

  Binar.listCars(filterer).then((cars) => {
    output.innerHTML = "";
    console.log(cars);
    cars.forEach((car) => {
      car.availableAt = new Date(car.availableAt).toLocaleString();
    });

    Car.init(cars);
    // console.log(Car.list);

    Car.list.forEach((c) => {
      output.innerHTML += c.render();
    });
  });
  // myCar.init(cars)

  // console.log(myCar);
}
