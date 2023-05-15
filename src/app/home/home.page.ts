import { BdService } from './../../Services/bd.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from 'src/Models/item';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/Services/toast.service';
import { LoadingService } from 'src/Services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule],
})
export class HomePage {
  private enlace:string = 'Personas';
  public Personas:Item[]=[];
  public newPersona:Item={
    cedula: '',
    nombre: '',
    apellido: '',
    id: ''
  };
  constructor(private bd:BdService, private toast:ToastService, private load:LoadingService) {
  }
  ngOnInit() {
    this.bd.get<Item>(this.enlace).subscribe(p=>{
      this.Personas=p;
    });
  }
  save(){
    this.load.presentLoading();
    this.newPersona.id=this.bd.createId(this.enlace);
    const data = this.newPersona;
    this.bd.add<Item>(data,this.enlace,this.newPersona.id).then(()=>{
      this.toast.showToast("Exito al guardar","success","checkbox-outline");
      this.load.dismissLoading();
      this.clean();
    }).catch(()=>{
      this.toast.showToast("Error al guardar","danger","sad-outline");
    });
  }

  delete(p:Item){
    this.load.presentLoading();
    this.bd.delete(`Personas`,p.id).then(()=>{
      this.toast.showToast("Exito al Borrar","success","trash-outline");
      this.load.dismissLoading();
    }).catch(()=>{
      this.toast.showToast("Error al Borrar","danger","sad-outline");
    });

  }

  clean(){
    this.newPersona.id="";
    this.newPersona.cedula="";
    this.newPersona.nombre="";
    this.newPersona.apellido="";
    }
  }


