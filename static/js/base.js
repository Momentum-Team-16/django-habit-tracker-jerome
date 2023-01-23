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
      habitDetail.href = `${window.location.origin}/habit/${data.habit_pk}`;
      let buttonDiv = createCardEl('div', ['noclass'], cardBody);
      let habitEdit = createCardEl('a', ['btn', 'btn-secondary'], buttonDiv);
      habitEdit.href = `${window.location.origin}/habit/${data.habit_pk}/edit`;
      habitEdit.setAttribute('type', 'button');
      habitEdit.innerText = 'Edit';
      let habitDelete = createCardEl(
        'button',
        ['btn', 'btn-danger', 'ml-2'],
        buttonDiv
      );
      habitDelete.setAttribute('type', 'button');
      habitDelete.setAttribute('data-bs-toggle', 'modal');
      habitDelete.setAttribute('data-bs-target', `#delete${data.habit_pk}`);
      habitDelete.innerText = 'X';

      let habitDeleteModal = createCardEl('div', ['modal', 'fade'], buttonDiv);
      habitDeleteModal.setAttribute('id', `delete${data.habit_pk}`);
      let habitDltModalDialog = createCardEl(
        'div',
        ['modal-dialog', 'modal-dialog-centered', 'modal-xl'],
        habitDeleteModal
      );
      let habitDltModalContent = createCardEl(
        'div',
        ['modal-content'],
        habitDltModalDialog
      );

      let habitDltModalHeader = createCardEl(
        'div',
        ['modal-header'],
        habitDltModalContent
      );
      let habitDltModalTitle = createCardEl(
        'h5',
        ['modal-title'],
        habitDltModalHeader
      );
      habitDltModalTitle.innerText =
        'Are you sure you want to delete this habit?';
      let habitDltHeaderClose = createCardEl(
        'button',
        ['btn-close'],
        habitDltModalHeader
      );
      habitDltHeaderClose.setAttribute('type', 'button');
      habitDltHeaderClose.setAttribute('data-bs-dismiss', 'modal');

      let habitDltModalBody = createCardEl(
        'div',
        'modal-body',
        habitDltModalContent
      );
      habitDltModalBody.innerText = `${data.habit_name} ${data.habit_target} ${data.habit_unit}`;

      let habitDltModalFooter = createCardEl(
        'div',
        ['modal-footer'],
        habitDltModalContent
      );
      let habitDltModalDlt = createCardEl(
        'button',
        ['btn', 'btn-danger'],
        habitDltModalFooter
      );
      habitDltModalDlt.setAttribute('data-bs-dismiss', 'modal');
      habitDltModalDlt.innerText = 'DELETE';

      habitDltModalDlt.addEventListener('click', (event) => {
        let habitToDelete = habitDelete.closest('.card');
        habitToDelete.remove();
        fetch(`../habit/${data.habit_pk}/delete`, {
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

      let habitDltModalCancel = createCardEl(
        'button',
        ['btn', 'btn-secondary'],
        habitDltModalFooter
      );
      habitDltModalCancel.setAttribute('data-bs-dismiss', 'modal');
      habitDltModalCancel.innerText = 'Cancel';
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
