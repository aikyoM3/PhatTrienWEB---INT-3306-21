const User = require('../models/userModels')

module.exports = async function createNewAdmin(data) {
        try {
            const newGPUser =  {
                userId: data.userId,
                username: data.username,
                password: data.password,
                role: data.role,
                postOfficeId: data.postOfficeId,
                gatheringPointId: data.gatheringPointId
            };
            const response = await new User(newGPUser).save();
            return response;
        } catch (e) {
            console.log(e + "Can not create new gathering point admin");  
        }
    }
module.exports = class gatheringPointAdmin {

}

module.exports = class officeAdmin {

}

module.exports = class staffMember {

}