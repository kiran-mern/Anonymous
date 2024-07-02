const User = require('../models/Users')
module.exports = {

    setStatus: async (data) => {
        try {
            const user = await User.findOne({ where: { email: data } })
            console.log(user, '44');
            const updated = User.update(
                { status: user.status },
                { where: { id: data.user_id } }
            )
            if (updated) {
                console.log('user status updated successfully');
                return updated
            } else {
                console.log('failed to update');
            }

        } catch (err) {

            console.log('error when updating the status', err);
        }




    }


}