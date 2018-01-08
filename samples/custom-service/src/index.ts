import { 
    BasicServer, 
    BaseRoute, 
    Get,
    ServerStarted,
    Server
 } from 'realm-object-server'
import * as Realm from 'realm'
import { get } from 'superagent'
import * as path from 'path'
import * as faker from 'faker'

const ProductSchema: Realm.ObjectSchema = {
    name: 'Product',
    primaryKey: 'productId',
    properties: {
        productId: 'int',
        name: 'string',
        price: 'float'
    }
}

@BaseRoute('/products')
class ProductService {

    productsRealm: Realm

    @ServerStarted()
    async serverStarted(server: Server) {
        this.productsRealm = await server.realmFactory.open({
            remotePath: '/products',
            schema: [ProductSchema]
        })
        // let's add a 100 random products
        this.productsRealm.write(() => {
            for (let index = 0; index < 100; index++) {
                this.productsRealm.create('Product', {
                    productId: index,
                    name: faker.commerce.product(),
                    price: faker.random.number({min: 1, max: 9999})
                }, true)
            }
        })
    }


    @Get('/')
    async getAllProducts() {
        const productsRealm = this.productsRealm
        const allProducts = productsRealm
            .objects(ProductSchema.name)
            .slice() // turn it into a snapshot with slice. This is VERY important
        return allProducts
    }

}


const server = new BasicServer()

// add it to the server
server.addService(new ProductService())

server.start({
    // This is the location where ROS will store its runtime data
    dataPath: path.join(__dirname, '../data'),
    // register the auth provider
})
    .then(() => {
        console.log(`Realm Object Server was started on ${server.address}`)
        // Lets call the JSON and endpoint! 
        return get(`http://${server.address}/products`)
    })
    .then(response => {
        console.log(`We made a call to our JSON endpoint /products`)
        console.log('It looks like', response.body)
    })
    .catch(err => {
        console.error(`Error starting Realm Object Server: ${err.message}`)
    })
