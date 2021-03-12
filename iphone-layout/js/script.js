document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const tabs = () => {
    const cardDetailChange = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitle = document.querySelector('.card-details__title');
    const cardImageItem = document.querySelector('.card__image_item');
    const cardDetailsPrice = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');

    const data = [
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 95000,
        memory: 128
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
        img: 'img/iPhone-silver.png',
        price: 98000,
        memory: 128
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 109999,
        memory: 256
      },
    ];

    const deactive = () => {
      cardDetailChange.forEach(btn => btn.classList.remove('active'))
    }

    cardDetailChange.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          deactive();
          btn.classList.add('active');
          cardDetailsTitle.textContent = data[i].name;
          cardImageItem.src = data[i].img;
          cardImageItem.alt = data[i].name;
          cardDetailsPrice.textContent = data[i].price + '₽';
          descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memory} ГБ`;
        }
      })
    })
  };

  const accordion = () => {
    const characteristicsList = document.querySelector('.characteristics__list');
    const characteristicsItem = document.querySelectorAll('.characteristics__item');

    characteristicsItem.forEach(elem => {
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = `${elem.children[1].scrollHeight}px`
      }
    })

    const open = (button, dropDown) => {
      closeAllDrops(button, dropDown);
      dropDown.style.height = `${dropDown.scrollHeight}px`
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };

    const closeAllDrops = (button, dropDown) => {
      characteristicsItem.forEach((elem) => {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          close(elem.children[0], elem.children[1]);
        }
      })
    }

    characteristicsList.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const parent =  target.closest('.characteristics__item');
        const description = parent.querySelector('.characteristics__description');
        description.classList.contains('active') ? close(target, description) : open(target, description);
        // условие ? выражение true : выражение false
      }
    });

    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('.characteristics__list')) {
        closeAllDrops();
      }
    })
  };

  const modal = () => {
    const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
    const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery')
    const modal = document.querySelector('.modal');
    const cardDetailsTitle = document.querySelector('.card-details__title');
    const modalTitle = modal.querySelector('.modal__title');
    const modalSubtitle = modal.querySelector('.modal__subtitle');
    const modalTitleSubmit = modal.querySelector('.modal__title-submit')

    const openModal = event => {
      const target = event.target;
      modal.classList.add('open');
      document.addEventListener('keydown', escapeHandler);
      modalTitle.textContent = cardDetailsTitle.textContent;
      modalTitleSubmit.value = cardDetailsTitle.textContent;
      modalSubtitle.textContent = target.dataset.buttonBuy;
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.removeEventListener('keydown', escapeHandler);
    };

    const escapeHandler = event => {
      if (event.code === "Escape") {
        closeModal();
      };
    };

    modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('modal__close') || target === modal) {
        closeModal();
      }
    });

    cardDetailsButtonBuy.addEventListener('click', openModal);
    cardDetailsButtonDelivery.addEventListener('click', openModal);
  };

  tabs();
  accordion();
  modal();
});
