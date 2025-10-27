export function initContactForm() {
  const form = document.querySelector('.questions__form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'error-label',
    errorLabelStyle: {
      color: '#ff4d4f',
      fontSize: '12px',
      marginTop: '4px',
    },
  });

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимум 3 символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'email',
        errorMessage: 'Некорректный email',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Необходимо согласие',
      },
    ])
    .onSuccess(async (event) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      
      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          showModal('Успех!', 'Ваша заявка успешно отправлена.', 'success');
          form.reset();
        } else {
          throw new Error('Ошибка сервера');
        }
      } catch (error) {
        showModal('Ошибка', 'Не удалось отправить форму. Пожалуйста, попробуйте позже.', 'error');
      } finally {
        submitBtn.disabled = false;
      }
    });
}

function showModal(title, message, type = 'success') {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__content modal__content--${type}">
      <button class="modal__close" aria-label="Закрыть">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <h3 class="modal__title">${title}</h3>
      <p class="modal__message">${message}</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.querySelector('.modal__close').addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = '';
  });
  
  modal.querySelector('.modal__overlay').addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = '';
  });
}