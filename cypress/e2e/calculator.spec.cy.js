describe('e2e test for calculator app', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/');
		cy.get('[data-test="btn-0"]').as('btn0');
		cy.get('[data-test="btn-1"]').as('btn1');
		cy.get('[data-test="btn-2"]').as('btn2');
		cy.get('[data-test="btn-3"]').as('btn3');
		cy.get('[data-test="btn-4"]').as('btn4');
		cy.get('[data-test="btn-5"]').as('btn5');
		cy.get('[data-test="btn-6"]').as('btn6');
		cy.get('[data-test="btn-7"]').as('btn7');
		cy.get('[data-test="btn-8"]').as('btn8');
		cy.get('[data-test="btn-9"]').as('btn9');
		cy.get('[data-test="btn-plus"]').as('btnPlus');
		cy.get('[data-test="btn-minus"]').as('btnMinus');
		cy.get('[data-test="btn-multiply"]').as('btnMultiply');
		cy.get('[data-test="btn-slash"]').as('btnSlash');
		cy.get('[data-test="btn-dot"]').as('btnDot');
		cy.get('[data-test="btn-percentages"]').as('btnPercent');
		cy.get('[data-test="btn-plus-minus"]').as('btnMinusSign');
		cy.get('[data-test="btn-clr"]').as('btnClr');
		cy.get('[data-test="btn-save"]').as('btnSave');
		cy.get('[data-test="btn-paste"]').as('btnPaste');
		cy.get('[data-test="btn-theme"]').as('btnTheme');
		cy.get('[data-test="btn-equal"]').as('btnEqual');
		cy.get('[data-test="dashboard"]').as('dashboard');
	});

	it('should check expression 2+9-6', () => {
		cy.get('@btn2').click();
		cy.get('@btnPlus').click();
		cy.get('@btn9').click();
		cy.get('@btnMinus').click();
		cy.get('@btn6').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('2+9-6');
		});
	});

	it('should check result of expression 2+9-6', () => {
		cy.get('@btn2').click();
		cy.get('@btnPlus').click();
		cy.get('@btn9').click();
		cy.get('@btnMinus').click();
		cy.get('@btn6').click();
		cy.get('@btnEqual').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('5');
		});
	});

	it('should check result of expression 1+2+3+4-5-6-7-8-9', () => {
		cy.get('@btn1').click();
		cy.get('@btnPlus').click();
		cy.get('@btn2').click();
		cy.get('@btnPlus').click();
		cy.get('@btn3').click();
		cy.get('@btnPlus').click();
		cy.get('@btn4').click();
		cy.get('@btnMinus').click();
		cy.get('@btn5').click();
		cy.get('@btnMinus').click();
		cy.get('@btn6').click();
		cy.get('@btnMinus').click();
		cy.get('@btn7').click();
		cy.get('@btnMinus').click();
		cy.get('@btn8').click();
		cy.get('@btnMinus').click();
		cy.get('@btn9').click();

		cy.get('@btnEqual').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('-25');
		});
	});

	it('should check result expression 10/10', () => {
		cy.get('@btn1').click();
		cy.get('@btn0').click();
		cy.get('@btnSlash').click();
		cy.get('@btn1').click();
		cy.get('@btn0').click();

		cy.get('@btnEqual').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('1');
		});
	});

	it('should check result expression 0.5*10', () => {
		cy.get('@btn0').click();
		cy.get('@btnDot').click();
		cy.get('@btn5').click();
		cy.get('@btnMultiply').click();
		cy.get('@btn1').click();
		cy.get('@btn0').click();

		cy.get('@btnEqual').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('5');
		});
	});

	it('should check result expression -0.1*99', () => {
		cy.get('@btnMinusSign').click();
		cy.get('@btn0').click();
		cy.get('@btnDot').click();
		cy.get('@btn1').click();
		cy.get('@btnMultiply').click();
		cy.get('@btn9').click();
		cy.get('@btn9').click();

		cy.get('@btnEqual').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('-9.9');
		});
	});

	it('should calculate 10 percent of 1,000', () => {
		cy.get('@btn1').click();
		cy.get('@btn0').click();
		cy.get('@btn0').click();
		cy.get('@btn0').click();
		cy.get('@btnMultiply').click();
		cy.get('@btn1').click();
		cy.get('@btn0').click();
		cy.get('@btnPercent').click();

		cy.get('@btnEqual').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('100');
		});
	});

	it('should check clear button', () => {
		cy.get('@btnClr').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('');
		});
	});

	it('should check save button', () => {
		cy.get('@btn1').click();
		cy.get('@btn2').click();
		cy.get('@btn3').click();
		cy.get('@btnSave').click();

    cy.window().then((win) => {
		const saved = win.localStorage.getItem('result');
		expect(saved).to.equal('123');
		});
	});

	it('should check paste button', () => {
		localStorage.setItem('result', '456');
		cy.get('@btnPaste').click();

		cy.get('@dashboard').invoke('val').then(val => {
			expect(val).to.equal('456');
		});
	});

  it('should check change theme, toggle theme button', () => {
    cy.window().then((win) => {
      const currentTheme = win.localStorage.getItem('theme');

      cy.get('@btnTheme').click();
      cy.wait(600);

      cy.window().then((win2) => {
        const newTheme = win2.localStorage.getItem('theme');
        expect(newTheme).not.to.equal(currentTheme);
      });
    });
  });
});
