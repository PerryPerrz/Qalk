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