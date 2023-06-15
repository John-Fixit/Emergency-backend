const dns = require("dns");
module.exports.validateOrgEmail=(req, res, next)=>{
    isOrganizationEmail(req.body.email).then((result)=>{
        console.log(`${req.body.email} is an organization email.`);
        if(result){
            next();
        }
    })
    .catch((error)=>{
        res.status(400).json({message: `This ${req?.body?.email} is not an organization email.`, success: false});
    })
}

function isOrganizationEmail(email) {
    const domain = email.split('@')[1];
    return new Promise((resolve, reject) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err || addresses.length === 0) {
          reject(err || 'No MX records found for the domain');
        } else {
          resolve(true);
        }
      });
    });
  }