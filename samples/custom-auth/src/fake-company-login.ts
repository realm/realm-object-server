

export interface SuccessCompanyLogin {
    userId: string
    email: string
    departmentId: string,
    isAdmin: false
}

export function login(userId: string, pin: string, departmentId: string): Promise<SuccessCompanyLogin> {
    return new Promise<SuccessCompanyLogin>((resolve, reject) => {
        setTimeout(() => {

            if (pin === '1234') {
                resolve({
                    userId: userId,
                    email: `${userId}@mycompany.com`,
                    departmentId: departmentId,
                    isAdmin: false
                })
            } else {
                reject('Bad pin!')
            }
        }, 2000) // we wait 2 seconds to simulate an asynchronous login post
    })
}