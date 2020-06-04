import { CheckItems } from './../models/CheckItems';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isAddForm = false

  CheckListItems: CheckItems[] = [];
  SingleItem: CheckItems;
  CompletedInput: Number;
  addForm: FormGroup

  constructor(
    private storage: Storage,
    private alert: AlertController
  ) { }

  ngOnInit() {

    this.storage.get("CheckList").then(Items=>{
      if(Items){
        this.CheckListItems = Items;
      }
    })

    this.addForm = new FormGroup({
      ItemName: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      ItemQty: new FormControl(1, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    })

  }

  SubmitItem() {
    this.SingleItem = new CheckItems(
      this.addForm.value.ItemName.toString(),
      this.addForm.value.ItemQty
    )
    this.ResetValues();

    if (this.CheckListItems.length == 0) {
      this.CheckListItems[0] = this.SingleItem
    } else
      this.CheckListItems.push(this.SingleItem);

    this.storage.set('CheckList', this.CheckListItems).then(() => {
      console.log()
    })

    this.isAddForm = false
  }

  AddNew() {
    this.isAddForm = true;
  }
  CancelSubmit() {
    this.isAddForm = false;
  }

  onInputChange(_id) {
    var index = this.CheckListItems.findIndex(item => item._id == _id)
    if (index != null) {
      if (this.CheckListItems[index].amount <= this.CheckListItems[index].inputAmount) {
        this.CheckListItems[index].complete = true;
      } else{
        this.CheckListItems[index].complete = false;
      }
      this.storage.set("CheckList", this.CheckListItems)
    }

  }

  ResetThis(_id){
    var index = this.CheckListItems.findIndex(item=> item._id == _id)
    if(index != null){
      this.CheckListItems[index].inputAmount = 0
    }
  }
  DeleteThis(_id) {
    var index = this.CheckListItems.findIndex(item=> item._id == _id)
    if(index != null){
      this.CheckListItems.splice(index, 1)
      this.storage.set("CheckList", this.CheckListItems);
    }
  }

  ResetAll(){
    this.CheckListItems.forEach(item=>{
      item.inputAmount = 0;
    })
  }
  DeleteAll(){
    this.storage.remove("CheckList");
    this.CheckListItems = [];
  }

  ResetValues(){
    this.addForm.value.ItemName = ""
    this.addForm.value.ItemQty = 0
  }

}
