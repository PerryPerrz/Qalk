document.querySelector('.icon').addEventListener('mouseenter', function () {
  document.querySelector('.modal').style.display = 'block';
});

document.querySelector('.icon').addEventListener('mouseleave', function () {
  document.querySelector('.modal').style.display = 'none';
});

// Fixing the values
const brutHourValue = 11.52,
  netHourValue = 9.11;

const brutHour = document.getElementById('brutHour'),
  netHour = document.getElementById('netHour'),
  nbHours = document.getElementById('nbHours'),
  netSalary = document.getElementById('netSalary'),
  brutSalary = document.getElementById('brutSalary');

// By default
brutHour.value = brutHourValue;
netHour.value = netHourValue;

// If the user click on the input, it clear the value
brutHour.addEventListener('focus', function () {
  brutHour.value = '';
});

// If the user click on the input, it clear the value
netHour.addEventListener('focus', function () {
  netHour.value = '';
});

// If the user click outside the input and he didn't fill the field, the value is back to it's default value
brutHour.addEventListener('focusout', function () {
  if (brutHour.value === '') {
    brutHour.value = brutHourValue;
  }
});

// If the user click outside the input and he didn't fill the field, the value is back to it's default value
netHour.addEventListener('focusout', function () {
  if (netHour.value === '') {
    netHour.value = netHourValue;
  }
});

// If the user change any value in the whole document, it calculate the salary again
document.addEventListener('change', function () {
  calculate();
});

// Function to calculate the salary
function calculate() {
  calculateBrut();
  calculateNet();
}

function calculateBrut() {
  netSalary.value = netHour.value * nbHours.value;
}

function calculateNet() {
  brutSalary.value = brutHour.value * nbHours.value;
}

// When the user click on the save button, it create a JSON file and save all the values of the inputs inside it
document.querySelector('.exportBtn').addEventListener('click', function () {
  const data = {
    brutHour: brutHour.value,
    netHour: netHour.value,
    nbHours: nbHours.value,
    netSalary: netSalary.value,
    brutSalary: brutSalary.value,
  };

  const a = document.createElement('a');
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
  );
  a.setAttribute('download', 'data.json');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// When the user click on the load button, it load the JSON file and fill the inputs with the values
document.querySelector('.loadBtn').addEventListener('click', function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (event) => {
    processFile(event.target.files[0]);
  };
  input.click();
});

function processFile(file) {
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = function (evt) {
    const data = JSON.parse(evt.target.result);
    brutHour.value = data.brutHour;
    netHour.value = data.netHour;
    nbHours.value = data.nbHours;
    netSalary.value = data.netSalary;
    brutSalary.value = data.brutSalary;
  }
  reader.onerror = function (evt) {
    alert('error reading file');
  }
}

// When the user click on the reset button, it reset all the values to their default value
document.querySelector('.resetBtn').addEventListener('click', function () {
  brutHour.value = brutHourValue;
  netHour.value = netHourValue;
  nbHours.value = 0;
  netSalary.value = 0;
  brutSalary.value = 0;
});