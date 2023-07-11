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

// Import the schedule
document.querySelector('.importBtn').addEventListener('click', function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (event) => {
    printSchedule(event.target.files[0]);
    loadSchedule(event.target.files[0]);
  };
  input.click();
});

// Function to print the schedule
function printSchedule(file) {
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = function (evt) {
    const data = JSON.parse(evt.target.result);
    const schedule = data.schedule;
    const scheduleLength = schedule.length;
    const scheduleTable = document.querySelector('.scheduleTable');
    scheduleTable.innerHTML = '';
    for (let i = 0; i < scheduleLength; i++) {
      const tr = document.createElement('tr');

      const th = document.createElement('th');
      th.innerHTML = 'Semaine ' + (i + 1);
      tr.appendChild(th);

      const td = document.createElement('td');
      td.innerHTML = schedule[i].Week;
      tr.appendChild(td);

      const td2 = document.createElement('td');
      td2.innerHTML = schedule[i].Mon;
      tr.appendChild(td2);

      const td3 = document.createElement('td');
      td3.innerHTML = schedule[i].Tue;
      tr.appendChild(td3);

      const td4 = document.createElement('td');
      td4.innerHTML = schedule[i].Wed;
      tr.appendChild(td4);

      const td5 = document.createElement('td');
      td5.innerHTML = schedule[i].Thu;
      tr.appendChild(td5);

      const td6 = document.createElement('td');
      td6.innerHTML = schedule[i].Fri;
      tr.appendChild(td6);

      const td7 = document.createElement('td');
      td7.innerHTML = schedule[i].Sat;
      tr.appendChild(td7);

      const td8 = document.createElement('td');
      td8.innerHTML = schedule[i].Sun;
      tr.appendChild(td8);

      scheduleTable.appendChild(tr);
    }
  }
  reader.onerror = function (evt) {
    alert('error reading file');
  }
}

// Function who load the datas of the schedule
function loadSchedule(file) {
  // Calculate the number of hours worked
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = function (evt) {
    const data = JSON.parse(evt.target.result);
    const schedule = data.schedule;
    const scheduleLength = schedule.length;

    let nbHours = 0;
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let offDays = "";
    let nbOffDays = 0;
    let date = "";

    for (let i = 0; i < scheduleLength; i++) {
      for (let j = 0; j < days.length; j++) {
        date = schedule[i].Week;

        let dayHours = schedule[i][days[j]];

        if (dayHours !== '' && dayHours !== 'OFF') {
          hoursWorked = dayHours.split('-');

          // Replace all the ":" by "." to be able to calculate the hours
          hoursWorked[0] = hoursWorked[0].replace(':', '.');
          hoursWorked[1] = hoursWorked[1].replace(':', '.');

          // Calculate the hours worked
          hoursWorked = hoursWorked[1] - hoursWorked[0];

          // Don't take numbers after the comma
          hoursWorked = Math.trunc(hoursWorked);

          nbHours += hoursWorked;
        }

        if (dayHours == 'OFF') {
          offDays += date + " : " + days[j] + ",";
          nbOffDays++;
        }
      }
    }

    const totHoursSchedule = document.querySelector('.totHoursSchedule'),
      totOffDays = document.querySelector('.totOffDays'),
      listOffDays = document.querySelector('.listOffDays');

    // Clear the list of off days
    listOffDays.innerHTML = '';

    totHoursSchedule.innerHTML = 'Nombre d\'heures travaillées : ' + nbHours + 'h';
    totOffDays.innerHTML = 'Nombre de jours \'OFF\' : ' + nbOffDays;

    //For each day off, create a span, add a class and add it to the list
    const offDaysArray = offDays.split(',');

    const span = document.createElement('span');
    span.classList.add('offDay');
    span.innerHTML = "Jours \'OFF\' :"
    listOffDays.appendChild(span);

    for (let i = 0; i < offDaysArray.length - 1; i++) {
      const span = document.createElement('span');
      span.classList.add('offDay');
      span.innerHTML = offDaysArray[i];
      listOffDays.appendChild(span);
    }

    calculateSalarySchedule(nbHours);
  }
}

function calculateSalarySchedule(nbHours) {
  const brutSalarySchedule = document.querySelector('.brutSalarySchedule'),
    netSalarySchedule = document.querySelector('.netSalarySchedule');

  brutSalarySchedule.innerHTML = 'Salaire brut : ' + (brutHour.value * nbHours) + '€';
  netSalarySchedule.innerHTML = 'Salaire net : ' + (netHour.value * nbHours) + '€';
}