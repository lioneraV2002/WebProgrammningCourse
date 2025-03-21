class FormulaCalculator {
    constructor(containerId, sections) {
        this.container = document.getElementById(containerId);
        this.sections = sections;
        this.validFormulaBase = 'fee*count-discount';
        this.init();
    }

    init() {
        this.sections.forEach((section, index) => {
            this.createSection(section, index);
        });
    }

    createSection(section, index) {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'section';

        // Section Title
        const title = document.createElement('div');
        title.className = 'section-title';
        title.textContent = section.title;
        sectionElement.appendChild(title);

        // Input Fields
        const inputFields = ['fee', 'discount', 'count'];
        inputFields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.id = `${field}${index + 1}`;
            input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);

            formGroup.appendChild(input);
            sectionElement.appendChild(formGroup);
        });

        // Formula Element
        const formulaElement = document.createElement('formula');
        formulaElement.setAttribute('evaluator', section.formula);
        formulaElement.setAttribute('placeholder', section.formula);
        formulaElement.textContent = section.formula;

        const resultSpan = document.createElement('span');
        resultSpan.className = 'result';
        formulaElement.appendChild(resultSpan);

        sectionElement.appendChild(formulaElement);
        this.container.appendChild(sectionElement);

        // Add Event Listeners
        this.addEventListeners(index);
    }

    addEventListeners(index) {
        const inputs = {
            fee: document.getElementById(`fee${index + 1}`),
            discount: document.getElementById(`discount${index + 1}`),
            count: document.getElementById(`count${index + 1}`)
        };

        const formulaElement = this.container.querySelectorAll('formula')[index];

        Object.values(inputs).forEach(input => {
            input.addEventListener('input', () => {
                this.updateFormula(formulaElement, inputs);
            });
        });
    }

    updateFormula(formulaElement, inputs) {
        const expr = formulaElement.getAttribute('evaluator');
        const resultSpan = formulaElement.querySelector('.result');

        try {
            const normalizedExpr = expr.replace(/\s+/g, '');
            if (normalizedExpr !== this.validFormulaBase) {
                throw new Error('Invalid formula');
            }

            const values = {
                fee: this.parseInput(inputs.fee.value),
                discount: this.parseInput(inputs.discount.value),
                count: this.parseInput(inputs.count.value)
            };

            if (Object.values(values).some(val => isNaN(val))) {
                throw new Error('Invalid input');
            }

            const safeExpr = normalizedExpr.replace(/(fee|discount|count)/g, match => values[match]);
            const result = eval(safeExpr);
            resultSpan.textContent = Number.isFinite(result) ? result : 'Invalid Formula';
        } catch (e) {
            resultSpan.textContent = 'Invalid Formula';
        }
    }

    parseInput(value) {
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
            return NaN;
        }
        const num = Number(trimmedValue);
        return isNaN(num) ? NaN : num;
    }
}

// Configuration for Sections
const sections = [
    {
        // test for valid formula
        title: 'Total Cost with Flat Discount (Set 1)',
        formula: 'fee * count - discount',

    },
    {
        // test for invalid formula based on tag
        title: 'Total Cost with Flat Discount (Set 2)',
        formula: 'fee * count - tag',

    },
    {
        // test for any other formula except for the valid one
        title: 'Total Cost with Flat Discount (Set 3)',
        formula: 'fee * count + discount',

    },
    // Add more sections as needed
];

// Initialize the Calculator
new FormulaCalculator('calculator-container', sections);