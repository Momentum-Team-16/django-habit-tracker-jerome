let recordSave = document.querySelector('#record-save-button');
let recordDate = document.querySelector('#floating-date');
let recordQuantity = document.querySelector('#floating-quantity');

recordSave.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('submit works');

  let recordDateValue = recordDate.value;
  let recordQuantityValue = recordQuantity.value;

  console.log(recordDateValue, recordQuantityValue);

  fetch('record/new', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      recordDate: recordDateValue,
      recordQuantity: recordQuantityValue,
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
