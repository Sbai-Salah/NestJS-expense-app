import { Injectable } from '@nestjs/common';
import { ReportType, data} from '../data';
import {v4 as uuid} from 'uuid';
import { ReportResponseDTO } from '../DTOs/report.dto';


interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}


@Injectable()
export class ReportService {
 

  getAllReports(type : ReportType) : ReportResponseDTO[]{
    return data.report.filter((r) => 
      r.type === type
    ).map((report) => new ReportResponseDTO(report));

  }


  getReportById(type : ReportType, id : string) : ReportResponseDTO{
    const  report = data.report.filter(r => r.type === type)
    .find(r => r.id === id);

    if(!report) return; 
    return new ReportResponseDTO(report);
  }


  createReport(type : ReportType, {amount, source} : Report,) : ReportResponseDTO{
    const newReport = {
      id : uuid(),
      source,
      amount,
      created_at : new Date(),
      updated_at : new Date(),
       type,
    }

    data.report.push(newReport);
    return new ReportResponseDTO(newReport);
  }



  updateReport(type : ReportType, id : string,  body : UpdateReport ): ReportResponseDTO{
    const reportToUpdate = data.report.filter(r => r.type === type)
    .find(r => r.id === id);

    if(!reportToUpdate) return ;

    const reportIndex = data.report.findIndex((r) => r.id === reportToUpdate.id)
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at : new Date()
    }

    return new ReportResponseDTO(data.report[reportIndex]);
  }



  deleteReport(id : string){
    const reporteIndex = data.report.findIndex(r => r.id === id);

    if(reporteIndex === -1) return; 

    data.report.splice(reporteIndex, 1);
    return;

  }








}
