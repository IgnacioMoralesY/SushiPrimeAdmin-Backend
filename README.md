# Aplicación NodeJS eCommerce Payments

```
- Al clonar el repositorio hacer los siguientes pasos (se ejecutara en el puerto 8080, asegurece de que no tiene otras aplicaciones corriendo en ese puerto):
    cd eCommercePaymentApiRest
    npm install
    npm start  
    
EndPoints:
    Payments:
        GET  /api/payment                  -> Retorna lista con todos los clientes con sus respectivos creditos por tienda en un array.
        GET  /api/payment/:email           -> Retorna objeto con un cliente y sus respectivos creditos por tienda en un array.
        GET  /api/payment/:email/:shop     -> Retorna un el valor de los creditos acumulados en una tienda por un cliente.
        POST /api/payment/add-credits      -> Recibe como body: {emailUser, shop, credit}. Añade creditos y retorna el objeto creado.
        POST /api/payment/remove-credits   -> Recibe como body: {emailUser, shop, credit}. Descuenta creditos y retorna el objeto creado.

    Users:
        GET     /api/user           -> Retorna lista con todos los clientes.
        GET     /api/user/:email    -> Retorna objeto con un cliente.
        POST    /api/user           -> Recibe como body: {email}. Crea y Retorna un objeto con el nuevo cliente.
        DELETE  /api/user/:email    -> Elimina y retorna un objeto con el cliente eliminado.

    Shops:
        GET     /api/shop         -> Retorna lista con todas las tiendas.
        GET     /api/shop/:name   -> Retorna objeto con una tienda.
        POST    /api/shop/        -> Recibe como body: {name}. Crea y Retorna un objeto con la nueva tienda.
        DELETE  /api/shop/:name   -> Elimina y retorna un objeto con la tienda eliminada.

    Upload File 
        POST    /api/upload   -> Recibe como body: {filecsv} de tipo 'File.csv'. Retorna mensaje de exito o error

Node Cron
    Se ejecuta un proceso interno del servidor, todos los dias a las 00:00.
    Proceso se encarga de buscar archivos.csv en una ruta, si encuentra archivos guarda su informacion, agregando o descontando creditos para los usuarios.

    Consideraciones:
        Usuario y Shop deben existir en la base de datos.
        Existe una carpeta llamada exampleFileToUpload, la cual, contiene un archivo.csv de ejemplo.
        Luego de cargar el archivo este se eliminará, para evitar volver a cargarlo cuando se ejecute nuevamente el cron.
    
    Formato del archivo .csv
        index;shop;emailUser;credit
        1;Nike;prueba@prueba.com;500000
        2;Adidas;prueba@prueba.com;1999

Test con Mocha y Chai
    Luego de correr la aplicacion con 'npm start' abrir otra terminal y ejecutar el comando 'npm test'
    el test probara todas las Endpoint, creando registros y luego los eliminara.

```





