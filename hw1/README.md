# Homework 1: Formula Calculator

## Overview
This project is a web-based formula calculator designed to calculate various financial metrics based on user inputs. The application comprises three main files: `index.html`, `style.css`, and `script.js`.

## Files and Their Roles

### index.html
This file is the main HTML document that structures the web page. It includes a container for the calculator and links to the necessary CSS and JavaScript files.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Formula Calculator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="calculator-card" id="calculator-container">
    <!-- Sections will be dynamically added here by JavaScript -->
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```
### style.css
The CSS file styles the web page, providing a visually appealing and user-friendly interface. Key styles include:

Body Styling: A linear gradient background and centering of contents.
Calculator Card: A styled card with shadows and rounded corners to hold calculator sections.
Section Styling: Each section has a hover effect, margin, padding, and border styles to differentiate it.
Form Controls: Input fields with focus effects and rounded borders.
Formula Display: Styled formula display with results.
```
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

body {
    background: linear-gradient(135deg, #4a90e2, #50e3c2);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
    margin: 0;
}

.calculator-card {
    background: #ffffff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.section {
    margin-bottom: 30px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 15px;
    border-left: 5px solid #4a90e2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
    color: #4a90e2;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    padding: 12px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
    outline: none;
}

formula {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background: #e6f0fa;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    color: #2c3e50;
    margin-top: 15px;
    transition: background 0.3s ease;
}

formula:hover {
    background: #d0e4f7;
}

.result {
    font-weight: 600;
    padding: 8px 15px;
    background: #4a90e2;
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
}
```
### script.js
This JavaScript file contains the logic for the formula calculator. It includes:

FormulaCalculator Class: Manages the creation and functionality of the calculator sections.
Constructor: Initializes the calculator with specified sections.
init Method: Iterates through sections and creates them.
createSection Method: Dynamically creates HTML elements for each section, including input fields and formula displays.
addEventListeners Method: Adds event listeners to input fields to update the formula result in real-time.
updateFormula Method: Evaluates the formula based on user inputs and updates the result display.
parseInput Method: Parses and validates user inputs to ensure they are numeric.
```
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
        formulaElement.setAttribute('placeholder', section.formulaPlaceholder);
        formulaElement.textContent = section.formulaPlaceholder;

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
        title: 'Total Cost with Flat Discount (Set 1)',
        formula: 'fee * count - discount',
        formulaPlaceholder: 'fee * count - discount'
    },
    // Add more sections as needed
];

// Initialize the Calculator
new FormulaCalculator('calculator-container', sections);
```

### How It Works
- Initialization: The FormulaCalculator class is instantiated with a container ID and sections configuration.
- Dynamic Section Creation: The createSection method generates input fields for "fee", "discount", and "count", along with a formula display.
- Real-time Calculation: As users input values, event listeners trigger the updateFormula method, which evaluates the formula and displays the result.

### Usage
Open the hw1.html file in a web browser to interact with the formula calculator. Input values for "fee", "discount", and "count" to see the calculated result based on the formula defined in each section.

This README provides a comprehensive overview of the project, detailing the purpose and functionality of each file within the hw1 folder.

