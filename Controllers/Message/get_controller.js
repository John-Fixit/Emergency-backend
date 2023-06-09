const {messageModel} = require('../../Models/messagesModel');
module.exports.getMsg= async(req, res)=>{
    const category = req.params.category;
    const categories = category.split(",");
    let msgs = []
    await Promise.all(categories?.map(async(category)=>{
        let res = await messageModel.find({category: category})
        // console.log(res);
        const formattedMsg = res.map((msg)=>{
                        return {
                            _id: msg._id,
                            message: msg.message,
                            category: msg.category,
                            location: msg.location,
                            createdAt: msg.createdAt,
                            respond: msg.respond,
                            dateCreated: msg.createdAt.toLocaleDateString()
                        }
                    })
        msgs.push(formattedMsg)
    }))
    res.status(200).json({message: "Successfull", allMessage: msgs, success: true});
}
