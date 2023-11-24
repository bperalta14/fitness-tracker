// open and close nav menu
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const menu = document.querySelector("nav .container ul");

// open sidebar
menuBtn.addEventListener("click", () => {
  menu.style.display = "block";
  menuBtn.style.display = "none";
  closeBtn.style.display = "inline-block";
});

// close sidebar
closeBtn.addEventListener("click", () => {
  menu.style.display = "none";
  closeBtn.style.display = "none";
  menuBtn.style.display = "inline-block";
});

// change active class to clicked nav item
const navItems = document.querySelectorAll('nav ul li');

//remove active class from other items
const removeActiveClass = () => {
  navItems.forEach(item => {
    const link = item.querySelector('a');
    link.classList.remove('active');
  })
}

// add active class to clicked nav item
navItems.forEach(item => {
  const link = item.querySelector('a');
  link.addEventListener('click', () => {
    removeActiveClass();
    link.classList.add('active');
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
      event.preventDefault();
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const isIncorrect = Array.from(form.elements).some(element => {
          return element.required && element.value.trim() === '';
      });

      if (isIncorrect) {
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Oops! Please fill in all required fields.';
          errorMessage.style.color = 'red';

          const existingErrorMessage = form.querySelector('.error-message');
          if (existingErrorMessage) {
              form.removeChild(existingErrorMessage);
          }

          form.appendChild(errorMessage);
      } else {
          const existingErrorMessage = form.querySelector('.error-message');
          if (existingErrorMessage) {
              form.removeChild(existingErrorMessage);
          }
      }
  });
});
