const recordDeleteButtons = document.querySelectorAll('.record-delete-button');
// const habitDltBtn = document.querySelector('#habit-delete-button');

let recordSave = document.querySelector('#record-save-button');
let recordDate = document.querySelector('#floating-date');
let recordQuantity = document.querySelector('#floating-quantity');

// habitDltBtn.addEventListener('click', (event) => {
//   console.log('button clicked');
//   fetch(`${habitDltBtn.dataset.deletePk}/delete_detail`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'X-Requested-With': 'XMLHttpRequest',
//       'X-CSRFToken': csrftoken,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log('habit deleted');
//     });
// });

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

for (let recordDltBtn of recordDeleteButtons) {
  recordDltBtn.addEventListener('click', (event) => {
    let recordToDelete = recordDltBtn.closest('.card');
    recordToDelete.remove();
    fetch(`../record/${recordDltBtn.dataset.deletePk}/delete`, {
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
        console.log('record deleted');
      });
  });
}
