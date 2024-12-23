
import { MySQL } from '/Users/igorrangelkonvictus/crm/frontend/src/config/connection'
import { NextResponse } from 'next/server'

export async function getDepositos(){
   try{  
    const connection = await MySQL()
    const [rows] = await connection.query('SELECT * FROM depositos')
    return rows}
    catch(error){
        console.log(error)
    }

}

    export async function postDeposito (deposito_fichas: any) {
    
        try{   
       const mysql = await MySQL()
 
        const querydeposito_fichas = `SELECT * FROM depoisto_fichas`
        const [ rows ] = await mysql.execute(querydeposito_fichas)
        
        // Extremamente importante. Encerrar a conexão.
        await mysql.end()
     
        return NextResponse.json( rows )
      } catch ( error ) {
        return NextResponse.json( error )
      }
    }