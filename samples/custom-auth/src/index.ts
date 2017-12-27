import { BasicServer, auth, errors, User } from 'realm-object-server'
import * as Realm from 'realm'
import * as path from 'path'
import { login } from './fake-company-login' // this is just some fake 

const server = new BasicServer()

class MyCustomAuth extends auth.AuthProvider {

    name = "mycustomauth"

    async authenticateOrCreateUser(body: any): Promise<User> {
        try {
            const user_info = body.user_info

            const userId: string = user_info.userId
            const pin: string = user_info.pin
            const departmentId: string = user_info.departmentId

            const response = await login(userId, pin, departmentId)

            return this.service.createOrUpdateUser(
                response.userId, // this is your company's way of identifying your userId
                this.name, // this should always be set to this.name 
                response.isAdmin, { // add some meta data to this user
                    departmentId: response.departmentId,
                    email: response.email
                })
        } catch (err) {
            throw new errors.realm.InvalidCredentials({ detail: err })
        }
    }

}

server.start({
    // This is the location where ROS will store its runtime data
    dataPath: path.join(__dirname, '../data'),
    // register the auth provider
    authProviders: [new MyCustomAuth()]
})
    .then(() => {
        console.log(`Realm Object Server was started on ${server.address}`)

        // the server has started now! let's post some json data up

        // this is some custom payload you can send to the Realm Object Server backend
        // in the `authenticateOrCreateUser` you'll find this data mapped to body.user_info
        const customLoginPayload = {
            userId: 'joe',
            pin: '1234',
            departmentId: 'sales'
        }

        return Realm.Sync.User.registerWithProvider(`http://${server.address}`, { 
            provider: 'mycustomauth', // make sure this matches your MyCustomAuth.name so that the request is mapped to the correct authentication provider
            providerToken: null, // you don't have to worry about this. 
            userInfo: customLoginPayload // this is your custom payload
        })
    })
    .then(customAuthenticatedUser => {
        console.log(`Congratulations! You've logged in successfully! You Realm Sync UserId is ${customAuthenticatedUser.identity}`)
    })
    .catch(err => {
        console.error(`Error starting Realm Object Server: ${err.message}`)
    })
