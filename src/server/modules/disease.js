const db = require('../db');

/* about request, parse json object follow this format:
{
	symptoms: [1, 2, 3, 4, etc.]
}
*/
exports.findDiseasesBySymptoms = async function (req, res) {
	const symptoms = req.body.symptoms
	if (!symptoms || symptoms.length == 0) return res.status(400).json(null)

    try {
        let queryString
        if (symptoms.length === 1) {
												queryString = `select ds1.disease_id as id,
																																		d.name         as disease,
																																		m.name         as medical_service
																											from diseases_symptoms ds1,
																																diseases d,
																																medicalservices m
																											where d.id = ds1.disease_id and
																																	d.suggested_checkup = m.id and
																																	ds1.symptom_id = ` + symptoms[0]
        } else {
            queryString = "select ds1.disease_id from"
            for (let i = 1; i <= symptoms.length; i++) {
                if (i == symptoms.length) queryString += " diseases_symptoms ds" + i + "\n"
                else queryString += " diseases_symptoms ds" + i + ","
            }

            // where ds1 = ds2, etc.
            queryString += "where ds2.disease_id = ds1.disease_id"

            for (let i = 3; i <= symptoms.length; i++) {
                if (i == symptoms.length) queryString += "\nand ds" + i + ".disease_id = ds1.disease_id"
                else queryString += "\nandds" + i + ".disease_id = ds1.disease_id,"
            }

            // and part
            for (let i = 0; i < symptoms.length; i++) {
                queryString += "\nand ds" + (i + 1) + ".symptom_id = " + symptoms[i]
            }
            queryString = " (" + queryString + ")"
												queryString = `select d.id, 
																																		d.name as disease, 
																																		m.name as medical_service
																											from 		diseases d, 
																																		medicalservices m
																											where 	d.suggested_checkup = m.id and
                  									d.id in` + queryString
								}
        const result = await db.query(queryString)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json(null)
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

