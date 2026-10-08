(() => {
    "use strict";

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    // Año dinámico del footer
    qsa("[data-current-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Menú móvil
    const menuButton = qs(".menu-toggle");
    const mainNav = qs(".main-nav");

    if (menuButton && mainNav) {
        menuButton.addEventListener("click", () => {
            const open = mainNav.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.textContent = open ? "✕" : "☰";
        });

        qsa("a", mainNav).forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            });
        });
    }

    // Secciones desplegables de programas
    qsa("[data-toggle]").forEach(button => {
        button.addEventListener("click", () => {
            const target = document.getElementById(button.dataset.toggle);
            if (!target) return;

            const isHidden = target.hasAttribute("hidden");
            if (isHidden) {
                target.removeAttribute("hidden");
                button.setAttribute("aria-expanded", "true");
                button.textContent = "Ocultar detalles";
            } else {
                target.setAttribute("hidden", "");
                button.setAttribute("aria-expanded", "false");
                button.textContent = "Ver cómo funciona";
            }
        });
    });

    // Tabs de formas de apoyo
    const tabButtons = qsa(".tab-button");
    const tabPanels = qsa(".tab-panel");

    if (tabButtons.length && tabPanels.length) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const targetId = button.dataset.tab;

                tabButtons.forEach(btn => {
                    const active = btn === button;
                    btn.classList.toggle("active", active);
                    btn.setAttribute("aria-selected", String(active));
                });

                tabPanels.forEach(panel => {
                    const active = panel.id === targetId;
                    panel.classList.toggle("active", active);
                    panel.hidden = !active;
                });
            });
        });
    }

    // Formulario de donaciones
    const form = qs("#donationForm");
    if (!form) return;

    const typeSelect = qs("#tipo_donacion", form);
    const moneyFields = qs("#moneyFields", form);
    const inKindFields = qs("#inKindFields", form);
    const volunteerFields = qs("#volunteerFields", form);
    const formMessage = qs("#formMessage");

    const setConditionalState = () => {
        const type = typeSelect.value;

        moneyFields.hidden = type !== "monetaria";
        inKindFields.hidden = type !== "especie";
        volunteerFields.hidden = type !== "voluntariado";

        const monto = qs("#monto", form);
        const frecuencia = qs("#frecuencia", form);
        const articulo = qs("#articulo", form);
        const habilidades = qs("#habilidades", form);

        monto.required = type === "monetaria";
        frecuencia.required = type === "monetaria";
        articulo.required = type === "especie";
        habilidades.required = type === "voluntariado";
    };

    // Preselección por query string (?tipo=monetaria|especie|voluntariado)
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("tipo");
    if (["monetaria", "especie", "voluntariado"].includes(requestedType)) {
        typeSelect.value = requestedType;
    }
    setConditionalState();

    typeSelect.addEventListener("change", () => {
        setConditionalState();
        clearError("tipo_donacion");
    });

    function setError(fieldName, message) {
        const error = qs(`[data-error-for="${fieldName}"]`, form);
        if (error) error.textContent = message;

        const directField = qs(`#${fieldName}`, form);
        if (directField) directField.classList.add("invalid");
    }

    function clearError(fieldName) {
        const error = qs(`[data-error-for="${fieldName}"]`, form);
        if (error) error.textContent = "";

        const directField = qs(`#${fieldName}`, form);
        if (directField) directField.classList.remove("invalid");
    }

    function clearAllErrors() {
        qsa(".field-error", form).forEach(el => el.textContent = "");
        qsa(".invalid", form).forEach(el => el.classList.remove("invalid"));
    }

    function validateForm() {
        clearAllErrors();

        let valid = true;
        const nombre = qs("#nombre", form);
        const email = qs("#email", form);
        const telefono = qs("#telefono", form);
        const consentimiento = qs("#consentimiento", form);
        const contactPreference = qs('input[name="preferencia_contacto"]:checked', form);

        if (nombre.value.trim().length < 3) {
            setError("nombre", "Escribe un nombre de al menos 3 caracteres.");
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            setError("email", "Escribe un correo electrónico válido.");
            valid = false;
        }

        const digits = telefono.value.replace(/\D/g, "");
        if (digits.length < 10) {
            setError("telefono", "Escribe un teléfono de al menos 10 dígitos.");
            valid = false;
        }

        if (!typeSelect.value) {
            setError("tipo_donacion", "Selecciona un tipo de apoyo.");
            valid = false;
        }

        if (typeSelect.value === "monetaria") {
            const monto = qs("#monto", form);
            const frecuencia = qs("#frecuencia", form);
            const payment = qs('input[name="metodo_pago"]:checked', form);

            if (!monto.value || Number(monto.value) < 10) {
                setError("monto", "El monto mínimo para esta simulación es de $10 MXN.");
                valid = false;
            }
            if (!frecuencia.value) {
                setError("frecuencia", "Selecciona una frecuencia.");
                valid = false;
            }
            if (!payment) {
                setError("metodo_pago", "Selecciona un método de referencia.");
                valid = false;
            }
        }

        if (typeSelect.value === "especie") {
            const articulo = qs("#articulo", form);
            if (articulo.value.trim().length < 10) {
                setError("articulo", "Describe brevemente los artículos que deseas donar.");
                valid = false;
            }
        }

        if (typeSelect.value === "voluntariado") {
            const habilidades = qs("#habilidades", form);
            if (habilidades.value.trim().length < 10) {
                setError("habilidades", "Describe cómo te gustaría colaborar.");
                valid = false;
            }
        }

        if (!contactPreference) {
            setError("preferencia_contacto", "Selecciona una preferencia de contacto.");
            valid = false;
        }

        if (!consentimiento.checked) {
            setError("consentimiento", "Debes aceptar el uso académico de los datos.");
            valid = false;
        }

        return valid;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!validateForm()) {
            formMessage.hidden = false;
            formMessage.className = "form-message error";
            formMessage.textContent = "Revisa los campos marcados antes de enviar.";
            const firstError = qs(".field-error", form);
            const visibleError = qsa(".field-error", form).find(el => el.textContent.trim());
            (visibleError || firstError)?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const name = qs("#nombre", form).value.trim();
        const typeText = typeSelect.options[typeSelect.selectedIndex].text;

        formMessage.hidden = false;
        formMessage.className = "form-message success";
        formMessage.textContent = `¡Gracias, ${name}! Tu solicitud de "${typeText}" fue validada correctamente. En este proyecto académico no se procesa ningún pago real.`;

        form.reset();
        setConditionalState();
        window.scrollTo({ top: formMessage.offsetTop - 120, behavior: "smooth" });
    });

    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            clearAllErrors();
            formMessage.hidden = true;
            formMessage.textContent = "";
            setConditionalState();
        }, 0);
    });
})();
