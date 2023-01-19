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
const habitForm = document.querySelector('#habit-form');
const habitName = document.querySelector('#floating-name');
const habitTarget = document.querySelector('#floating-target');
const habitUnit = document.querySelector('#floating-unit');

// Helper function to create card elements
function createCardEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  parent.appendChild(newElement);
  return newElement;
}

habitForm.addEventListener('submit', (event) => {
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
      let cardBody = createCardEl('div', ['card-body'], newCard);
      let habitDetail = createCardEl('a', ['noclass'], cardBody);
      habitDetail.innerText = `${data.habitName} ${data.habitTarget} ${data.habitUnit}`;
      habitDetail.href = `http://127.0.0.1:8000/habit/${data.habit_pk}`;
      let habitEdit = createCardEl(
        'button',
        ['btn', 'btn-secondary'],
        cardBody
      );
      habitEdit.setAttribute('type', 'button');
      habitEdit.innerText = 'Edit';
      let habitDelete = createCardEl('button', ['btn', 'btn-danger'], cardBody);
      habitDelete.setAttribute('type', 'button');
      habitDelete.innerText = 'X';
    });
});
