import { 
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode
  , ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';
  import { ReportService } from './report.service';
  import {ReportType} from '../data';
  
  import { CreateReportDTO, UpdateReportDTO, ReportResponseDTO } from 'src/DTOs/report.dto';
  
  @Controller('/Report/:type')
  export class ReportController {
  
    constructor(
      private readonly appService : ReportService
    ){}
  
  
    @Get()
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) : ReportResponseDTO[] {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.appService.getAllReports(reportType);
    } 
    
    @Get(':id')
    getReportById(@Param('type', new ParseEnumPipe(ReportType)) type : string, @Param('id', ParseUUIDPipe) id : string) : ReportResponseDTO {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.appService.getReportById(reportType, id);
    }
  
    @Post()
    createReport(
      @Body() {amount, source} : CreateReportDTO,
      @Param('type', new ParseEnumPipe(ReportType)) type: string
      ) {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
       return this.appService.createReport(reportType, {amount, source})
    }
  
    @Put(':id')
    updateReport(
      @Param('type', new ParseEnumPipe(ReportType)) type : string, 
      @Param('id', ParseUUIDPipe) id : string,
      @Body() body : UpdateReportDTO,
    ) : ReportResponseDTO  {
      const reportType =
       type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
       return this.appService.updateReport(reportType, id, body);
    }
  
        
    @HttpCode(204) // HTTP CODE TO DISPLAY IT :)
    @Delete(':id')
    Delete(
      @Param('id', ParseUUIDPipe) id : string
    ) {
      return this.appService.deleteReport(id);
    }
  }
  