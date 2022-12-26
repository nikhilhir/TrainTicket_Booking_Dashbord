let registered_users = JSON.parse(localStorage.getItem("register-users")) || [];
//change local storage name data name
let registerUser;

const funformsub = (e) => {
  e.preventDefault();
  let form = document.getElementById("form");
  let otp = Math.floor(Math.random() * 10000);

  registerUser = {
    uniqueId: form.ID.value,
    name: form.Name.value,
    age: form.Age.value,
    fromStation: form.station.value,
    ToStation: form.tostation.value,
    Jdate: form.date.value,

    seattype: form.seat.value,
    otp: otp,
  };

  if (registerUser.fromStation != registerUser.ToStation) {
  } else {
    alert("Please check arrival and diparture station should not be same");
    return form.reset();
  }

  let isUser = registered_users.find(
    (el) => el.uniqueId === registerUser.uniqueId
  );

  if (isUser === undefined) {
    registered_users.push(registerUser);
    localStorage.setItem("register-users", JSON.stringify(registered_users));
    alert(`Register success and your otp is    ${otp} `);
    form.reset();
  } else {
    alert("Please enter Unique ID");
  }
  console.log(registerUser);
};
 