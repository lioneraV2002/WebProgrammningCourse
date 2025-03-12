class FormulaHandler {
    constructor() {
        this.inputSets = [
            { fee: 'fee1', discount: 'discount1', count: 'count1' },
            { fee: 'fee2', discount: 'discount2', count: 'count2' },
            { fee: 'fee3', discount: 'discount3', count: 'count3' }
        ].map(set => ({
            fee: document.getElementById(set.fee),
            discount: document.getElementById(set.discount),
            count: document.getElementById(set.count)
        }));
        this.formulas = document.getElementsByTagName('formula');
        this.validFormulaBase = 'fee*count-discount'; // Base formula without spaces
        this.initCustomTag();
        this.addEventListeners();
    }

    initCustomTag() {
        for (let formula of this.formulas) {
            const placeholder = formula.getAttribute('placeholder') || 'Result';
            formula.textContent = placeholder;
            const span = document.createElement('span');
            span.className = 'result';
            formula.appendChild(span);
            this.updateFormula(formula);
        }
    }

    addEventListeners() {
        this.inputSets.forEach((set, index) => {
            for (let input in set) {
                set[input].addEventListener('input', () => {
                    this.updateFormula(this.formulas[index]);
                });
            }
        });
    }

    updateFormula(formula) {
        const expr = formula.getAttribute('evaluator');
        const resultSpan = formula.querySelector('.result');
        const index = Array.from(this.formulas).indexOf(formula);
        const inputs = this.inputSets[index];
        try {
            // Normalize formula by removing all spaces
            const normalizedExpr = expr.replace(/\s+/g, '');
            // Check if normalized formula matches the valid base
            if (normalizedExpr !== this.validFormulaBase) {
                throw new Error('Invalid formula');
            }
            // Check for invalid IDs
            const idsInFormula = normalizedExpr.match(/[a-z]+/gi) || [];
            const validIds = Object.keys(inputs);
            const hasInvalidId = idsInFormula.some(id => !validIds.includes(id));
            if (hasInvalidId) {
                throw new Error('Invalid ID in formula');
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
        // Check if the input is only spaces (or empty after trimming)
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
            return NaN; // Treat as invalid input
        }
        const num = Number(trimmedValue);
        return isNaN(num) ? NaN : num;
    }
}

new FormulaHandler();