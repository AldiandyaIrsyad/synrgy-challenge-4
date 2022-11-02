class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class='card'>
      <img class="card-img-top" src="${this.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${this.id}</h5>
        <p>plate: <b>${this.plate}</b></p>
        <p>manufacture: <b>${this.manufacture}</b></p>
        <p>model: <b>${this.model}</b></p>
        <p>available at: <b>${this.availableAt}</b></p>
        <p>Kapasitas: ${this.capacity}</p>
        <p>Supir: ${this.available ? "ada" : "tidak"}</p>
      </div>
    </div>
    `;
  }
}
