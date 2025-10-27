export default class Accordion {
    constructor(containerSelector) {
        this.accordionContainer = document.querySelector(containerSelector);
        if (!this.accordionContainer) return;
        
        this.buttons = this.accordionContainer.querySelectorAll('.accordion__btn');
        this.contents = this.accordionContainer.querySelectorAll('.accordion__content');
        this.init();
    }

    init() {
        this.closeAll();

        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.toggleItem(button));
            
            button.setAttribute('aria-expanded', 'false');
            const contentId = button.getAttribute('aria-controls');
            if (contentId) {
                const content = document.getElementById(contentId);
                if (content) {
                    content.setAttribute('aria-hidden', 'true');
                }
            }
        });
    }

    toggleItem(clickedButton) {
        const isActive = clickedButton.classList.contains('accordion__btn--active');
        
        this.closeAll();
        
        if (!isActive) {
            this.openItem(clickedButton);
        }
    }

    openItem(button) {
        const content = this.findContentForButton(button);
        if (!content) return;
        
        button.classList.add('accordion__btn--active');
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        content.setAttribute('aria-hidden', 'false');
    }

    closeItem(button) {
        const content = this.findContentForButton(button);
        if (!content) return;
        
        button.classList.remove('accordion__btn--active');
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.setAttribute('aria-hidden', 'true');
    }

    closeAll() {
        this.buttons.forEach(button => {
            this.closeItem(button);
        });
    }

    findContentForButton(button) {
        let content = button.nextElementSibling;
        
        while (content && !content.classList.contains('accordion__content')) {
            content = content.nextElementSibling;
        }
        
        return content;
    }
}