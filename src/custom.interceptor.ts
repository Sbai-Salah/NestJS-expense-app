import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import {map} from "rxjs"



export class CustomInterceptor implements NestInterceptor {

    intercept(
        context : ExecutionContext, handler : CallHandler
    ){

        // THIS IS INTERCEPTING THE REQUEST
        console.log("Intercepting the request, CONTEXT : ");
        console.log({context});

        return handler.handle().pipe(
            map((data) => {
                console.log("Intercepting the response, DATA : ");
                console.log({data});

                return data;
            })
        )
    }
}