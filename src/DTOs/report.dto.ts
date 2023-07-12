import { Expose, Exclude} from "class-transformer";
import { IsNumber, IsPositive ,IsString, IsNotEmpty,IsOptional} from "class-validator";
import { ReportType } from "src/data";

/*
TO MAKE THE VALIDATION GET APPLIED GLOBALY WE SHOULD 
ADD THIS INTO OUR main.ts Code


 app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
  }));

  
  The whitelist option inside the validation pipe, whitelists 
  everything that's not present in the DTO.


*/




/////// validating the create of a report
export class CreateReportDTO {
    @IsNumber()
    @IsPositive()
    amount : number; 

    @IsString()
    @IsNotEmpty()
    source : string;
}


////// validating the update of a report 
    // we should make the source and amount to be optional 

export class UpdateReportDTO { 
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount : number; 

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source : string;
}

//// the next we want to do is how we can manage the responses
//// for example we want to only return the created_at not
//// the updated at. Or wht if we want to make the things in camel case

// we will use another Nest JS entity which is : Interceptors
// we will make a report response (or even request) DTO
/*

to give NEST JS to transform our objects : 
we add these lines inside main.ts file : 

app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    transform : true, 
    transformOptions: {
      enableImplicitConversion : true,
    },
  })
  ,);

  also in the app module we add these : 

  
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {
    provide : APP_INTERCEPTOR,
    useClass : ClassSerializerInterceptor
  }],
})
export class AppModule {}


--------- WHAT IS AN INTERCEPTOR ? 

CLIENT <--(Interceptor)--> SERVER
(like the one in axios (reactJS) when adding token to header API's)

*/

export class ReportResponseDTO { 

    id : string; 
    source : string; 
    amount : number; 

    @Expose({name : 'CreatedAt'})
    transformCreatedAt(){
        return this.created_at;
    }

    @Exclude() // because we will get another createdAt from the expose we exclude this one
    created_at : Date;

    @Exclude() // to get rid of the display of this updated_at 
    updated_at : Date;

    type : ReportType;

   
    constructor(partial : Partial<ReportResponseDTO>){
      Object.assign(this, partial);
    }
    // partial means that we can passes in every object 
    // that is resembling to the ones we have here in this class
    // and it have to be partial, not all the fields.


    
}

