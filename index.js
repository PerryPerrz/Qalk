document.querySelector('.icon').addEventListener('mouseenter', function () {
  document.querySelector('.modal').style.display = 'block';
});

document.querySelector('.icon').addEventListener('mouseleave', function () {
  document.querySelector('.modal').style.display = 'none';
});

// Fixing the value
const brutHourValue = 11.52,
  netHourValue = 9.11;

// Get the value of the input with id="brut"
const brutHour = document.getElementById('brut'),
  netHour = document.getElementById('net');

// By default, the brutHour input is 11,52
brutHour.value = brutHourValue;

// By default, the netHour input is 9,11
netHour.value = netHourValue;

// If the user click on the input, it clear the value, but if the user click outside the input, the value is back to 11,52
brutHour.addEventListener('focus', function () {
  brutHour.value = '';
});

// If the user click on the input, it clear the value, but if the user click outside the input, the value is back to 9,11
netHour.addEventListener('focus', function () {
  netHour.value = '';
});

// If the user click outside the input and he didn't fill the field, the value is back to 11,52
brutHour.addEventListener('focusout', function () {
  if (brutHour.value === '') {
    brutHour.value = brutHourValue;
  }
});

// If the user click outside the input and he didn't fill the field, the value is back to 9.11
netHour.addEventListener('focusout', function () {
  if (netHour.value === '') {
    netHour.value = netHourValue;
  }
});

// Function to calculate the salary
function calculate() {

}