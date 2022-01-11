
 const fs = require('fs');

module.exports = class Contenedor {
   
    static idObejeto = 0;


    constructor(file) {
        this.file = file;
    }




    async getAll() {

        try {
            if (!fs.existsSync(this.file)) {

                await fs.promises.writeFile(this.file, "", "utf-8");
            }
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            return Promise.resolve(contenido.length > 0 ? JSON.parse(contenido) : []);
        }
        catch (error) {
            throw Error(`Error al obtener archivo ${error.message}`);
        }
    }

    async save(objecto) {
        if (objecto != undefined) {
            try {
                const contenido = await this.getAll();
                if (contenido.length > 0) {

                    Contenedor.idObjeto = contenido.reduce((acum, item) => acum > item.id ? acum : item.id, 0);


                }
                Contenedor.idObjeto++;
                objecto.id = Contenedor.idObjeto;
                contenido.push(objecto);

                await fs.promises.writeFile(this.file, JSON.stringify(contenido), "utf-8");
                return Promise.resolve(objecto.id);
            }
            catch (error) {
                throw Error(`Error al guardar ${error.message}`);
            }
        } else {
            Promise.reject(new Error(`No se recibio el objeto CORRECTO`));
        }
    }



    async getById(idBuscado) {
      
        try {
            const contenido = await this.getAll();

           
            const obj = contenido.find(element => element.id === idBuscado);

            if (obj == undefined) {
                return Promise.reject(Error("ID inexistente"))
            } else {
                return Promise.resolve(obj);
            }


        }

        catch (error) {
            throw Error(`Error`);

        }
    }


    async deleteById(idBuscado) {


        fs.promises.readFile("./productos.txt", "utf-8")
        try {

            const contenido = await this.getAll();

            let indice = contenido.findIndex(elemento => elemento.id === idBuscado);

            if (indice > -1) {
                contenido.splice(indice, 1);
                await fs.promises.writeFile(this.file, JSON.stringify(contenido), "utf-8");

            }
            else {
                return Promise.reject(Error("No se encuetra id de producto para eliminar"));
            }


        }

        catch (error) {
            throw Error(`Error al borrar registro ${error.message}`);
        }


    }


    async deleteAll() {
        try {

            await fs.promises.writeFile("./productos.txt", "", "utf-8");
        }
        catch (error) {
            throw Error(`Error al borrar archivo ${error.message}`);
        }
    }


}


