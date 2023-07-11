import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import {ReportType, data} from './data';
import {v4 as uuid} from 'uuid';
import { report } from 'process';



@Controller('/Report/:type')
export class AppController {


  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((r) => 
      r.type === reportType
    );
  }
  
  @Get(':id')
  getReportById(@Param('type') type : string, @Param('id') id : string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter(r => r.type === reportType)
    .find(r => r.id === id);
  
  }

  @Post()
  createReport(
    @Body() {amount, source} : {amount : number; source : string},
    @Param('type') type: string
    ) {
      const newReport = {
        id : uuid(),
        source,
        amount,
        created_at : new Date(),
        updated_at : new Date(),
         type : type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      }

      data.report.push(newReport);
      return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type : string, 
    @Param('id') id : string,
    @Body() body : {amount : number; source : string},
  ) {
    const reportType =
     type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report.filter(r => r.type === reportType)
    .find(r => r.id === id);

    if(!reportToUpdate) return ;

    const reportIndex = data.report.findIndex((r) => r.id === reportToUpdate.id)
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }

    return data.report[reportIndex];
  }

      
  @HttpCode(204) // HTTP CODE TO DISPLAY IT :)
  @Delete(':id')
  Delete(
    @Param('id') id : string
  ) {
    const reporteIndex = data.report.findIndex(r => r.id === id);

    if(reporteIndex === -1) return; 

    data.report.splice(reporteIndex, 1);


    return;
  }
}
