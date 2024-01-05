const elForm = document.querySelector('.form');
const elResult = document.querySelector('.result');
const errCaptcha = document.querySelector('.error-captcha');
const elInputFirst = document.querySelector('.form-control-first');
const elInputSecond = document.querySelector('.form-control-second');
const elErrMsg = document.querySelector('.input-err-msg');

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

const getData = async () => {
  document.body.appendChild(Loading);

  const res = await fetch(
    `https://edu-center.1kb.uz/api/Sertificate/getby?CandidateNo=${elInputFirst.value}&CertificateNo=${elInputSecond.value}`
  );

  const data = await res.json();

  if (data) {
    document.body.removeChild(Loading);

    elResult.innerHTML += `
    <div class="row" ng-show="Sertifika!=null &amp;&amp; Sertifika.Id>0" id="sonuc" style="padding: 25px; margin-bottom: 50px; background-color: white;">

    <div class="clearfix" style="margin: 20px 0 40px 0;width: 100%;">
      <div style="float: left;width: 33%">
        <hr>
      </div>
      <div style="float: left; width: 34%;text-align: center;font-size: 24px;">
        <strong style="color: #115854" class="ng-binding">Türkçe Yeterlik Belgesi</strong>
      </div>
      <div style="float: left;width: 33%">
        <hr>
      </div>
    </div>


    <div class="col clearfix row" style="border: 1px solid #f4f4f4; padding: 10px;">
      <div class="col center">
        <div class="form-group">
          <label class="control-label sertifika-head">Adı / Name </label>
          <div><strong class="font1 ng-binding">${data.firstName}</strong> </div>
        </div>
      </div>
      <div class="col center">
        <div class="form-group">
          <label class="control-label sertifika-head">Soyadı / Surname </label>
          <div><strong class="font1 ng-binding">${data.lastName}</strong> </div>
        </div>
      </div>
      <div class="col center">
        <div class="form-group">
          <label class="control-label sertifika-head">Aday No / Candidate Number </label>
          <div><strong class="font1 ng-binding">${data.candidateNo}</strong> </div>
        </div>
      </div>
      <div class="col center">
        <div class="form-group">
          <label class="control-label sertifika-head">Sertifika No / Certificate Number </label>
          <div><strong class="font1 ng-binding">${data.certificateNo}</strong> </div>
        </div>
      </div>
    </div>


    <table class="table" style="margin-top: 30px">
      <tbody><tr>
        <td class="font2" style="border: none; width: 30%;">Doğum Tarihi / Date of Birth</td>
        <td class="font1" style="border: none; width: 70%"><strong class="ng-binding">${data.dateOfBirth}</strong></td>
      </tr>
      <tr>
        <td class="font2">Doğum Yeri / Place of Birth</td>
        <td class="font1"><strong class="ng-binding">${data.plaseOfBirth}</strong></td>
      </tr>
      <tr>
        <td class="font2">Uyruk / Nationality</td>
        <td class="font1"><strong class="ng-binding">${data.nationality}</strong></td>
      </tr>
      <tr>
        <td class="font2">Sınav Yeri / Exam Center</td>
        <td class="font1"><strong class="ng-binding">${data.examCenter}</strong></td>
      </tr>
      <tr>
        <td class="font2">Sınav Tarihi / Exam Date</td>
        <td class="font1"><strong class="ng-binding">${data.examDate}</strong></td>
      </tr>
      <!-- ngIf: Sertifika.BelgeTuru =='Türkçe Yeterlik Belgesi' --><tr ng-if="Sertifika.BelgeTuru =='Türkçe Yeterlik Belgesi'" class="ng-scope">
        <td class="font2">Okuma Puanı / Reading Score</td>
        <td class="font1"><strong class="ng-binding">${data.readingScore}</strong></td>
      </tr><!-- end ngIf: Sertifika.BelgeTuru =='Türkçe Yeterlik Belgesi' -->
      <!-- ngIf: Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi' --><tr ng-if="Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi'" class="ng-scope">
        <td class="font2">Dinleme Puanı / Listening Score</td>
        <td class="font1"><strong class="ng-binding">${data.listeningScore}</strong></td>
      </tr><!-- end ngIf: Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi' -->
      <!-- ngIf: Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi' --><tr ng-if="Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi'" class="ng-scope">
        <td class="font2">Konuşma Puanı / Speaking Score</td>
        <td class="font1"><strong class="ng-binding">${data.speakingScore}</strong></td>
      </tr><!-- end ngIf: Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi' -->
      <!-- ngIf: Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi' --><tr ng-if="Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi'" class="ng-scope">
        <td class="font2">Yazma Puanı / Writing Score</td>
        <td class="font1"><strong class="ng-binding">${data.writingScore}</strong></td>
      </tr><!-- end ngIf: Sertifika.BelgeTuru=='Türkçe Yeterlik Belgesi' -->
      <tr>
        <td class="font2">Toplam Puanı / Total Score</td>
        <td class="font1"><strong class="ng-binding">${data.totalScore}</strong></td>
      </tr>
      <tr>
        <td class="font2">Seviye / Level</td>
        <td class="font1"><strong class="ng-binding">${data.level}</strong></td>
      </tr>
      <tr>
        <td class="font2">Belge Türü / Certificate Type</td>
        <td class="font1"><strong class="ng-binding">${data.certificateType}</strong></td>
      </tr>
    </tbody></table>

    <br><br>
    <div class="alert alert-success" style="width: 100%">
      Sorgulamasını yaptığınız belgeye ait bilgiler sistemimizde mevcuttur. İlgili belge geçerlidir.
      <br>The information about the certificate that you are inquerying is available in our system. Certificate is valid.
    </div>

    </div>
    `;
  }
};

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const captcha = grecaptcha.getResponse();

  if (!captcha.length) {
    return alert('Güvenlik doğrulaması yapmadınız.');
  } else {
    errCaptcha.innerHTML = '';
  }

  if (!elInputFirst.value.length || !elInputSecond.value.length) {
    return (elErrMsg.style.display = 'block');
  }

  if (elInputFirst.value.length && elInputSecond.value.length) {
    getData();
  }
});
