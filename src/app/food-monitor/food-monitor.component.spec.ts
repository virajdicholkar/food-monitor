import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FoodMonitorComponent } from './food-monitor.component';

describe('FoodMonitorComponent', () => {
  let component: FoodMonitorComponent;
  let fixture: ComponentFixture<FoodMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodMonitorComponent],
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initial content tests', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty food list at starting', () => {
      expect(component.foodList).toEqual('');
    });

    it('Alert variables i.e. enjoyFood, careFull, tooMuch should be false', () => {
      expect(component.enjoyFood).toBeFalse();
      expect(component.careFull).toBeFalse();
      expect(component.tooMuch).toBeFalse();
    });

  })

  describe('Initial UI tests', () => {
    it('Should have heading as Food monitor', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#food-monitor-header').textContent).toEqual('Food Monitor');
    });

    it(`Should have sub heading as 'Limit your food, live healthy.'`, () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#food-monitor-sub-header').textContent).toEqual('Limit your food, live healthy.');
    });

    it(`Should not show any alert`, () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#enjoy-alert')).toBeNull();
      expect(compiled.querySelector('#warning-alert')).toBeNull();
      expect(compiled.querySelector('#excess-food-alert')).toBeNull();
    });

    it(`Should not show any alert`, () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#enjoy-alert')).toBeNull();
      expect(compiled.querySelector('#warning-alert')).toBeNull();
      expect(compiled.querySelector('#excess-food-alert')).toBeNull();
    });

    it(`'Check if too much' button should be disabled`, () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const btn = compiled.querySelector('#check-if-too-much-btn')
      expect(btn.disabled).toBeTrue();
    });
  })

  describe('Tests for function isFoodListInvalid', () => {
    it('Should return true for empty list', () => {
      component.foodList = ''
      const returnValue = component.isFoodListInvalid();
      expect(returnValue).toBeTrue();
    })

    it(`Should return true for list with only commas like ',,,,,'`, () => {
      component.foodList = ',,,,,'
      const returnValue = component.isFoodListInvalid();
      expect(returnValue).toBeTrue();
    })

    it(`Should return false for valid list like 'Pizza, burger'`, () => {
      component.foodList = 'Pizza, burger';
      const returnValue = component.isFoodListInvalid();
      expect(returnValue).toBeFalse();
    })
  })

  describe('Test for function initAlerVariables', () => {
    it('initAlerVariables function should set all alert variables to false', async () => {
      component.initAlertVariables();

      expect(component.enjoyFood).toBeFalse();
      expect(component.careFull).toBeFalse();
      expect(component.tooMuch).toBeFalse();
    })
  })

  describe('Tests for function checkIfTooMuchFood', () => {
    it('Should return null for empty list', () => {
      component.foodList = ''
      const returnValue = component.checkIfTooMuchFood();
      expect(returnValue).toBeFalsy();
    })

    it(`Should set only enjoyFood variable to true for foodlist 'Pizza, Burger, Pasta'`, () => {
      component.foodList = 'Pizza, Burger, Paste'
      component.checkIfTooMuchFood();
      expect(component.enjoyFood).toBeTrue();
      expect(component.careFull).toBeFalse();
      expect(component.tooMuch).toBeFalse();
    })

    it(`Should set only careFull variable to true for foodlist 'Pizza, Burger, Pasta, Omlet'`, () => {
      component.foodList = 'Pizza, Burger, Pasta, Omlet'
      component.checkIfTooMuchFood();
      expect(component.careFull).toBeTrue();
      expect(component.enjoyFood).toBeFalse();
      expect(component.tooMuch).toBeFalse();
    })

    it(`Should set only tooMuch variable to true for foodlist 'Pizza, Burger, Pasta, Omlet, Samosa'`, () => {
      component.foodList = 'Pizza, Burger, Pasta, Omlet, Samosa';
      component.checkIfTooMuchFood();
      expect(component.tooMuch).toBeTrue();
      expect(component.enjoyFood).toBeFalse();
      expect(component.careFull).toBeFalse();
    })
  })

  describe('Test for food list text box', () => {
    it('food-list text area should have same value as foodList variable in compoent', async () => {
      const foodList = 'Burger, Samosa, Omlet'
      const compiled = fixture.nativeElement;
      component.foodList = foodList;
      fixture.detectChanges();
      const textArea = compiled.querySelector('#food-list');
      await fixture.whenStable()
      expect(textArea.value).toEqual(foodList)
    })
  })

  describe('Functionality test', () => {

    it(`Should enable 'Check if too much' button for valid list`, () => {
      component.foodList = 'Pizza, Burger, Sandwhich';
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const btn = compiled.querySelector('#check-if-too-much-btn')
      expect(btn.disabled).toBeFalse();
    })

    it(`Should disable 'Check if too much' button for empty list`, () => {
      component.foodList = '';
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const btn = compiled.querySelector('#check-if-too-much-btn')
      expect(btn.disabled).toBeTrue();
    })

    it(`Should disable 'Check if too much' button for list with only commas like ',,,'`, () => {
      component.foodList = ',,,';
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const btn = compiled.querySelector('#check-if-too-much-btn')
      expect(btn.disabled).toBeTrue();
    })

    describe('For valid list and food under limit', () => {
      beforeEach(() => {``
        component.foodList = 'Pizza, Burger, Sandwhich';
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        const checkIfTooMuchBtn = compiled.querySelector('#check-if-too-much-btn')
        checkIfTooMuchBtn.click();
        fixture.detectChanges();
      })

      it('checkIfTooMuchFood function should set enjoyFood alert variable to true and all other variables to false', () => {
        expect(component.enjoyFood).toBeTrue()
        expect(component.careFull).toBeFalse()
        expect(component.tooMuch).toBeFalse()
      })

      it('Should show Enjoy food alert', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('#enjoy-alert')).toBeTruthy();
        expect(compiled.querySelector('#warning-alert')).toBeNull();
        expect(compiled.querySelector('#excess-food-alert')).toBeNull();
      })

      it('By clicking on x button, alert should get removed', () => {
        const compiled = fixture.nativeElement;
        fixture.detectChanges();
        const button = compiled.querySelector('#remove-enjoy-alert');
        button.click();
        fixture.detectChanges();
        expect(compiled.querySelector('#enjoy-alert')).toBeNull();
      })
    })

    describe('For valid list and food at limit', () => {
      beforeEach(() => {
        component.foodList = 'Pizza, Burger, Sandwhich, Omlet';
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        const checkIfTooMuchBtn = compiled.querySelector('#check-if-too-much-btn')
        checkIfTooMuchBtn.click();
        fixture.detectChanges();
      })

      it('checkIfTooMuchFood function should set careFull alert variable to true and all other variables to false', () => {
        expect(component.careFull).toBeTrue()
        expect(component.enjoyFood).toBeFalse()
        expect(component.tooMuch).toBeFalse()
      })

      it('Should show only Enjoy food alert', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('#warning-alert')).toBeTruthy();
        expect(compiled.querySelector('#enjoy-alert')).toBeNull();
        expect(compiled.querySelector('#excess-food-alert')).toBeNull();
      })

      it('By clicking on x button alert should get removed', () => {
        const compiled = fixture.nativeElement;
        const button = compiled.querySelector('#remove-carefull-alert');
        button.click();
        fixture.detectChanges();
        expect(compiled.querySelector('#careful-alert')).toBeNull();
      })
    })

    describe('For valid list and excess food', () => {
      beforeEach(() => {
        component.foodList = 'Pizza, Burger, Sandwhich, Omlet, Samosa';
        fixture.detectChanges()
        const compiled = fixture.nativeElement;
        const checkIfTooMuchBtn = compiled.querySelector('#check-if-too-much-btn')
        checkIfTooMuchBtn.click();
        fixture.detectChanges();
      })

      it('checkIfTooMuchFood function should set tooMuch alert variable to true and all other variables to false', () => {
        expect(component.tooMuch).toBeTrue()
        expect(component.enjoyFood).toBeFalse()
        expect(component.careFull).toBeFalse()
      })

      it('Should show Enjoy food alert', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('#excess-food-alert')).toBeTruthy();
        expect(compiled.querySelector('#warning-alert')).toBeNull();
        expect(compiled.querySelector('#enjoy-alert')).toBeNull();
      })

      it('By clicking on x button alert should get removed', () => {
        const compiled = fixture.nativeElement;
        const button = compiled.querySelector('#remove-excess-alert');
        button.click();
        fixture.detectChanges();
        expect(compiled.querySelector('#excess-food-alert')).toBeNull();
      })

    })

  })
});
