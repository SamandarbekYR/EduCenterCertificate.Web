const elForm = document.querySelector('.form');
const errCaptcha = document.querySelector('.error-captcha');
// const elLoader = document.querySelector('.loader');

const Loading = document.createElement('div');
const LoadImg = document.createElement('img');

LoadImg.setAttribute('src', './Images/loading.gif');
LoadImg.setAttribute('width', '100px');

Loading.style = `position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
display: grid;
place-items: center;
background-color: #05050562;`;

Loading.appendChild(LoadImg);

document.body.appendChild(Loading);

setTimeout(() => {
  document.body.removeChild(Loading);
}, 1000);

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const captcha = grecaptcha.getResponse();

  if (!captcha.length) {
    errCaptcha.innerHTML += `
      <span style="color: red; margin-top: 5px; font-size: 18px;" >Güvenlik doğrulaması yapmadınız.</span>
    `;
  } else {
    errCaptcha.innerHTML = '';
  }
});
