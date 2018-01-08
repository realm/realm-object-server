import { BasicServer, AuthService } from 'realm-object-server'
import * as path from 'path'
import * as faker from 'faker'

const server = new BasicServer()

async function bootstrapUsers(server: BasicServer){
    let authService = server.getService('auth') as AuthService
    // lets bootstrap 20 users!
    for (let index = 0; index < 20; index++) {
        await authService.createOrUpdateUser(
            faker.internet.userName(), // a fake internet username
            'password', // use the password auth provider
            false // they are NOT admin
        )
    }
}

server.start({
        // This is the location where ROS will store its runtime data
        dataPath: path.join(__dirname, '../data')
    })
    .then(() => {
        console.log(`Realm Object Server was started on ${server.address}`)
        return bootstrapUsers(server)
    })
    .then(() => {
        console.log('Now you have multiple users!')
    })
    .catch(err => {
        console.error(`Error starting Realm Object Server: ${err.message}`)
    })
