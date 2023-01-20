const recordDeleteButtons = document.querySelectorAll('.record-delete-button');
const currentHabit = document.querySelector('#habit');

let recordSave = document.querySelector('#record-save-button');
let recordDate = document.querySelector('#floating-date');
let recordQuantity = document.querySelector('#floating-quantity');

recordSave.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('submit works');

  let recordDateValue = recordDate.value;
  let recordQuantityValue = recordQuantity.value;

  console.log(recordDateValue, recordQuantityValue);

  fetch(`../habit/${currentHabit.dataset.habitPk}/records`, {
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
      let recordDetail = createCardEl('p', ['noclass'], cardBody);
      recordDetail.innerText = `${data.record_quantity} ${data.habit_unit} on ${data.record_date}`;

      let buttonDiv = createCardEl('div', ['noclass'], cardBody);
      let recordEdit = createCardEl('a', ['btn', 'btn-secondary'], buttonDiv);
      recordEdit.href = `http://127.0.0.1:8000/record/${data.record_pk}/edit`;
      recordEdit.setAttribute('type', 'button');
      recordEdit.innerText = 'Edit';
      let recordDelete = createCardEl(
        'button',
        ['btn', 'btn-danger', 'ml-2'],
        buttonDiv
      );
      recordDelete.setAttribute('type', 'button');
      recordDelete.setAttribute('data-bs-toggle', 'modal');
      recordDelete.innerText = 'X';

      recordDltBtn.addEventListener('click', (event) => {
        let recordToDelete = recordDltBtn.closest('.card');
        recordToDelete.remove();
        fetch(`../record/${data.record_pk}/delete`, {
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
