// =========================
// KHK-1 Animation Engine
// =========================

const AnimationEngine = {

    init(){

        this.hoverScale();
        this.clickEffects();
        this.fadeElements();
    },

    // Збільшення при наведенні
    hoverScale(){

        document.addEventListener("mouseover", e => {

            const element = e.target.closest(
                ".book-btn, .chapter-btn, button"
            );

            if(!element) return;

            element.style.transition =
            "transform .2s ease";

            element.style.transform =
            "scale(1.04)";
        });

        document.addEventListener("mouseout", e => {

            const element = e.target.closest(
                ".book-btn, .chapter-btn, button"
            );

            if(!element) return;

            element.style.transform =
            "scale(1)";
        });
    },

    // Анімація натискання
    clickEffects(){

        document.addEventListener("mousedown", e => {

            const element = e.target.closest(
                ".book-btn, .chapter-btn, button"
            );

            if(!element) return;

            element.style.transform =
            "scale(.96)";
        });

        document.addEventListener("mouseup", e => {

            const element = e.target.closest(
                ".book-btn, .chapter-btn, button"
            );

            if(!element) return;

            element.style.transform =
            "scale(1.04)";
        });
    },

    // Плавна поява елементів
    fadeElements(){

        const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.animate(
                        [
                            {
                                opacity:0,
                                transform:
                                "translateY(15px)"
                            },
                            {
                                opacity:1,
                                transform:
                                "translateY(0)"
                            }
                        ],
                        {
                            duration:400,
                            easing:"ease-out"
                        }
                    );
                }
            });
  
        });

        document
        .querySelectorAll(
            ".book-btn, .chapter-btn"
        )
        .forEach(el =>
            observer.observe(el)
        );
    }
};

// Автозапуск
document.addEventListener(
    "DOMContentLoaded",
    () => {

        AnimationEngine.init();
    }
);