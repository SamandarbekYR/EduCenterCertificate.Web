const elForm = document.querySelector('.add-user-form');
const elSearchForm = document.querySelector('.search-user');
const elUsersDiv = document.querySelector('.users-data');
const elInputFirst = document.querySelector('.form-control-first');
const elInputSecond = document.querySelector('.form-control-second');
const elResult = document.querySelector('.result');
const elErrMsg = document.querySelector('.input-err-msg');

const Loading = document.createElement('div');
const LoadImg = document.createElement('img');

LoadImg.setAttribute('src', './Images/loading.gif');
LoadImg.setAttribute('width', '100px');

Loading.style = `position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
display: grid;
place-items: center;
background-color: #05050562;`;

Loading.appendChild(LoadImg);

elUsersDiv.addEventListener('click', async (evt) => {
  if (evt.target.matches('.delete-user')) {
    const id = evt.target.dataset.userId;

    const res = await fetch(
      `https://edu-center.1kb.uz/api/Sertificate?id=${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (data) {
      getAllUsers();
    }
  }
});

elResult.addEventListener('click', async (evt) => {
  if (evt.target.matches('.delete-user')) {
    const id = evt.target.dataset.userId;

    const res = await fetch(
      `https://edu-center.1kb.uz/api/Sertificate?id=${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (data) {
      alert('Deleted!')
      location.reload()
    }
  }
});

const searchBy = async () => {
  document.body.appendChild(Loading);

  const res = await fetch(
    `https://edu-center.1kb.uz/api/Sertificate/getby?CandidateNo=${elInputFirst.value}&CertificateNo=${elInputSecond.value}`
  );

  if (res.status == 200) {
    const data = await res.json();
    document.body.removeChild(Loading);

    elResult.innerHTML = `
      <div class='result-inner' >
        <p><span class="fw-bold">First name:</span> ${data.firstName}</p>
        <p><span class="fw-bold">Last name:</span> ${data.lastName}</p>
        <p><span class="fw-bold">CandidateNo:</span> ${data.candidateNo}</p>
        <p><span class="fw-bold">CertificateNo:</span> ${data.certificateNo}</p>
        <p><span class="fw-bold">Date of birth:</span> ${data.dateOfBirth}</p>
        <p><span class="fw-bold">Place of birth:</span> ${data.plaseOfBirth}</p>
        <p><span class="fw-bold">Nationality:</span> ${data.nationality}</p>
        <p><span class="fw-bold">Exam center:</span> ${data.examCenter}</p>
        <p><span class="fw-bold">Exam date:</span> ${data.examDate}</p>
        <p><span class="fw-bold">Reading score:</span> ${data.readingScore}</p>
        <p><span class="fw-bold">Listening score:</span> ${data.listeningScore}</p>
        <p><span class="fw-bold">Speaking score:</span> ${data.speakingScore}</p>
        <p><span class="fw-bold">Writing score:</span> ${data.writingScore}</p>
        <p><span class="fw-bold">Total score:</span> ${data.totalScore}</p>
        <p><span class="fw-bold">Level:</span> ${data.level}</p>
        <p><span class="fw-bold">Certificate type:</span> ${data.certificateType}</p>
        <button class="btn btn-danger mt-3 delete-user" data-user-id='${data.id}'>Delete</button>
      </div>
    `;
  }
};

elSearchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!elInputFirst.value.length || !elInputSecond.value.length) {
    return (elErrMsg.style.display = 'block');
  }

  if (elInputFirst.value.length && elInputSecond.value.length) {
    searchBy();
  }
});

const getAllUsers = async () => {
  const res = await fetch('https://edu-center.1kb.uz/api/Sertificate');

  const data = await res.json();

  if (data.length) {
    elUsersDiv.innerHTML = '';

    data.forEach((item) => {
      elUsersDiv.innerHTML += `
      <div class="user-card">
        <p><span class="fw-bold">First name:</span> ${item.firstName}</p>
        <p><span class="fw-bold">Last name:</span> ${item.lastName}</p>
        <p><span class="fw-bold">CandidateNo:</span> ${item.candidateNo}</p>
        <p><span class="fw-bold">CertificateNo:</span> ${item.certificateNo}</p>
        <p><span class="fw-bold">Date of birth:</span> ${item.dateOfBirth}</p>
        <p><span class="fw-bold">Place of birth:</span> ${item.plaseOfBirth}</p>
        <p><span class="fw-bold">Nationality:</span> ${item.nationality}</p>
        <p><span class="fw-bold">Exam center:</span> ${item.examCenter}</p>
        <p><span class="fw-bold">Exam date:</span> ${item.examDate}</p>
        <p><span class="fw-bold">Reading score:</span> ${item.readingScore}</p>
        <p><span class="fw-bold">Listening score:</span> ${item.listeningScore}</p>
        <p><span class="fw-bold">Speaking score:</span> ${item.speakingScore}</p>
        <p><span class="fw-bold">Writing score:</span> ${item.writingScore}</p>
        <p><span class="fw-bold">Total score:</span> ${item.totalScore}</p>
        <p><span class="fw-bold">Level:</span> ${item.level}</p>
        <p><span class="fw-bold">Certificate type:</span> ${item.certificateType}</p>
        <button class="btn btn-danger mt-3 delete-user" data-user-id='${item.id}'>Delete</button>
      </div>
    `;
    });
  }
};

getAllUsers();

const addUser = (names, values) => {
  const body = {};

  names.slice(0, 16).forEach((key, i) => {
    body[key] = values[i];
  });

  fetch('https://edu-center.1kb.uz/api/Sertificate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => location.reload())
    .catch((err) => console.log(err));
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
