document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const submitTicketToggle = document.querySelector('.submit-ticket-toggle');
    const submitTicketSubmenu = submitTicketToggle.nextElementSibling;

    function hideSubMenus() {
        document.querySelectorAll('.sub-menu').forEach(function (submenu) {
            submenu.classList.remove('active');
        });
    }

    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        hideSubMenus();
    });

    submitTicketToggle.addEventListener('click', function (event) {
        event.preventDefault();
        submitTicketSubmenu.classList.toggle('active');
    });
});

const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const currentDate = document.getElementById('created-date');
const category = document.getElementById('category');
const critical = document.getElementById('critical-level');
const submitter = document.getElementById('submitter');
const supporter = document.getElementById('supporter');
const status = document.getElementById('status');
const tpt = document.getElementById('tpt');
const platform = document.getElementById('platform');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
    fetch(form.action, {
        method: "POST",
        body: new FormData(document.getElementById("form")),
    }).then(
        response => response.json()
    ).then((html) => {
        window.open("add-new-ticket.html",'_blank');
    });
});

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const validateSelect = (selectElement, errorMessage) => {
    const selectValue = selectElement.value.trim();
    if (selectValue === '') {
        setError(selectElement, errorMessage);
        return false;
    } else {
        setSuccess(selectElement);
        return true;
    }
};

const validateInputs = () => {
    let isValid = true;
    const titleValue = title.value.trim();
    const descripValue = description.value.trim();
    const dateValue = currentDate.value.trim();

    // Validate text inputs
    if (titleValue === '') {
        setError(title, 'Title is required');
        isValid = false;
    } else {
        setSuccess(title);
    }

    if (descripValue === '') {
        setError(description, 'Description is required');
        isValid = false;
    } else {
        setSuccess(description);
    }

    if (dateValue === '') {
        setError(currentDate, 'Created Date is required');
        isValid = false;
    } else {
        setSuccess(currentDate);
    }

    isValid = validateSelect(category, 'Category is required') && isValid;
    isValid = validateSelect(critical, 'Critical level is required') && isValid;
    isValid = validateSelect(submitter, 'Submitter is required') && isValid;

    if (isValid) {
        form.submit();
    }
};

const selectFields = [category, critical, submitter];

selectFields.forEach((select) => {
    select.addEventListener('change', () => {
        validateSelect(select, select.dataset.errorMsg);
    });
});

const clearValidation = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
    inputControl.classList.remove('success');
};

const inputFields = [title, description, currentDate];

inputFields.forEach((input) => {
    input.addEventListener('input', () => {
        clearValidation(input);
    });
});

