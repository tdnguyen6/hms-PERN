const db = require('../db');

/* about request, parse json object follow this format:
{
	symptoms: [1, 2, 3, 4, etc.]
}
*/
exports.findDiseasesBySymptoms = async function (req, res) {
    try {
        console.log(req.body.symptoms)
        let arr = req.body.symptoms
        if (!arr || arr.length == 0) {
            res.status(400).json(null)
            return
        }

        let queryString
        if (arr.length === 1) {
            queryString = "select ds1.disease_id as id, d.name, d.descriptions from diseases_symptoms ds1, diseases d where d.id = ds1.disease_id and ds1.symptom_id = " + arr[0]
            console.log(queryString)
        } else {
            queryString = "select ds1.disease_id from"
            for (let i = 1; i <= arr.length; i++) {
                if (i == arr.length) queryString += " diseases_symptoms ds" + i + "\n"
                else queryString += " diseases_symptoms ds" + i + ","
            }

            // where ds1 = ds2, etc.
            queryString += "where ds2.disease_id = ds1.disease_id"

            for (let i = 3; i <= arr.length; i++) {
                if (i == arr.length) queryString += "\nand ds" + i + ".disease_id = ds1.disease_id"
                else queryString += "\nandds" + i + ".disease_id = ds1.disease_id,"
            }

            // and part
            for (let i = 0; i < arr.length; i++) {
                queryString += "\nand ds" + (i + 1) + ".symptom_id = " + arr[i]
            }
            queryString = " (" + queryString + ")"
            queryString = "select d.id, d.name from diseases d where d.id in" + queryString
            console.log(queryString)
        }

        const result = await db.query(queryString)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json(null)
    }
}

exports.queryAllDiseases = async function (req, res) {
    try {
        let result = await db.query("select * from diseases")
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json(null)
    }
}

