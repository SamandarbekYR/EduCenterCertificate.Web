const elForm = document.querySelector('.add-user-form');

const addUser = (names, values) => {
  const body = {};

  names.slice(0, 16).forEach((key, i) => {
    body[key] = values[i];
  });

  console.log(body)

  fetch('https://edu-center.1kb.uz/api/Sertificate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
};

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let elInputs = [];
  let elInputsValues = [];

  for (let i of evt.target.elements) {
    elInputs.push(i.name);
    elInputsValues.push(i.value);
  }

  for (let i of elInputsValues.slice(0, 16)) {
    if (i.length == 0) {
      inputErrMsg.style.display = 'block';
      return;
    } else {
      inputErrMsg.style.display = 'none';
    }
  }

  addUser(elInputs.slice(0, 16), elInputsValues.slice(0, 16));
});
