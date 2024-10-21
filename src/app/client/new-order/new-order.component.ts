import { Component } from '@angular/core';
import { ClientOrderDto } from '../../model/dtos/client-order-dto';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipmentCategory } from '../../model/data/equipment-category.model';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { Order } from '../../model/data/order.model';

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
        this.clientService.getEquipmentCategories().subscribe((res: BaseResponse<EquipmentCategory[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EquipmentCategory[]>;
                this.equipmentCategories = dataRes.data;
            }
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
        if(!this.equipmentCategoryId) return;
        const form = this.form.value;
        const orderDto: ClientOrderDto = {
            equipmentDescription: form.equipmentDescription,
            failureDescription: form.failureDescription,
            equipmentCategoryId: this.equipmentCategoryId
        };
        
        this.clientService.postOrder(orderDto).subscribe((res: BaseResponse<Order>) => {
            
        });
    }
}
