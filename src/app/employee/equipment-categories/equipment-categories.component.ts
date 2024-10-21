import { Component } from '@angular/core';
import { EquipmentCategory } from '../../model/data/equipment-category.model';
import { EmployeeService } from '../employee.service';
import { BaseResponse, BaseResponseType, DataResponse } from '../../model/response/base-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './equipment-categories.component.html',
  styleUrl: './equipment-categories.component.css'
})
export class EquipmentCategoriesComponent {
    equipmentCategories: EquipmentCategory[] = [];
    editingId: string = '';

    constructor(private employeeService: EmployeeService) { 
        this.employeeService.getAllEquipmentCategories().subscribe((res: BaseResponse<EquipmentCategory[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EquipmentCategory[]>;
                this.equipmentCategories = dataRes.data;
            }
        });
    }

    setEditing(id: string) {
        this.editingId = id;
    }

    cancelEditing() {
        this.editingId = '';
    }

    editEquipmentCategory(equipmentCategory: EquipmentCategory) {
        this.employeeService.patchEquipmentCategory(equipmentCategory).subscribe((res: BaseResponse<EquipmentCategory[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EquipmentCategory[]>;
                this.equipmentCategories = dataRes.data;
            }
        });
    }

    createNewEquipmentCategory(name: string) {
        this.employeeService.postEquipmentCategory(name).subscribe((res: BaseResponse<EquipmentCategory[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EquipmentCategory[]>;
                this.equipmentCategories = dataRes.data;
            }
        });       
    }

    deleteEquipmentCategory(id: string) {
        this.employeeService.deleteEquipmentCategory(id).subscribe((res: BaseResponse<EquipmentCategory[]>) => {
            if(res.type === BaseResponseType.DATA){
                const dataRes = res as DataResponse<EquipmentCategory[]>;
                this.equipmentCategories = dataRes.data;
            }
        });
    }
}
