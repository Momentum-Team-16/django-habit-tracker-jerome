function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const body = document.querySelector('#container');
const deleteButtons = document.querySelectorAll('.delete-button');
// const newHabitModal = document.querySelector('#myModal');

// Helper function to create card elements
function createCardEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  parent.appendChild(newElement);
  return newElement;
}

let habitSave = document.querySelector('#save-button');
let habitName = document.querySelector('#floating-name');
let habitTarget = document.querySelector('#floating-target');
let habitUnit = document.querySelector('#floating-unit');

habitSave.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('submit works');

  let habitNameValue = habitName.value;
  let habitTargetValue = habitTarget.value;
  let habitUnitValue = habitUnit.value;

  console.log(habitNameValue, habitTargetValue, habitUnitValue);

  fetch('habit/new', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      habitName: habitNameValue,
      habitTarget: habitTargetValue,
      habitUnit: habitUnitValue,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newCard = createCardEl('div', ['card', 'm-2'], body);
      let cardBody = createCardEl(
        'div',
        ['card-body', 'd-flex', 'justify-content-between'],
        newCard
      );
      let habitDetail = createCardEl('a', ['noclass'], cardBody);
      habitDetail.innerText = `${data.habit_name} ${data.habit_target} ${data.habit_unit}`;
      habitDetail.href = `http://127.0.0.1:8000/habit/${data.habit_pk}`;
      let buttonDiv = createCardEl('div', ['noclass'], cardBody);
      let habitEdit = createCardEl(
        'button',
        ['btn', 'btn-secondary'],
        buttonDiv
      );
      habitEdit.setAttribute('type', 'button');
      habitEdit.innerText = 'Edit';
      let habitDelete = createCardEl(
        'button',
        ['btn', 'btn-danger', 'ml-2'],
        buttonDiv
      );
      habitDelete.setAttribute('type', 'button');
      habitDelete.innerText = 'X';
    });
});

for (let deleteButton of deleteButtons) {
  deleteButton.addEventListener('click', (event) => {
    let habitToDelete = deleteButton.closest('.card');
    habitToDelete.remove();
    fetch(`habit/${deleteButton.dataset.deletePk}/delete`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('habit deleted');
      });
  });
}
