const addButton = document.querySelector('.fas');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

function setLocalStorageItem(item) {
    const othersItems = localStorage.getItem('To:Do-items');
    let items = [];

    if (othersItems) {
        items = JSON.parse(othersItems);
    }

    items.push(item);

    localStorage.setItem('To:Do-items', JSON.stringify(items));
}

class Item {
    constructor(itemName, save = true) {
        // create the idem div
        this.createDiv(itemName, save);
    }

    createDiv(itemName, save) {
        if (save) {
            setLocalStorageItem(itemName);
        }

        let input = document.createElement('input');
        input.id = itemName;
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = "text";

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "DEL";
        removeButton.classList.add('removeButton');

        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                e.preventDefault();
                this.edit(input, editButton);
            };
        });
        editButton.addEventListener('click', () => this.edit(input, editButton));
        removeButton.addEventListener('click', () => this.remove(itemBox));
    }

    edit(input, editButton) {
        const items = JSON.parse(localStorage.getItem('To:Do-items'));
        const itemIndex = items.indexOf(input.id);

        if (!input.disabled) {
            items[itemIndex] = input.value;
            localStorage.setItem('To:Do-items', JSON.stringify(items));
            editButton.innerHTML = "EDIT"
        } else {
            editButton.innerHTML = "OK"
        }

        input.disabled = !input.disabled;

    }

    remove(item) {
        const items = JSON.parse(localStorage.getItem('To:Do-items'));
        const itemIndex = items.indexOf(item);

        container.removeChild(item);

        items.splice(itemIndex);

        localStorage.setItem('To:Do-items', JSON.stringify(items));
    }
}

function check() {
    if (input.value != "") {
        new Item(input.value);
        input.value = "";
    }
}

addButton.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})

function loadLocalStorageItems() {
    const items = JSON.parse(localStorage.getItem('To:Do-items'));

    items.forEach(item => {
        new Item(item, false);
    });
}