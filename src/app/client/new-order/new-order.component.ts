import { Component } from '@angular/core';
import { ClientOrderDto } from '../../dtos/client-order-dto';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipmentCategory } from '../../model/equipment-category.model';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
    form: FormGroup;
    equipmentCategories: EquipmentCategory[] = [];
    equipmentCategoryId?: string;

    constructor(private clientService: ClientService, private formBuilder: FormBuilder) {
        this.clientService.getEquipmentCategories().subscribe((equipmentCategories) => {
            this.equipmentCategories = equipmentCategories;
        });
        this.form = this.formBuilder.group({
            equipmentDescription:  ['', [Validators.required, Validators.maxLength(30)]],
            failureDescription:  ['', [Validators.required, Validators.maxLength(30)]],
        });
    }

    get equipmentDescription() {
        return this.form.get('equipmentDescription');
    }
    get failureDescription() {
        return this.form.get('failureDescription');
    }
    
    onEquipmentCategoryChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.equipmentCategoryId = selectElement.value;
    }
    
    onSubmit() {
        if(this.form.invalid) return;
        const form = this.form.value;
        const orderDto: ClientOrderDto = {
            equipmentDescription: form.equipmentDescription,
            failureDescription: form.failureDescription,
            equipmentCategoryId: this.equipmentCategoryId
        };
        
        this.clientService.postOrder(orderDto).subscribe((order) => {
        });
    }
}
