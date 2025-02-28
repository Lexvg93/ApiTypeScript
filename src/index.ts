import app from "./app";
import { AppDataSource } from "./db/conexion";

async function main(){
    try{
        await AppDataSource.initialize();
        console.log('BBDD conectada')
        app.listen(6505, ()=>{
            console.log('Server activo')
        })
    }catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }
    }
}

main();