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
    this.initAlertVariables();
    if (!this.foodList.length) {
      return;
    }
    const foodArray = this.foodList.split(',');
    const sanitizedFoodArray = foodArray.filter((food) => food);
    const sanitizedFoodArrayLength = sanitizedFoodArray.length;

    if (sanitizedFoodArrayLength <= 3) {
      this.enjoyFood = true;
    } else if (sanitizedFoodArrayLength === 4) {
      this.careFull = true;
    } else {
      this.tooMuch = true;
    }

  }

  initAlertVariables() {
    this.enjoyFood = false;
    this.careFull = false;
    this.tooMuch = false;
  }
}
