const firebase = require('../nodejs/firebase');
const stringify = require('../nodejs/node_modules/csv-stringify');

const create = ({ name, email, ipAddress, date_hour, leadType }) => {
    const leads = firebase.database().ref('leads');
    leads.push().set({
        name,
        email,
        ipAddress,
        date_hour,
        leadType
        });
    return leads;
};

const csv = (cb) => {
    const leads = firebase.database().ref('leads');
    const data = [[ "email", "nome", "ip", "tipo", "data_hora" ]];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            var dbValue = lead.val();
            data.push([ dbValue.email, dbValue.name, dbValue.ipAddress, dbValue.date_hour, dbValue.leadType ]);
        });
        stringify(data,(err, output) => {
            cb(output);
        });
    });
};

module.exports = {
    create,
    csv,
};