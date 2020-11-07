import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-monitor',
  templateUrl: './food-monitor.component.html',
  styleUrls: ['./food-monitor.component.scss']
})
export class FoodMonitorComponent implements OnInit {
  constructor() { }
  foodList = '';
  enjoyFood = false;
  careFull = false;
  tooMuch = false;
  ngOnInit(): void {
  }

  isFoodListInvalid(): boolean {
    if (!this.foodList) {
      return true;
    }

    const foodListLength = this.foodList.length;
    const foodArray = this.foodList.split(',');
    if ((foodListLength + 1) === foodArray.length) {
      return true;
    }

    return false;
  }

  checkIfTooMuchFood() {
    this.initErrors();
    if (!this.foodList.length) {
      console.log('Empty food list')
      return;
    }
    const foodArray = this.foodList.split(',');
    const sanitizedFoodArray = foodArray.filter((food) => food);
    const sanitizedFoodArrayLength = sanitizedFoodArray.length;

    if (sanitizedFoodArrayLength <= 3) {
      console.log('Enjoy!');
      this.enjoyFood = true;
    } else if (sanitizedFoodArrayLength === 4) {
      console.log('Careful!');
      this.careFull = true;
    } else {
      console.log('Too Much!')
      this.tooMuch = true;
    }

  }

  initErrors() {
    this.enjoyFood = false;
    this.careFull = false;
    this.tooMuch = false;
  }
}
